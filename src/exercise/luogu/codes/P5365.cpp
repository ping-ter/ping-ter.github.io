#include <iostream>
#include <cstring>
#include <deque>
#define debug(x) #x << ":" << x << " "
#define ll long long

using namespace std;

struct
{
    ll K; // 数量
    ll C; // 价格
} heroes[256];
ll dp[2][300000];
int now = 0;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    // memset(dp, 1, sizeof(dp));

    ll N, M;
    cin >> N >> M;

    for (int i = 1; i <= N; i++)
    {
        cin >> heroes[i].K;
    }
    for (int i = 1; i <= N; i++)
    {
        cin >> heroes[i].C;
    }
    int maxcost = 0; // 计算一下最大的花费
    for (int i = 1; i <= N; i++)
    {
        maxcost += heroes[i].C * heroes[i].K;
    }

    for (int j = 0; j <= maxcost; j++)
    {
        // if (dp[now][j] >= M)
        // {
        dp[now][j] = 1;
        //     break;
        // }
    }

    // 正常多重背包
    // for (int i = 1; i < N; i++)
    // {
    //     int pre = now;
    //     now = 1 - pre;

    //     for (int b = 0; b < heroes[i].C; b++)
    //     {
    //         deque<ll> que;

    //         for (int a = 0; a < maxcost / heroes[i].C; a++)
    //         {
    //             int j = a * heroes[i].C + b;
    //             while (!que.empty() && a - que.front() > heroes[i].K)
    //             {
    //                 que.pop_front();
    //             }
    //             while (!que.empty() && dp[pre][que.back() * heroes[i].C + b] )
    //             {
    //                 que.pop_back();
    //             }
    //             que.push_back(a);
    //             int skins = a;
    //             if (skins == 0)
    //             {

    //             }

    //             dp[now][j] = dp[pre][que.front() * heroes[i].C + b] * ();
    //         }
    //     }
    // }
    // for (int j = 0; j <= maxcost; j++)
    // {
    //     // if (dp[now][j] >= M)
    //     // {
    //         cout << dp[now][j] << " ";
    //     //     break;
    //     // }
    // }

    // 尝试二进制拆分
    for (int i = 1; i <= N; i++)
    {
        // int pre = now;
        // now = 1 - pre;
        // 一维数组足矣
        // int s = heroes[i].K;
        // for (int c = 1; s != 0; c *= 2, s >> 1)
        // {
        //     int cost = c * heroes[i].C;
        //     int
        // }
        int pre = now;
        now = 1 - now;
        for (int j = 0; j <= maxcost; j++)
        {
            dp[now][j] = dp[pre][j];
            for (int c = 1; c <= heroes[i].K && c <= j / heroes[i].C; c++)
            {
                dp[now][j] = max(dp[now][j], dp[pre][j - c * heroes[i].C] * c);
            }
        }
        // for (int j = 0; j <= maxcost; j++)
        // {
        //     cout << dp[now][j] << " ";
        // }
        // cout << "\n";
    }
    for (int j = 0; j <= maxcost; j++)
    {
        if (dp[now][j] >= M)
        {
            cout << j;
            break;
        }
    }

    return 0;
}
