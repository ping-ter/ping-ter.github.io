# 热门100题part3（206.反转链表 51.N皇后）

## 206.反转链表

正常方法可以直接依次遍历然后头插到新链表，这里尝试不用辅助节点来完成

对于每个节点来说，反转就是颠倒了指向关系，n1->n2变成了n2->1，但是直接调整会使链表断开，找不到原来的n3（因为n2->next变成了n1），所以应该先调整完后面的再修改前面的。

```c++
class Solution
{
public:
    ListNode *reverseList(ListNode *head)
    {
        if (head == nullptr || head->next == nullptr)
        {
            return head;
        }
        auto tmp = head->next;
        head->next = nullptr;
        auto newhead = reverseList(tmp);
        tmp->next = head;
        return newhead;
    }
};
```

`head->next = nullptr`这一步是为了断开链表，不然最后尾部指针指向不到nullptr

然后考虑怎么不用递归，来优化空间

```c++
class Solution
{
public:
    ListNode *reverseList(ListNode *head)
    {
        if (head == nullptr)
        {
            return head;
        }
        ListNode *pre = nullptr;
        ListNode *next = head->next;
        while (next)
        {
            head->next = pre;
            pre = head;
            head = next;
            next = next->next;
        }
        head->next = pre;
        return head;
    }
};
```

## 51.N皇后

经典的8皇后问题，可以DFS暴力求解

```c++
    vector<int> chess; // 棋盘，表示每行的皇后放在第几列
    vector<int> cols;  // 表示每个列是否被使用过
    vector<int> lu_rd; // 左上-右下斜线
    vector<int> ld_ru; // 左下-右上斜线
```

存储各个会发生冲突的位置，便于剪枝

```c++
class Solution
{
public:
    int n;
    vector<int> chess; // 棋盘，表示每行的皇后放在第几列
    vector<int> cols;  // 表示每个列是否被使用过
    vector<int> lu;    // 左上-右下斜线(left-up)
    vector<int> ld;    // 左下-右上斜线(left-down)
    vector<vector<string>> ans;
    void dfs(int now_n)
    {
        if (now_n == n)
        {
            vector<string> nowAns(n, string(n, '.'));
            for (int i = 0; i < n; i++)
            {
                nowAns[i][chess[i]] = 'Q';
            }
            ans.push_back(nowAns);
            return;
        }

        for (int i = 0; i < n; i++)
        {
            if (cols[i] == 0)
            {
                int lu_ = now_n - i + n - 1;
                int ld_ = now_n + i;
                if (lu[lu_] == 0 && ld[ld_] == 0)
                {
                    lu[lu_] = 1;
                    ld[ld_] = 1;
                    cols[i] = 1;
                    chess[now_n] = i;
                    dfs(now_n + 1);
                    cols[i] = 0;
                    lu[lu_] = 0;
                    ld[ld_] = 0;
                }
            }
        }
    }
    vector<vector<string>> solveNQueens(int n)
    {
        chess = vector<int>(n, -1);
        cols = vector<int>(n, 0);
        lu = vector<int>(n + n - 1, 0);
        ld = vector<int>(n + n - 1, 0);
        this->n = n;
        dfs(0);
        return ans;
    }
};
```

## 114.二叉树展开为链表

递归前序遍历，但是有点苛刻的是右子树为空时是不能作为tail返回的，因此要判断一下。

```c++
class Solution
{
public:
    TreeNode *inner(TreeNode *root)
    {
        if (root == nullptr || (root->left == nullptr && root->right == nullptr))
        {
            return root;
        }
        auto rc = root->right;
        TreeNode *tail = root;
        if (root->left)
        {
            root->right = root->left;
            tail = inner(root->left);
            tail->right = rc;
            root->left = nullptr;
        }
        if (rc)
        {
            return inner(rc);
        }
        return tail;
    }
    void flatten(TreeNode *root)
    {
        inner(root);
    }
};
```

提交后发现空间用的似乎有点多：

```
Accepted
225/225 cases passed (0 ms)
Your runtime beats 100 % of cpp submissions
Your memory usage beats 39.37 % of cpp submissions (17.4 MB)
耗时 0:38:37
```

尝试不递归，完成进阶要求：使用原地算法（O(1) 额外空间）展开这棵树。

首先考虑：如何才能O(1)时间前序遍历

```c++
void tra(node* root)
{
    if (!root)
    {
        return;
    }
    op(root)
    tra(root->l);
    tra(root->r);
}
```

这是最简单的前序遍历写法，最简单的，可以优化这个尾递归：

```c++
void tra(node* root)
{
    while (root)
    {
        op(root)
        tra(root->l);
        root = root->r;
    }
}
```

还剩一个递归，这样还是会使用$O(log(n))$的空间，这个递归没办法优化掉，因为只要需要回溯就要保存各个根，所以要想办法不回溯。
查阅了一下资料，真有$O(log(1))$空间的二叉树遍历方法
[神级遍历——morris](https://zhuanlan.zhihu.com/p/101321696)
这种算法基于修改利用树上空孩子指针来存储要回溯的节点，感觉这里可以借鉴一下。



## 136.只出现一次的数字

要求$O(n)$时间和$O(1)$空间

`除了某个元素只出现一次以外，其余每个元素均出现两次`
所以全部异或就可以了

```c++
class Solution
{
public:
    int singleNumber(vector<int> &nums)
    {
        int ans = 0;
        for (int &i : nums)
        {
            ans ^= i;
        }
        return ans;
    }
};
```

不过说实话这个条件也太特殊了，感觉是对着答案出的题

## 