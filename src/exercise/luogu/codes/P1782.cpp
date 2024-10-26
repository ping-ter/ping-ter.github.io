#include <iostream>
#include <deque>
#include <cstring>

#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

ll dp[2][12800];
int now = 0;

struct
{
    ll v; // 体积
    ll w; // 价值
    ll d; // 数量
} goods[12800];

struct
{
    ll a, b, c;
} odd[16];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int n, m, C;
    cin >> n >> m >> C;
    memset(dp, 0, sizeof(dp));

    for (int i = 0; i < n; i++)
    {
        cin >> goods[i].v >> goods[i].w >> goods[i].d;
    }
    for (int i = 0; i < m; i++)
    {
        cin >> odd[i].a >> odd[i].b >> odd[i].c;
    }

    // 正常多重背包
    // for (int i = 0; i < n; i++)
    // {
    //     int pre = now;
    //     now = 1 - now;

    //     for (int b = 0; b < goods[i].v; b++)
    //     {
    //         deque<int> que;

    //         for (int a = 0; a <= C / goods[i].v; a++)
    //         {
    //             int j = a * goods[i].v + b;
    //             int now_v = dp[pre][j] - a * goods[i].w;

    //             while (!que.empty() && a - que.front() > goods[i].d)
    //             {
    //                 que.pop_front();
    //             }
    //             while (!que.empty() && dp[pre][que.back() * goods[i].v + b] - que.back() * goods[i].v <= now_v)
    //             {
    //                 que.pop_back();
    //             }
    //             que.push_back(a);
    //             dp[now][j] = dp[pre][que.front() * goods[i].v + b] + (a - que.front()) * goods[i].w;
    //         }

    //     }
    // }

    // 二进制优化
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

    for (int i = 0; i < m; i++)
    {
        int pre = now;
        now = 1 - now;

        for (int j = 0; j <= C; j++)
        {
            dp[now][j] = dp[pre][j];
            for (int x = 0; x <= j; x++) // 即使x = 0，也有c，所以x为0也要考虑
            {
                dp[now][j] = max(dp[now][j], dp[pre][j - x] + odd[i].a * x * x + odd[i].b * x + odd[i].c);
            }
        }
    }

    cout << dp[now][C];

    return 0;
}
