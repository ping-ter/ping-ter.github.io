import torch
import torch.nn as nn
import torchtext
import torch.optim as opt
import copy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
class Embedding(nn.Module):
    def __init__(self, n_vocab, d_model):
        super(Embedding, self).__init__()
        self.d_model = d_model
        self.embed = nn.Embedding(n_vocab, d_model)
    def forward(self, x):
        return self.embed(x) * np.sqrt(self.d_model)
class PositionalEmbedding(nn.Module):
    def __init__(self, d_model, max_len: int = 1000):
        super(PositionalEmbedding, self).__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)
        self.register_buffer("pe", pe)
    def forward(self, x):
        return x + self.pe[:, 0 : x.size(1)].detach()
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super(MultiHeadAttention, self).__init__()
        assert (
            d_model % n_heads == 0
        ), f"d_model {d_model} not divisible by n_heads {n_heads}"
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
    def Attention(self, Q, K, V, mask=None) -> tuple[torch.Tensor]:
        d_k = Q.size(-1)
        attention_score = (Q @ K.transpose(-2, -1)) / np.sqrt(d_k)
        if mask is not None:
            attention_score = attention_score.masked_fill(mask == 1, -1e9)
        p_attention = torch.softmax(attention_score, dim=-1)
        return p_attention @ V, p_attention
    def split_heads(self, x: torch.Tensor) -> torch.Tensor:
        batch_size, seq_len, _ = x.size()
        return x.view(batch_size, seq_len, self.n_heads, self.d_k).transpose(1, 2)
    def forward(self, Q, K, V, mask=None):
        batch_size, seq_len, d_model = Q.size()
        Q = self.split_heads(self.W_q(Q))
        K = self.split_heads(self.W_k(K))
        V = self.split_heads(self.W_v(V))
        attn, _ = self.Attention(Q, K, V, mask)
        attn = attn.transpose(1, 2).contiguous().view(batch_size, seq_len, d_model)
        return self.W_o(attn)
class PositionwiseFeedForward(nn.Module):
    def __init__(self, n_ffn, d_model, dropout=0.1) -> None:
        super(PositionwiseFeedForward, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(d_model, n_ffn),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(n_ffn, d_model),
        )
    def forward(self, x):
        return self.net(x)
class AddNorm(nn.Module):
    def __init__(self, d_model, dropout=0.1):
        super(AddNorm, self).__init__()
        self.LN = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)
    def forward(self, X, Y):
        return self.LN(X + self.dropout(Y))
class EncoderLayer(nn.Module):
    def __init__(self, d_model, n_ffn, n_heads):
        super(EncoderLayer, self).__init__()
        self.ma = MultiHeadAttention(d_model, n_heads)
        self.norm1 = AddNorm(d_model)
        self.ffn = PositionwiseFeedForward(n_ffn, d_model)
        self.norm2 = AddNorm(d_model)
    def forward(self, x, mask=None):
        attn = self.ma(x, x, x, mask)
        x = self.norm1(x, attn)
        ffn = self.ffn(x)
        return self.norm2(x, ffn)
def get_mask(source, target, device, idx_padding=0):
    src_mask = (source != idx_padding).unsqueeze(1).unsqueeze(2).to(device)
    tgt_mask = (target != idx_padding).unsqueeze(1).unsqueeze(3).to(device)
    seq_length = target.size(1)
    nopeak_mask = (1 - torch.triu(torch.ones(1, seq_length, seq_length), diagonal=1)).bool().to(device)
    tgt_mask = tgt_mask & nopeak_mask
    return ~src_mask, ~tgt_mask
class DecoderLayer(nn.Module):
    def __init__(self, d_model, n_ffn, n_heads) -> None:
        super(DecoderLayer, self).__init__()
        self.self_attn = MultiHeadAttention(d_model, n_heads)
        self.norm1 = AddNorm(d_model)
        self.cross_attn = MultiHeadAttention(d_model, n_heads)
        self.norm2 = AddNorm(d_model)
        self.ffn = PositionwiseFeedForward(n_ffn, d_model)
        self.norm3 = AddNorm(d_model)
    def forward(self, x, encoder_out, source_mask, target_mask):
        attn = self.self_attn(x, x, x, target_mask)
        x = self.norm1(x, attn)
        attn = self.cross_attn(x, encoder_out, encoder_out, source_mask)
        x = self.norm2(x, attn)
        ffn = self.ffn(x)
        return self.norm3(x, ffn)
