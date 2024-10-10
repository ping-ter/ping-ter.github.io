#include <iostream>
#include <cstring>
#include <string>
#define MAXF 400000
using namespace std;

struct cow
{
    int F;
    int S;
};

cow cows[512];
int dp[2][MAXF * 2 + 80];

int now = 1;

int main()
{
    // string str = "123 456 abc";

    // 将字符串写入到标准输入流
    // char str[] = ""
    // cin.rdbuf()->pubsetbuf(str, 0x3f3f3f3f);
    // cout << "123";
    // ios::sync_with_stdio(false);
    // cin.tie(nullptr);
    // cout.tie(nullptr);
    // cout << "123";

    memset(dp, ~0x3f3f3f3f, sizeof(dp));
    // cout << "m" ;
    // cout << dp[0][0] << "m";
    int N;
    cin >> N;
    for (int i = 1; i <= N; i++)
    {
        cin >> cows[i].S >> cows[i].F;
    }
    // for (int i = 0; i < 1024; i++)
    // {
    //     dp[0][0][i] = 0;
    //     dp[0][1][i] = 0;
    // }
    // for (int i = 0; i < 400000; i++)
    // {
    //     dp[0][i] = 0;
    // }
    dp[0][0] = 0;
    for (int i = 1; i <= N; i++)
    {
        int l = -1000 * i + MAXF, r = i * 1000 + MAXF;
        int pre = now;
        now = 1 - now;
        dp[now][cows[i].F] = cows[i].S;
        for (int j = l; j <= r; j++)
        {
            // if (dp[pre][j - cows[i].F] <l)
            // {
            //     cout << "true";
            // }
            // else
            // {
            //     cout << "false";
            // }
            // if (dp[pre][j] < dp[pre][j - cows[i].F] + cows[i].S)
            if (dp[pre][j - cows[i].F] > l)
            {
                dp[now][j] = max(dp[pre][j], dp[pre][j - cows[i].F] + cows[i].S);
                cout << "dp[now][j]" << dp[now][j] << "\n";
            }
            // else
            // {
            //     dp[now][j] = cows[i].S;
            //     // dp[now][j] = max(dp[pre][j],
            //     //                  dp[pre][j - cows[i].F] > l ? dp[pre][j - cows[i].F] + cows[i].S : cows[i].S);
            // }
        }
    }

    int maxfs = 0;
    for (int i = -1000 * N + MAXF; i <= 1000 * N + MAXF; i++)
    {
        if (dp[now][i] > -1000 * N + MAXF)
        {
            cout << "dp" << now << "," << i << "," << dp[now][i] << "\n";
        }
        if (maxfs < dp[now][i] + i)
        {
            cout << "dp[now][i]" << dp[now][i] << "i" << i << endl;
            maxfs = dp[now][i] + i;
        }
    }
    cout << maxfs;

    return 0;
}