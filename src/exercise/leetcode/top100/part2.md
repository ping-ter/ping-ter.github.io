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

第一次想了半天没想出来


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