class Generator(nn.Module):
    def __init__(self, n_vocab, d_model):
        super(Generator, self).__init__()
        self.net = nn.Sequential(nn.Linear(d_model, n_vocab), nn.Softmax(-1))
    def forward(self, x):
        return self.net(x)
class Encoder(nn.Module):
    def __init__(self, N, d_model, n_ffn, n_heads) -> None:
        super(Encoder, self).__init__()
        self.layers = nn.ModuleList(
            [EncoderLayer(d_model, n_ffn, n_heads) for _ in range(N)]
        )
    def forward(self, x, source_mask=None):
        for layer in self.layers:
            x = layer(x, source_mask)
        return x
class Decoder(nn.Module):
    def __init__(self, N, d_model, n_ffn, n_heads) -> None:
        super(Decoder, self).__init__()
        self.layers = nn.ModuleList(
            [DecoderLayer(d_model, n_ffn, n_heads) for _ in range(N)]
        )
    def forward(self, x, encode_out, source_mask=None, target_source=None):
        for layer in self.layers:
            x = layer(x, encode_out, source_mask, target_source)
        return x
from datetime import datetime
class Transformer(nn.Module):
    def __init__(
        self, n_vocab_s, n_vocab_t, N, d_model, n_ffn, n_heads, device, max_len=1000
    ):
        super(Transformer, self).__init__()
        self.s_embedding = Embedding(n_vocab_s, d_model)
        self.t_embedding = Embedding(n_vocab_t, d_model)
        self.device = device
        self.pe = PositionalEmbedding(d_model, max_len)  # 这里没有学习参数，只需要一个
        self.encoder = Encoder(N, d_model, n_ffn, n_heads)
        self.decoder = Decoder(N, d_model, n_ffn, n_heads)
        self.out_pro = Generator(n_vocab=n_vocab_t, d_model=d_model)
    def forward(self, source, target):
        mask_s, mask_t = get_mask(source, target, self.device)
        s_embed = self.pe(self.s_embedding(source))
        t_embed = self.pe(self.t_embedding(target))
        encode_out = self.encoder(s_embed, mask_s)
        decode_out = self.decoder(t_embed, encode_out, mask_s, mask_t)
        return self.out_pro(decode_out)
    def load_model(self, path):
        self.load_state_dict(torch.load(path, map_location=self.device))
    def save_model(self, path_prefix):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{path_prefix}model_{timestamp}.pth"
        torch.save(self.state_dict(), filename)
        print(f"Model saved as {filename}")
import spacy
import pickle
import os
from torch.utils.data import DataLoader, Dataset
en_tokenizer = spacy.load("en_core_web_sm")
from torchtext.vocab import build_vocab_from_iterator
def tokenize_fun(text, lang="en"):
    if lang == "en":
        doc = en_tokenizer(text)
        return [token.text for token in doc]
    return list(text)  # 先尝试不分词，一个字为一个token
def build_vocab(data, lang="en"):
    tokenizer = lambda text: tokenize_fun(text, lang)
    vocab = build_vocab_from_iterator(
        map(tokenizer, data), specials=["<unk>", "<pad>", "<bos>", "<eos>"]
    )
    vocab.set_default_index(vocab["<unk>"])  # 设置默认索引为 <unk>
    return vocab
def encode_text(text, tokenizer, vocab):
    tokens = tokenizer(text)
    tokens = ["<bos>"] + tokens + ["<eos>"]
    return [vocab[token] for token in tokens]
def decode_text(idxs, vocab):
    tokens = [vocab.lookup_token(idx) for idx in idxs]
    return "".join(tokens[1:-1])
def save_vocab_to_file(vocab_dict, file_path):
    sorted_vocab = sorted(vocab_dict.items(), key=lambda item: item[1])
    with open(file_path, "w", encoding="utf-8") as f:
        for word, _ in sorted_vocab:
            f.write(word + "\n")
def save_vocab(vocab, path):
    with open(path, "wb") as f:
        pickle.dump(vocab, f)
def load_vocab(path):
    with open(path, "rb") as f:
        vocab = pickle.load(f)
    return vocab
def get_or_build_vocab(data, lang, path):
    if os.path.exists(path):
        print(f"Loading {lang} vocab from {path}")
        vocab = load_vocab(path)
    else:
        print(f"Building {lang} vocab and saving to {path}")
        vocab = build_vocab(data, lang)
        save_vocab(vocab, path)
    return vocab
