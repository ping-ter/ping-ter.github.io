#include <iostream>
#include <cstring>
#include <algorithm>
#define debug(x) #x << ": " << x << " "
using namespace std;

struct herb
{
    long long time;
    long long value;
};

herb herbs[10240];

// int dp[2][10000020];
long long dp[10000020];

int gcd(int a, int b)
{
    while (b != 0)
    {
        int tmp = a;
        a = b;
        b = tmp % b;
    }
    return a;
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    memset(dp, 0, sizeof(dp));
    int t, m;
    cin >> t >> m;

    for (int i = 1; i <= m; i++)
    {
        cin >> herbs[i].time >> herbs[i].value;
    }

    // int gcd_num = herbs[1].time;
    // for (int i = 2; i <= m && gcd_num > 1; i++)
    // {
    //     gcd_num = gcd(gcd_num, herbs[i].time);
    // }
    int gcd_num = 1;
    // cout << debug(gcd_num);

    for (int i = 1; i <= m; i++)
    {
        for (int j = herbs[i].time; j <= t; j += gcd_num)
        {

            dp[j] = max(dp[j], dp[j - herbs[i].time] + herbs[i].value);

            // 都不需要
            // for (int k = 0; k * herbs[i].time <= j; k++)
            // {
            //     // dp[now][j] = max(dp[now][j], dp[pre][j - k * herbs[i].time] + k * herbs[i].value);
            //     // if (i == 3)
            //     // {
            //         // cout << debug(i) << debug(j) << debug(k) << debug(dp[now][j]) << "\n";
            //     // }
            // }
        }
    }

    cout << dp[t - (t % gcd_num)];

    return 0;
}