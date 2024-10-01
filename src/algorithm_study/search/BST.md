# 二叉查找树

## 特征

要求各个节点关键词互异

对于二叉查找树中的任意一个节点P,都有P的左子树的关键词小于P,右子树都大于P

## 核心操作

**查找**:查找关键词为K的节点
**插入**:将关键词为K的节点插入到查找树
**删除**:删除关键词为K的节点

其中,插入和删除操作不能破坏二叉查找树,要维持key(p.l) < key(p) < key(p.r)

此外,还有:

`创建`:建立空树,开始插入新结点
`排序`:中根遍历
`找最小/最大元素`:中根序列的第一个/最后一个元素

## 算法实现

### 基本结构

```c++
struct node
{
    int key;
    node *leftChild;
    node *rightChild;
    node(int key) : key(key) {}
};

struct BST
{
    node *root;

    BST() : root(nullptr) {}
    BST(vector<int> &datas)
    {
        int size = datas.size();
        sort(datas.begin(), datas.end());
        root = BST_in(datas, 0, size - 1);
    }
    node *BST_in(const vector<int> &datas, int l, int r);
    node *search(int key);
    void inOrderTravel()
    {
        cout << endl;
        inOrder(root);
        cout << endl;
    }
    void inOrder(node *nownode);
};
```


### 插入

插入时,先对新节点的key进行查找,如果找到则不执行操作,否则在查找失败的位置插入

```c++
void BST::insert(int key)
{
    insert_in(root, key);
}

void BST::insert_in(node *&nownode, int key)
{
    if (nownode == nullptr)
    {
        nownode = new node(key);
    }
    else if (nownode->key < key)
    {
        insert_in(nownode->rightChild, key);
    }
    else if (nownode->key > key)
    {
        insert_in(nownode->leftChild, key);
    }
}
```

### 删除

删除操作考虑以下情况:

1. 目标节点没有孩子,则直接删除不会破坏树结构
2. 目标节点只有1个孩子,而该孩子这一棵子树一定会小于目标节点的父节点,所以可以直接代替目标节点的位置,不会破坏树结构
3. 目标节点有两个孩子,我们需要找到一个节点代替它,这个节点要大于左子树关键词小于右子树,找法为:从目标节点右子树找到关键词最小的节点(中根序的第一个,也是目标节点的中根后继),替换原本的节点,然后删去这个(这个节点没有左子树,因此可以用1,2的方法)

```c++
void BST::delNode(int key)
{
    delNode_in(root, key);
}

// 涉及修改,要用引用
void BST::delNode_in(node *&nownode, int key)
{
    if (nownode == nullptr)
    {
        return; // 未查询到,不执行操作
    }

    if (nownode->key < key)
    {
        delNode_in(nownode->rightChild, key);
    }
    else if (nownode->key > key)
    {
        delNode_in(nownode->leftChild, key);
    }
    else // 查询到目标节点
    {
        // 有两个节点的情况
        if (nownode->leftChild != nullptr && nownode->rightChild != nullptr)
        {
            node *newroot = nownode->rightChild;
            while (newroot->leftChild != nullptr)
            {
                newroot = newroot->leftChild; // 找到中根后继
            }

            nownode->key = newroot->key;
            delNode_in(newroot, newroot->key);
        }
        else // 其它情况
        {
            node *pre = nownode;
            nownode = pre->rightChild; // 因为是引用,可以直接修改
            if (pre->leftChild != nullptr)
            {
                nownode = pre->leftChild;
            }
            delete pre;
        }
    }
}
```