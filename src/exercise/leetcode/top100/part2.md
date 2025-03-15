---
date: 2025-03-06
---

# 热门100题part2（22.括号生成 104.二叉树的最大深度 48.旋转图像 94.二叉树的中序遍历 238.除自身以外数组的乘积 118.杨辉三角）

## 22.括号生成

回溯，DFS

```c++
class Solution
{
public:
    string now;
    vector<string> ans;
    int n;
    void dfs(int l, int r)
    {

        if (l == n && r == n)
        {
            ans.push_back(now);
            return;
        }
        if (l < n)
        {
            now.push_back('(');
            dfs(l + 1, r);
            now.pop_back();
        }
        if (l > r)
        {
            now.push_back(')');
            dfs(l, r + 1);
            now.pop_back();
        }
    }
    vector<string> generateParenthesis(int n)
    {
        this->n = n;
        dfs(0, 0);
        return ans;
    }
};
```

## 104.二叉树的最大深度

递归

```c++
class Solution
{
public:
    int maxDepth(TreeNode *root)
    {
        if (root == nullptr)
        {
            return 0;
        }
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```

## 48.旋转图像

第一次想了半天没想出来，空了一天想出来个分治的思路，然后偷看了一下评论突然发现这个就是转置加行翻转

```c++
class Solution
{
public:
    // 拷打内容：
    // void cross(vector<vector<int>> &matrix, int n, int x, int y)
    // {
    //     // 处理十字
    //     for (int i = 1; i < n / 2; i++)
    //     {
    //         int tmp = matrix[y][x - i];
    //         matrix[y][x - i] = matrix[y + i][x];
    //         matrix[y + i][x] = matrix[y][x + i];
    //         matrix[y][x + i] = matrix[y - i][x];
    //         matrix[y - i][x] = tmp;
    //     }
    // }
    // pair<int, int> tran(int y, int x)
    // {

    // }
    void rotate(vector<vector<int>> &matrix)
    {
        int n = matrix.size();
        // // 先处理10字
        // if (n % 2 == 1)
        // {
        // }
        // cross(matrix, 3, 1, 1);
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n / 2; j++)
            {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[i][n - j - 1];
                matrix[i][n - j - 1] = tmp;
            }
        }
    }
};
```

## 94.二叉树的中序遍历

中序遍历很简单，前面的题目中有处理过，这里尝试下使用迭代来完成。

首先要找到最小的也就是中序遍历的第一个元素，不断迭代找左子树，然后可以把沿途的结点压栈，每次再从栈中取出元素，再用上面的方法操作右子树。

```c++
class Solution
{
public:
    vector<int> inorderTraversal(TreeNode *root)
    {
        stack<TreeNode *> sta;
        vector<int> ans;

        TreeNode *p = root;
        while (p != nullptr)
        {
            sta.push(p);
            p = p->left;
        }
        while (!sta.empty())
        {
            p = sta.top();
            sta.pop();
            // left
            ans.push_back(p->val);
            if (p->right)
            {
                sta.push(p->right);
                p = p->right;
                while (p->left)
                {
                    sta.push(p->left);
                    p = p->left;
                }
            }
        }
        return ans;
    }
};
```

## 238.除自身以外数组的乘积

不能用除法，进阶要求空间O(1)，有点难想

想到一种方法是把每个ans都视为前缀x后缀，计算一遍前缀积和后缀积，然后每个都可以相乘得到答案，时间复杂度和空间复杂度都为O(n)

```c++
class Solution
{
public:
    vector<int> productExceptSelf(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> ans = vector<int>(n, 1);
        vector<int> pre = vector<int>(n, 1);
        vector<int> next = vector<int>(n, 1);

        for (int i = 1; i < n; i++)
        {
            // 计算前后缀积
            pre[i] = pre[i - 1] * nums[i - 1];
            next[n - i - 1] = next[n - i] * nums[n - i];
        }
        for (int i = 0; i < n; i++)
        {
            ans[i] = pre[i] * next[i];
        }
        return ans;
    }
};
```

这道题进阶条件是O(1)空间，就是不使用辅助数组
上面的代码中，前后缀中的一个数组可以用ans，也就是要找到办法处理另一个，(实际上nums可以用，但是不知道符不符合题意),不过后缀数组每个元素实际上只用来更新和后面相乘，也就是可以只用一个变量，先相乘再更新。

```c++
class Solution
{
public:
    vector<int> productExceptSelf(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> ans = vector<int>(n, 1);
        int next = 1;
        for (int i = 1; i < n; i++)
        {
            // 计算前缀积
            ans[i] = ans[i - 1] * nums[i - 1];
        }
        for (int i = n - 2; i >= 0; i--)
        {
            next = next * nums[i + 1];
            ans[i] = ans[i] * next;
        }
        return ans;
    }
};
```

## 118.杨辉三角

很简单

```c++
class Solution
{
public:
    vector<vector<int>> generate(int numRows)
    {
        vector<vector<int>> ans(numRows, vector<int>(1, 1));

        for (int i = 1; i < numRows; i++)
        {
            for (int j = 0; j <= i - 2; j++)
            {
                ans[i].push_back(ans[i - 1][j] + ans[i - 1][j + 1]);
            }
            ans[i].push_back(1);
        }
        return ans;
    }
};
```
