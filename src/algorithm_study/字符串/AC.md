# AC自动机

AC自动机是一种字符串多模式匹配算法，之前学习计算机安全时提到过，AC自动机=Trie树+KMP，现在尝试实现一下AC自动机。

## 字典树

字典树很好搓，下面实现了只有插入功能的字典树

```c++
struct TrieTree
{
    struct node
    {
        string *word;
        node *next[26];
        node() : word(nullptr)
        {
            fill(next, next + 26, nullptr);
        }
    };
    node *root;
    inline static int trans(const char a)
    {
        return a - 'a';
    }
    TrieTree()
    {
        root = new node();
    }
    void insert(const string &word)
    {
        node *p = root;
        for (const char &i : word)
        {
            int idx = trans(i);
            if (p->next[idx] == nullptr)
            {
                p->next[idx] = new node;
            }
            p = p->next[idx];
        }
        p->word = new string(word);
    }
};
```

## 失配指针

*AC自动机的失配指针指向当前状态的最长后缀状态*。失配指针指向当前位置失配后应该开始匹配的节点，它表示输入的字符与当前结点的所有孩子结点都不匹配(而不是和该结点本身不匹配)时跳转的位置。

构建方法（p为父节点,c为当前字母,u为当前节点，当前节点没有和输入字符匹配的孩子）：

1. 如果fail[p]存在指向i的孩子指针，那么fail[u]设置成这个孩子
2. 如果fail[p]不存在这样的指针，那么继续寻找fail[fail[p]]，以此类推直到找到或者到根节点
3. 如果根节点也没有（相当于连一个字符的相同前缀都没有），fail[u]就指向根节点

