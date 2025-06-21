# 热门100题part10（337.打家劫舍III 121.买卖股票的最佳时机 312.戳气球 309.买卖股票的最佳时机含冷冻期 301.删除无效的括号）

## 337.打家劫舍III

还是动态规划，只不过从线性的变成树形的了，大体思路还是差不多的。
后根遍历，每次有2种选择：打劫这家，然后获得当前+各个孙子节点最大值；不打劫，获得孩子节点最大值。
这个过程递推只用到了孙子最大值和孩子最大值，所以不需要建树，但是需要返回这两值，用pair就可以了。

```c++
class Solution
{
    pair<int, int> dfs(TreeNode *root)
    {
        if (root == nullptr)
        {
            return make_pair(0, 0);
        }
        auto l = dfs(root->left);
        auto r = dfs(root->right);
        int max_children = l.first + r.first;
        return make_pair(max(l.second + r.second + root->val, max_children), max_children);
    }

public:
    int rob(TreeNode *root)
    {
        return dfs(root).first;
    }
};
```

## 121.买卖股票的最佳时机

简单题。维护一个最小值，遍历到大于他的就更新最大利润，小于他的就更新最小值。

```c++
class Solution
{
public:
    int maxProfit(vector<int> &prices)
    {
        int min_price = prices[0];
        int max_pro = 0;
        int n = prices.size();
        for (int i = 1; i < n; i++)
        {
            if (prices[i] < min_price)
            {
                min_price = prices[i];
            }
            else
            {
                max_pro = max(max_pro, prices[i] - min_price);
            }
        }
        return max_pro;
    }
};
```

## 312.戳气球

这个有点难。如果DFS的话，$2^300$会爆，考虑动态规划。
对于一个状态P，当前戳气球的收益只取决于戳哪个，跟怎么到这个状态的没关系，也就是说可以使用状态压缩DP。但是看了一眼数据范围，n最大300，状态压缩DP一定会超时。

后来了解到是区间DP，先去做了一遍`石子合并`，然后回来以区间DP的方法处理这个题目。

区间长度为1时，硬币数就是nums[i]乘以区间两侧；长度为2时，假设区间内是m,n，两侧是l,r，那么最大硬币数是$max(lmn+lnr, mnr+lmr)$，分别是先戳m或先戳n，而lmn和mnr在长度为1的情况下已经求过，只需要求lnr和lmr；长度为3时，要划分成两部分，2+1，2的部分最大值是之前求过的，1的部分是lr乘以剩下的，总共2种拆法；长度为4时，先戳的一部分交由前面来求，但是第二下戳的就不行了，所以这么递推有些问题。

最后看了几篇大佬的讲解终于看懂了。
以开区间戳气球问题为子问题，以区间最后一个戳破的气球中转，进行状态转移。

```c++
class Solution
{

public:
    int maxCoins(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> arr;
        arr.push_back(1);
        for (const int &i : nums)
        {
            arr.push_back(i);
        }
        arr.push_back(1);

        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int sep = 2; sep <= n + 1; sep++)
        {
            for (int i = 0; i <= n + 1 - sep; i++)
            {
                int j = i + sep;
                for (int k = i + 1; k < j; k++)
                {
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + arr[k] * arr[i] * arr[j]);
                }
            }
            int a;
        }
        return dp[0][n + 1];
    }
};
```

## 309.买卖股票的最佳时机含冷冻期

`121.买卖股票的最佳时机`的基础上增加了1天冷却的冷却期，并且可以多次买入卖出（不能同时参与多笔）。可以想到：再某一状态下，如果购买当前股票，那么前提是之前的已经卖完了，而只要手中没股票，当前的最大的价值就是之前所能达到的最大值，而跟具体怎么做的无关，因此可以动态规划。

```c++
class Solution
{
    int dp[5050];

public:
    int maxProfit(vector<int> &prices)
    {
        int n = prices.size();
        // fill(dp, dp + n + 1, 0);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
        {
            dp[i] = max(dp[i - 1], prices[i - 1] - prices[0]);
            for (int j = 2; j < i; j++)
            {
                dp[i] = max(dp[i], dp[j - 2] + prices[i - 1] - prices[j - 1]);
            }
        }
        return dp[n];
    }
};
```

但是看了官解，还有更省时间的DP方法
比较巧妙的地方是之前要考虑卖掉的股票是在哪买的，实际上可以从收益中减去这个值

## 301.删除无效的括号

先贪心思考一下：用栈判断是否匹配，发现右括号失配时，必须删掉一个左括号，那么有多少删法？首先可以删除自己，还有与自己连续的右括号，但是本质是一样的，还有就是可以向前寻找，删掉前面的某个右括号（不会影响匹配）。然后考虑左括号失配怎么删，左括号失配只会在最后发现，因此只能删除最后一个右括号之后的所有左括号。

```c++
class Solution
{
    vector<vector<string>> toans;
    vector<string> ans;
    string now_str = "";
    void dfs(int rank)
    {
        if (toans.size() <= rank)
        {
            ans.push_back(now_str);
            return;
        }
        for (const string &str : toans[rank])
        {
            now_str += str;
            dfs(rank + 1);
            now_str = now_str.substr(0, now_str.size() - str.size());
        }
    }

public:
    vector<string> removeInvalidParentheses(string s)
    {
        int l = 0;

        stack<int> r; // 右括号下标
        int n = s.size();
        int begin = 0;
        int cnt = -1;

        for (int i = 0; i < n; i++)
        {
            if (s[i] == '(')
            {
                l++;
            }
            else if (s[i] == ')')
            {
                if (l > 0)
                {
                    l--;
                    if (s[i - 1] != ')')
                    {
                        r.push(i);
                    }
                }
                else
                {
                    cnt++;
                    toans.push_back(vector<string>());
                    if (r.empty())
                    {
                        toans[cnt].push_back("");
                    }
                    while (!r.empty())
                    {
                        int idx = r.top();
                        r.pop();
                        toans[cnt].push_back(s.substr(begin, idx - begin) + s.substr(idx + 1, i - idx));
                    }

                    begin = i + 1;
                }
            }
        }
        int split_idx = begin;
        int r_cnt = cnt;
        begin = n - 1;
        // 处理多余的左括号
        r = stack<int>();
        for (int i = n - 1; i >= split_idx; i--)
        {
            if (s[i] == ')')
            {
                l--;
            }
            else if (s[i] == '(')
            {
                if (l > 0)
                {
                    l++;
                    if (s[i - 1] != '(')
                    {
                        r.push(i);
                    }
                }
                else
                {
                    cnt++;
                    toans.push_back(vector<string>());
                    if (r.empty())
                    {
                        toans[cnt].push_back("");
                    }
                    while (!r.empty())
                    {
                        int idx = r.top();
                        r.pop();
                        toans[cnt].push_back(s.substr(begin, idx - begin) + s.substr(idx + 1, i - idx));
                    }

                    begin = i - 1;
                }
            }
        }

        vector<vector<string>> ans_pre;
        dfs(0);
        return ans;
    }
};
```

过于复杂，不好debug，遂放弃，转向搜索。
先计算出需要删除的左括号和右括号数量，然后以此剪枝。
从最左侧开始遍历，能得到最大右括号数；从右边，能得到最大的左括号数，也可以作为剪枝的依据。
