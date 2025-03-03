#include <bits/stdc++.h>
#define ll long long
#define debug(x) #x << ": " << x << " "
// #define debug(x) ""

using namespace std;

struct item
{
    int h;
    int a;
    int c;
};

item items[500];
int dp[500][40960];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    memset(dp, 0, sizeof(int) * 500 * 40960);
    int N;
    cin >> N;
    for (int i = 1; i <= N; i++)
    {
        cin >> items[i].h >> items[i].a >> items[i].c;
    }
    // // 找最大h_max
    // int h_max = 0;
    // for (int i = 1; i <= N; i++)
    // {
    //     if (items[i].a > h_max)
    //     {
    //         h_max = items[i].a;
    //     }
    // }
    sort(items + 1, items + N + 1, [](const item &a, const item &b)
         { return a.a < b.a; });
    int h_max = items[N].a;
    // cout << debug(h_max);
    // for (int i = 1; i <= N; i++)
    // {
    //     cout << debug(items[i].a) << debug(items[i].h);
    // }
    int now = 0;
    for (int i = 1; i <= N; i++)
    {
        for (int k = 1; k <= items[i].c; k++)
        {
            for (int j = items[i].a; j >= items[i].h; j--)
            {
                dp[now][j] = max(dp[now][j], dp[now][j - items[i].h] + items[i].h);
            }
        }
    }
    // for (int i = 1; i <= N; i++)
    // {

    //     int s = items[i].c;
    //     // 二进制优化
    //     for (int c = 1; s >= c; s -= c, c <<= 1)
    //     {

    //         // for (int j = h_max; j >= 0; j--)
    //         // {
    //         //     int now_h = items[i].h * c;
    //         //     // dp[i][j] = max(dp[i][j], dp[i - 1][j]);
    //         //     //  max(dp[i - 1][j], dp[i - 1][j - now_h] + now_h);
    //         //     if (j >= now_h && dp[now][j] < dp[now][j - now_h] + now_h && dp[now][j - now_h] + now_h <= items[i].a)
    //         //     {
    //         //         dp[now][j] = dp[now][j - now_h] + now_h;
    //         //     }
    //         // }
    //         for (int j = items[i].a; j >= items[i].h; j--)
    //         {
    //             int now_h = items[i].h * c;

    //             dp[now][j] = max(dp[now][j],dp[now][j - now_h] + now_h);
    //         }
    //     }
    //     // 分割后的剩余
    //     if (s != 0)
    //     {
    //         for (int j = items[i].a; j >= items[i].h; j--)
    //         {
    //             int now_h = items[i].h * s;

    //             dp[now][j] = max(dp[now][j],dp[now][j - now_h] + now_h);
    //         }
    //         // for (int j = h_max; j >= 0; j--)
    //         // {
    //         //     int now_h = items[i].h * s;
    //         //     // dp[i][j] = max(dp[i][j], dp[i - 1][j]);
    //         //     //  max(dp[i - 1][j], dp[i - 1][j - now_h] + now_h);
    //         //     if (j >= now_h && dp[now][j] < dp[now][j - now_h] + now_h && dp[now][j - now_h] + now_h <= items[i].a)
    //         //     {
    //         //         dp[now][j] = dp[now][j - now_h] + now_h;
    //         //     }
    //         // }
    //         // cout << debug(i) << debug(s) << debug(dp[now][h_max]) << endl;
    //     }
    // }
    int m = 0;
    for (int i = 0; i <= h_max; i++)
    {
        // cout << debug(dp[now][i]);
        if (dp[now][i] > m)
        {
            m = dp[now][i];
        }
    }
    // cout << dp[now][h_max];
    cout << m;

    return 0;
}