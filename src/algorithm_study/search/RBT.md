# 红黑树

红黑树是一种自平衡的二叉搜索树,

## 性质

1. 节点为红色或黑色
2. 空节点（空叶子节点）为黑色
3. 红色节点的子节点为黑色
4. 从根节点到 NIL 节点的每条路径上的黑色节点数量相同

## 定义

```c++
//节点
struct node
{
    enum Color
    {
        BLACK,
        RED
    };
    int key;
    Color color;

    node *leftChild;
    node *rightChild;
    node *father;
};
```

## 旋转

红黑树有左旋和右旋,与AVL类似