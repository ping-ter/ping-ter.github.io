---
date: 2024-09-28
---

# 进阶DP

[题单](https://www.luogu.com.cn/training/1435)

## 状态压缩DP

+ [P8687 [蓝桥杯 2019 省 A] 糖果](https://www.luogu.com.cn/problem/P8687)

## 区间DP

+ [P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)

区间长度为2时，就是两两合并，求和就是最大结果；长度为3时，可以分割成2+1，最大结果就是两者和的最大值+区间和；为4时，可以分成2+2或者3+1，但仍然是两部分和的最大值，加上区间和，因此可以得到状态转移方程：

$f(i,j)=\begin{cases} 
0 & ,j-i=0 \\
a_i+a_j & ,j-i=1 \\
\max\limits_{i<k<j}\{f(i,k)+f(k+1,j)+ \sum_{t=i}^j a_t \} & ,j-i \geq 2
\end{cases}
$

从这个递推就可以，另外，求和可以用前缀和来简化，而且于k无关，可以转化成：

$f(i,j)=\max\limits_{i<k<j}\{f(i,k)+f(k+1,j) \}+ sum_j - sum_{i-1}$

处理环可以复制一遍变成链。

```c++
#include <bits/stdc++.h>

using namespace std;
#define ll long long
#define debug(x) #x << ": " << x << " "

ll a[256];
ll sum[256];
ll dp[256][256];
ll dp_min[256][256];
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int N;
    cin >> N;
    if (N == 1)
    {
        cout << 0;
        return 0;
    }
    sum[0] = 0;
    for (int i = 1; i <= N; i++)
    {
        cin >> a[i];
        sum[i] = sum[i - 1] + a[i];
        dp[1][i - 1] = a[i - 1] + a[i];
    }
    for (int i = N + 1; i <= 2 * N; i++)
    {
        a[i] = a[i - N];
        sum[i] = sum[i - 1] + a[i];
        dp[1][i - 1] = a[i - 1] + a[i];
    }
    memset(dp[0], 0, sizeof(ll) * 256);
    memcpy(dp_min, dp, sizeof(ll) * 256 * 2);
    for (int sep = 2; sep < N; sep++)
    {
        for (int i = 1; i <= 2 * N - sep; i++)
        {
            dp[sep][i] = 0;
            dp_min[sep][i] = 0x3f3f3f3f;
            int j = i + sep;
            for (int k = i; k < i + sep; k++)
            {
                dp[sep][i] = max(dp[sep][i], dp[k - i][i] + dp[j - k - 1][k + 1]);
                dp_min[sep][i] = min(dp_min[sep][i], dp_min[k - i][i] + dp_min[j - k - 1][k + 1]);
                // cout << debug(dp_min[sep][i]) << debug(sep) << debug(i);
            }
            dp[sep][i] += sum[i + sep] - sum[i - 1];
            dp_min[sep][i] += sum[i + sep] - sum[i - 1];
        }
    }
    ll min_v = 0x3f3f3f3f;
    ll max_v = 0;
    for (int i = 1; i <= N + 1; i++)
    {
        // cout << debug(dp_min[N - 1][i]) << debug(i) << "\n";
        min_v = min(min_v, dp_min[N - 1][i]);
        max_v = max(max_v, dp[N - 1][i]);
    }
    cout << min_v << "\n"
         << max_v;

    return 0;
}
```