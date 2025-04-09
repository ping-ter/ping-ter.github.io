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
