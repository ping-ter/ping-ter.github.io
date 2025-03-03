import numpy as np
import matplotlib.pyplot as plt

# 导入数据集
data = np.loadtxt('xor_dataset.csv', delimiter=',')
print('数据集大小：', len(data))
print(data[:5])

# 划分训练集与测试集
ratio = 0.8
split = int(ratio * len(data))
np.random.seed(0)
data = np.random.permutation(data)
# y的维度调整为(len(data), 1)，与后续模型匹配
x_train, y_train = data[:split, :2], data[:split, -1].reshape(-1, 1)
x_test, y_test = data[split:, :2], data[split:, -1].reshape(-1, 1)


import torch # PyTorch库
import torch.nn as nn # PyTorch中与神经网络相关的工具
from torch.nn.init import normal_ # 正态分布初始化

torch_activation_dict = {
    'identity': lambda x: x,
    'sigmoid': torch.sigmoid,
    'tanh': torch.tanh,
    'relu': torch.relu
}

# 定义MLP类，基于PyTorch的自定义模块通常都继承nn.Module
# 继承后，只需要实现forward函数，进行前向传播
# 反向传播与梯度计算均由PyTorch自动完成
class MLP_torch(nn.Module):

    def __init__(
        self,
        layer_sizes, # 包含每层大小的list
        use_bias=True,
        activation='relu',
        out_activation='identity'
    ):
        super().__init__() # 初始化父类
        self.activation = torch_activation_dict[activation]
        self.out_activation = torch_activation_dict[out_activation]
        self.layers = nn.ModuleList() # ModuleList以列表方式存储PyTorch模块
        num_in = layer_sizes[0]
        for num_out in layer_sizes[1:]:
            # 创建全连接层
            self.layers.append(nn.Linear(num_in, num_out, bias=use_bias))
            # 正态分布初始化，采用与前面手动实现时相同的方式
            normal_(self.layers[-1].weight, std=1.0)
            # 偏置项为全0
            self.layers[-1].bias.data.fill_(0.0)
            num_in = num_out

    def forward(self, x):
        # 前向传播
        # PyTorch可以自行处理batch_size等维度问题
        # 我们只需要让输入依次通过每一层即可
        for i in range(len(self.layers) - 1):
            x = self.layers[i](x)
            x = self.activation(x)
        # 输出层
        x = self.layers[-1](x)
        x = self.out_activation(x)
        return x
    
# 设置超参数
num_epochs = 1000
learning_rate = 0.1
batch_size = 128
eps = 1e-7
torch.manual_seed(0)

# 初始化MLP模型
mlp = MLP_torch(layer_sizes=[2, 4, 1], use_bias=True,
    out_activation='sigmoid')

# 定义SGD优化器
opt = torch.optim.SGD(mlp.parameters(), lr=learning_rate)

# 训练过程
losses = []
test_losses = []
test_accs = []
for epoch in range(num_epochs):
    st = 0
    loss = []
    while True:
        ed = min(st + batch_size, len(x_train))
        if st >= ed:
            break
        # 取出batch，转为张量
        x = torch.tensor(x_train[st: ed],
            dtype=torch.float32)
        y = torch.tensor(y_train[st: ed],
            dtype=torch.float32).reshape(-1, 1)
        # 计算MLP的预测
        # 调用模型时，PyTorch会自动调用模型的forward方法
        # y_pred的维度为(batch_size, layer_sizes[-1])
        y_pred = mlp(x)
        # 计算交叉熵损失
        train_loss = torch.mean(-y * torch.log(y_pred + eps) \
            - (1 - y) * torch.log(1 - y_pred + eps))
        # 清空梯度
        opt.zero_grad()
        # 反向传播
        train_loss.backward()
        # 更新参数
        opt.step()

        # 记录累加损失，需要先将损失从张量转为numpy格式
        loss.append(train_loss.detach().numpy())
        st += batch_size

    losses.append(np.mean(loss))
    # 计算测试集上的交叉熵
    # 在不需要梯度的部分，可以用torch.inference_mode()加速计算
    with torch.inference_mode():
        x = torch.tensor(x_test, dtype=torch.float32)
        y = torch.tensor(y_test, dtype=torch.float32).reshape(-1, 1)
        y_pred = mlp(x)
        test_loss = torch.sum(-y * torch.log(y_pred + eps) \
            - (1 - y) * torch.log(1 - y_pred + eps)) / len(x_test)
        test_acc = torch.sum(torch.round(y_pred) == y) / len(x_test)
        test_losses.append(test_loss.detach().numpy())
        test_accs.append(test_acc.detach().numpy())

print('测试精度：', test_accs[-1])
# 将损失变化进行可视化
plt.figure(figsize=(16, 6))
plt.subplot(121)
plt.plot(losses, color='blue', label='train loss')
plt.plot(test_losses, color='red', ls='--', label='test loss')
plt.xlabel('Step')
plt.ylabel('Loss')
plt.title('Cross-Entropy Loss')
plt.legend()

plt.subplot(122)
plt.plot(test_accs, color='red')
plt.ylim(top=1.0)
plt.xlabel('Step')
plt.ylabel('Accuracy')
plt.title('Test Accuracy')
plt.show()