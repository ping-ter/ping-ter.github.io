# 热门100题part10（337.打家劫舍III 121.买卖股票的最佳时机）

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

这个有点难。如果DFS的话，$2^300$会爆，但是动态规划有点找不到可以推的点。

## 309.买卖股票的最佳时机含冷冻期

`121.买卖股票的最佳时机`的基础上增加了1天冷却的冷却期，并且可以多次买入卖出（不能同时参与多笔）。