from torch.nn.utils.rnn import pad_sequence
class TranslationDataset(Dataset):
    def __init__(self, df, en_vocab, cn_vocab):
        self.df = df
        self.en_vocab = en_vocab
        self.cn_vocab = cn_vocab
        self.df = df
        if 'enencoded' not in df.columns or 'cnencoded' not in df.columns:
            self.df['enencoded'] = self.df['text_en'].apply(lambda x: encode_text(x, tokenize_fun, self.en_vocab))
            def tokenize_fun_cn(text):
                return tokenize_fun(text, 'cn')
            self.df['cnencoded'] = self.df['text_cn'].apply(lambda x: encode_text(x, tokenize_fun_cn, self.cn_vocab))
    def __len__(self):
        return len(self.df)
    def __getitem__(self, idx):
        en_encoded = self.df.iloc[idx]['enencoded']
        cn_encoded = self.df.iloc[idx]['cnencoded']
        return torch.tensor(en_encoded), torch.tensor(cn_encoded)
def getDataLoader(df, en_vocab, cn_vocab, batch_size=32, shuffle=True):
    dataset = TranslationDataset(df, en_vocab, cn_vocab)
    def collate_fn(batch):
        en_batch, cn_batch = zip(*batch)
        en_batch = pad_sequence(
            en_batch, batch_first=True, padding_value=en_vocab["<pad>"]
        )
        cn_batch = pad_sequence(
            cn_batch, batch_first=True, padding_value=cn_vocab["<pad>"]
        )
        return en_batch, cn_batch
    data_loader = DataLoader(
        dataset, batch_size=batch_size, shuffle=shuffle, collate_fn=collate_fn
    )
    return data_loader
from tqdm import tqdm
def train(model, dataloader, criterion, optimizer, device):
    model.train()
    epoch_loss = 0
    for s, t in tqdm(dataloader):
        s = s.to(device, non_blocking=True)  # 异步传输提升效率
        t = t.to(device, non_blocking=True)
        optimizer.zero_grad()
        output = model(s, t[:, :-1])
        output_dim = output.shape[-1]
        output = output.contiguous().view(-1, output_dim)
        t = t[:, 1:].contiguous().view(-1)
        loss = criterion(output, t)
        loss.backward()
        optimizer.step()
        epoch_loss += loss.item()
    return epoch_loss / len(dataloader)
def set_all_seeds(seed):
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
class Config:
    epsilon = 1e-9
    lr = 1e-4
    d_model = 256
    n_ffn = 768
    seed = 456789
    dropout = 0.1
    n_layers = 4
    n_heads = 8
    n_epochs = 10
df = pd.read_csv("./dataset/cmn.csv", sep="\t")
en_vocab_path = "en_vocab.pkl"
cn_vocab_path = "cn_vocab.pkl"
en_vocab = get_or_build_vocab(df["text_en"], "en", en_vocab_path)
cn_vocab = get_or_build_vocab(df["text_cn"], "cn", cn_vocab_path)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
set_all_seeds(Config.seed)
n_en_vocab = len(en_vocab)
n_cn_vocab = len(cn_vocab)
model = Transformer(
    n_en_vocab,
    n_cn_vocab,
    N=Config.n_layers,
    d_model=Config.d_model,
    n_ffn=Config.n_ffn,
    n_heads=Config.n_heads,
    device=device
).to(device)
if torch.cuda.device_count() > 1:
    print(f"启用 {torch.cuda.device_count()} GPU 并行训练")
    model = nn.DataParallel(model, device_ids=list(range(torch.cuda.device_count())))
criterion = nn.CrossEntropyLoss(ignore_index=cn_vocab["<pad>"])
optimizer = opt.Adam(model.parameters(), lr=Config.lr)
dl = getDataLoader(df, en_vocab, cn_vocab, 64)
for _ in range(Config.n_epochs):
    nowloss = train(model, dl, criterion, optimizer, device)
    print(nowloss)
model.save_model('./model_')
def translate(input:str, model, max_len=1000):
    en_tokens = encode_text(input, tokenize_fun, en_vocab)
    source_tensor = torch.LongTensor(en_tokens).unsqueeze(0).to(device)
    cn_tokens = [cn_vocab['<bos>']]
    for i in range(max_len):
        target_tensor = torch.tensor(cn_tokens).unsqueeze(0).to(model.device)
        with torch.no_grad():
            output = model(source_tensor,target_tensor)
        pred_token = output.argmax(-1)[0][0]
        cn_tokens.append(pred_token)
        if pred_token == cn_vocab['<eos>']:
            break
    return decode_text(cn_tokens, cn_vocab)
model.load_model("./model/model_model_20250508_032633.pth")
test_sent = "Hello, wolrd!"
translate(test_sent, model, 100)
