# 树

## 存储结构

### 孩子链表链接结构

```c++

struct ChildNode
{
    int index;
    ChildNode *next;
};

struct treeNode
{
    char data;
    int father_index;
    ChildNode *firstChild;
};

struct tree
{
    int size;
    vector<treeNode> table;
};

```

### 左孩子-右兄弟链接结构

```c++
struct node
{
    char data;
    node *FirstChild;
    node *NextBrother;
};
```

这种存储方式结构上与二叉树的二叉链表法一样,可以套用二叉树的一些算法框架