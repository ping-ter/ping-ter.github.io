# 背包DP

背包问题是动态规划经典问题之一,物品有重量,价值,数量或是其他属性,要研究怎么样在有限的背包中取价值最大的物品

[背包题单](https://www.luogu.com.cn/training/231055)
[背包问题 附单调队列优化多重背包](https://www.luogu.com.cn/article/7339h2ok)

## 01背包

给定n种物品,各有重量和价值,并且都只有1件,即要么不放要不放,所以叫01背包

### 01背包题目

+ [P1802 5倍经验日](../../exercise/luogu/P1802.md)
+ [P2946 Cow Frisbee Team S](../../exercise/luogu/P2946.md)
+ [难,未完成(用搜索过了)]  [P2340 Cow Exhibition G](../../exercise/luogu/P2340.md)


## 完全背包

每种物品有无限多个,可重复选取,解法与01背包类似

### 完全背包题目

+ [P1616 疯狂的采药](../../exercise/luogu/P1616.md)
+ [P2918 [USACO08NOV]Buying Hay S](../../exercise/luogu/P2918.md)
+ [P1853 投资的最大效益](../../exercise/luogu/P1853.md)

## 多重背包

物品个数有限(1至多个),解决方法有暴力拆分(视为多个物品),二进制拆分,单调队列,单调队列为最优解

### 多重背包模版

```c++
// 二进制拆分
ll dp[2][12800];
int now = 0;

struct
{
    ll v; // 体积
    ll w; // 价值
    ll d; // 数量
} goods[12800];
    
    for (int i = 0; i < n; i++)
    {

        int s = goods[i].d;
        for (int c = 1; s >= c; s -= c, c <<= 1)
        {
            int now_v = goods[i].v * c;
            int now_w = goods[i].w * c;

            for (int j = C; j >= now_v; j--)
            {
                dp[now][j] = max(dp[now][j], dp[now][j - now_v] + now_w);
            }
        }
        if (s != 0)
        {
            int now_v = goods[i].v * s;
            int now_w = goods[i].w * s;

            for (int j = C; j >= now_v; j--)
            {
                dp[now][j] = max(dp[now][j], dp[now][j - now_v] + now_w);
            }
        }
    }
```

```c++
// 单调队列
struct
{
    int v, w, m; // 价值,重量,数量
} goods[128];

int dp[2][40960]; // 使用滚动数组
int now = 0;
    for (int i = 1; i <= n; i++)
    {
        int pre = now;
        now = 1 - now;
        // 物品循环
        // 以余数分组
        // f[i][j]=max(f[i−1][k′∗d+b]−k′∗w[i])+a∗w[i]
        // j = a * w + b
        // k' = a - k
        // 注意j和k'是正相关的
        // int a = W / min(W / goods[i].w, goods[i].m); // 最大能选的数目
        for (int b = 0; b < goods[i].w; b++)
        {

            deque<int> que;
            for (int k = 0; k <= W / goods[i].w; k++)
            {
                // 加上k*w[i]的原因:
                // 我们的单调队列维护的是前i-1种的状态最大值.
                // 因此这里加上k*w[i].
                // k和b的组合其实就是j
                int j = k * goods[i].w + b;
                int now_v = dp[pre][j] - k * goods[i].v;

                while (!que.empty() && k - que.front() > goods[i].m)
                {
                    que.pop_front();
                }
                while (!que.empty() && dp[pre][que.back() * goods[i].w + b] - que.back() * goods[i].v <= now_v)
                {
                    que.pop_back();
                }
                que.push_back(k);
                // 插入到单调队列, 注意, 单调队列中存的是位序, 这里存的是k
                dp[now][j] = dp[pre][que.front() * goods[i].w + b] + (k - que.front()) * goods[i].v;
            }
        }
    }
```

### 多重背包题目

+ [P1776 宝物筛选](../../exercise/luogu/P1776.md)
+ [P5365 英雄联盟](../../exercise/luogu/P5365.md)
+ [P1782 旅行商的背包](../../exercise/luogu/P1782.md)

## 分组背包

## 多维背包

## 混合背包