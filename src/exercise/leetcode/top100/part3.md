---
date: 2025-03-10
---

# 热门100题part3（206.反转链表 51.N皇后 114.二叉树展开为链表 136.只出现一次的数字 761.相交链表）

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

[力扣官方题解](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/solutions/356853/er-cha-shu-zhan-kai-wei-lian-biao-by-leetcode-solu/)：

```
注意到前序遍历访问各节点的顺序是根节点、左子树、右子树。如果一个节点的左子节点为空，则该节点不需要进行展开操作。如果一个节点的左子节点不为空，则该节点的左子树中的最后一个节点被访问之后，该节点的右子节点被访问。该节点的左子树中最后一个被访问的节点是左子树中的最右边的节点，也是该节点的前驱节点。因此，问题转化成寻找当前节点的前驱节点。

具体做法是，对于当前节点，如果其左子节点不为空，则在其左子树中找到最右边的节点，作为前驱节点，将当前节点的右子节点赋给前驱节点的右子节点，然后将当前节点的左子节点赋给当前节点的右子节点，并将当前节点的左子节点设为空。对当前节点处理结束后，继续处理链表中的下一个节点，直到所有节点都处理结束。
```

按照思路编写代码：

```c++
class Solution
{
public:
    void flatten(TreeNode *root)
    {
        while (root)
        {
            TreeNode *l = root->left;
            TreeNode *r = root->right;
            if (l && r)
            {
                TreeNode *p = l;
                while (p->right)
                {
                    p = p->right;
                }
                p->right = root->right;
            }
            if (l)
            {
                root->right = l;
                root->left = nullptr;
            }
            root = root->right;
        }
    }
};
```

学到了x_x

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

## 761.相交链表

要求设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案。
可以先各自遍历一遍，得到长度，然后做差就能知道是哪个了

```c++
class Solution
{
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB)
    {
        int size[2] = {0, 0};
        ListNode *head[2] = {headA, headB};
        for (int i = 0; i < 2; i++)
        {
            ListNode *p = head[i];
            while (p)
            {
                p = p->next;
                size[i]++;
            }
        }
        int d = size[1] - size[0];
        int l = (d > 0);
        d = abs(d);

        for (int i = 0; i < d; i++)
        {
            head[l] = head[l]->next;
        }
        while (head[0] != head[1])
        {
            head[0] = head[0]->next;
            head[1] = head[1]->next;
        }
        return head[0];
    }
};
```

通过是通过了，但是运行时间才击败了11.94%
官方的题解是使用双指针，走到头之后切换到另一个链表的头节点，可以让两个链表都走m+n，自动同步了
但是理论上复杂度跟我的应当是一样的

```c++
class Solution
{
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB)
    {
        ListNode *head_r[2] = {headA, headB};
        ListNode *head[2] = {headA, headB};
        while (head[0] != head[1])
        {
            for (int i = 0; i < 2; i++)
            {
                if (head[i] == nullptr)
                {
                    head[i] = head_r[1 - i];
                }
                else
                {
                    head[i] = head[i]->next;
                }
            }
        }
        return head[0];
    }
};
```

击败了19%，可能是使用了数组的原因吗

```c++
class Solution
{
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB)
    {
        ListNode *pA = headA, *pB = headB;
        while (pA != pB)
        {
            if (pA == nullptr)
            {
                pA = headB;
            }
            else
            {
                pA = pA->next;
            }
            if (pB == nullptr)
            {
                pB = headA;
            }
            else
            {
                pB = pB->next;
            }
        }
        return pA;
    }
};
```

这次击败了85%，看来循环和数组会消耗一定时间。