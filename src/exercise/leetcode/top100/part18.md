# 热门100题part18（96.不同的二叉搜索树）

## 96.不同的二叉搜索树

可以把二叉树分成左右子树，左右子树各自又是一个二叉搜索树，选择好根时，就可以确定左右两边的节点数量，因此，可以从1个节点的二叉搜索树递推。

```c++
class Solution
{
public:
    int dp[32];
    int numTrees(int n)
    {
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;
        dp[3] = 5;
        for (int i = 4; i <= n; i++)
        {
            dp[i] = 0;
            for (int j = 0; j < i / 2; j++)
            {
                dp[i] += dp[j] * dp[i - 1 - j];
            }
            dp[i] *= 2;
            if (i % 2 == 1)
            {
                dp[i] += dp[i / 2] * dp[i / 2];
            }
        }
        return dp[n];
    }
};
```

## 72.编辑距离

初见很震撼，这居然是中等（据说以前是hard，被卷下来了x_x）

由于可以删除和替换，公共部分要尽量利用，由于替换和插入的存在（考虑短变长），实际上最小的编辑距离就是长串减去公共子序列长度，因此这个问题可以转化成最长公共子序列问题。
但是求最长公共子序列也不是个简单的问题。

LCS(Longest Common Subsequence)是一个经典问题。
参考了一下[洛谷大佬的讲解](https://www.luogu.com.cn/problem/solution/P1439)

动态规划，`dp[i][j]`表示两个串分别在前i, j位的最长公共子序列，那么如果i, j位置字符相同，dp[i][j]就是`dp[i-1][j-1]+1`，否则就只能继承。

经过测试，求出最长公共子序列后直接相减是不对的，但是可以沿用这个思路，可以用dp[i-1][j-1]表示转化前缀所需的最小操作，如果当前的i和j相等，则继承，否则多操作一次。

```c++
class Solution
{
    // int dp[505][505] = {0};
public:
    int minDistance(string word1, string word2)
    {
        int m = word1.size();
        int n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        dp[0][0] = 0;
        for (int i = 0; i <= m; i++)
        {
            dp[i][0] = i;
        }
        for (int j = 1; j <= n; j++)
        {
            dp[0][j] = j;
        }
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                dp[i + 1][j + 1] = dp[i][j];
                if (word1[i] != word2[j])
                {
                    dp[i + 1][j + 1] += 1;
                }
                dp[i + 1][j + 1] = min({dp[i + 1][j + 1], dp[i + 1][j] + 1, dp[i][j + 1] + 1});
            }
        }
        return dp[m][n];
    }
};
```