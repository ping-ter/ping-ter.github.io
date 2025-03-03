#include <bits/stdc++.h>
#define ll long long
#define debug(x) #x << ": " << x << " "

using namespace std;

int dp[1][1 << 20 + 4];
int items[128];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    memset(items, 0, sizeof(int) * 128);
    memset(dp, 0x3f3f3f3f, sizeof(int) * 1 * (1 << 20 + 4));

    int N, M, K;
    cin >> N >> M >> K;
    int a;
    for (int i = 1; i <= N; i++)
    {
        for (int j = 0; j < K; j++)
        {
            cin >> a;
            items[i] |= 1 << (a - 1);
        }
    }
    int sta_max = (1 << M) - 1;
    int now = 0;
    dp[now][0] = 0;
    for (int i = 1; i <= N; i++)
    {
        for (int j = sta_max; j > 0; j--)
        {
            dp[now][j] = min(dp[now][j], dp[now][j & (~items[i])] + 1);
        }
    }
    if (dp[now][sta_max] > N)
    {
        cout << -1;
    }
    else
    {
        cout << dp[now][sta_max];
    }

    return 0;
}
