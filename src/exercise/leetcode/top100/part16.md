# 热门100题part16（538.把二叉搜索树转换为累加树 85.最大矩形 105.从前序与中序遍历序列构造二叉树 84.柱状图中最大的矩形 15.三数之和 10.正则表达式匹配 76.最小覆盖子串）

## 538.把二叉搜索树转换为累加树

乍一看理解不了题意，弄明白之后发现就是在二叉树上算前缀和，只不过顺序是反中根遍历。

```c++
class Solution
{
    int sum = 0;

public:
    TreeNode *convertBST(TreeNode *root)
    {
        if (root == nullptr)
        {
            return nullptr;
        }
        convertBST(root->right);
        sum += root->val;
        root->val = sum;
        convertBST(root->left);
        return root;
    }
};
```

## 85.最大矩形

`221.最大正方形`升级版，那道题使用DP解决，尝试一下这题能不能DP。

![Alt text](image-1.png)

可以看到，大矩形也是可以拆成几个同构的小矩形的，只不过正方形只要记录边长，这个要记录长和宽。
但是还有个大问题，一个点对应的最大正方形可以唯一，但是长方形可以有好几种形态。

## 105.从前序与中序遍历序列构造二叉树

可以从前序遍历序列找到根节点，对应地通过中序遍历序列划分左右子树，递归即可。

```c++
class Solution
{
    int i = 0;
    TreeNode *buildInner(vector<int> &preorder, vector<int> &inorder, int l, int r)
    {
        // cout << l << "," << r << "\n";
        if (l > r || i >= preorder.size())
        {
            return nullptr;
        }
        auto node = new TreeNode(preorder[i]);
        i++;
        int mid;
        for (int j = l; j <= r; j++)
        {
            if (inorder[j] == node->val)
            {
                mid = j;
                break;
            }
        }
        node->left = buildInner(preorder, inorder, l, mid - 1);
        node->right = buildInner(preorder, inorder, mid + 1, r);
        return node;
    }

public:
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder)
    {
        return buildInner(preorder, inorder, 0, preorder.size() - 1);
    }
};
```

## 84.柱状图中最大的矩形

像是动态规划，想想怎么递推

## 15.三数之和

两数之和升级版，但是还要给出方案，由于$-10^5 <= nums[i] <= 10^5$如果把每种两数之和都记录，空间最大会达到$10^{10}$.
把这个问题拆成`1+2`，先只记录一个数的，然后用$n^2$时间解决问题。另外，还有一个去重的问题，可以在记录一个数时，只考虑第一次出现的下标，这样可以保证一个数的部分不同；但是`2`的部分可以混着1的部分，例如$[0,0,0,0]$中，记录一个0，下标0，然后遍历两两相加的组合，第一次得知下标0,1,2相加是0，第二次知道0,1,3也是

## 10.正则表达式匹配

先从DFS试了下成功过了，只是时间有点难看，然后优化了一下，具体规则就是把模式串中连续的a*以及之类的合并了，减少DFS的深度。

```c++
class Solution
{
    bool ans = false;
    void dfs(string &s, string &p, int i, int j)
    {
        while (!ans && i <= s.size())
        {
            if (j >= p.size() && i >= s.size())
            {
                ans = true;
                return;
            }
            if (j + 1 < p.size() && p[j + 1] == '*')
            {
                j++;
                continue;
            }
            char c = p[j];
            if (c == '*')
            {
                dfs(s, p, i, j + 1);
                c = p[j - 1];
                if (c == s[i] || c == '.')
                {
                    dfs(s, p, i + 1, j);
                }
                return;
            }
            else
            {
                if (c != s[i] && c != '.')
                {
                    return;
                }
                i++;
                j++;
            }
        }
    }

public:
    bool isMatch(string s, string p)
    {
        string pt;
        char pre_c = 0;
        bool star = false;
        int i = 0;
        int j = 0;
        p += 'a';
        while (i < p.size() - 1)
        {
            if (p[i + 1] == '*')
            {
                if (!(j >= 2 && pt[j - 1] == '*' && (pt[j - 2] == p[i] || pt[j - 2] == '.')))
                {
                    pt += p[i];
                    pt += '*';
                    j += 2;
                }
                i += 2;
            }
            else
            {
                pt += p[i];
                i++;
                j++;
            }
        }
        dfs(s, pt, 0, 0);
        return ans;
    }
};
```

```
Your runtime beats 100 % of cpp submissions
Your memory usage beats 98.36 % of cpp submissions (7.9 MB)
```

时间空间都达到最优水平。

## 76.最小覆盖子串

进阶要求：设计一个$o(m+n)$时间内解决此问题的算法
与`3.无重复字符的最长子串`有些类似，也可以采用这种思路，记录已有集合中的各个字母下标，出现新的之后舍弃旧的，但是有个难点是t中可能有重复字符
