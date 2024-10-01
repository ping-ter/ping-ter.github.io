#include <iostream>

using namespace std;

long long dp[1024][1024] = {0};
struct person
{
    int c;
    int lose;
    int win;
};
person ps[1024];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    int n, x;
    cin >> n >> x;
    int lose, win, c;
    for (int i = 1; i <= n; i++)
    {
        cin >> lose >> win >> c;
        ps[i] = {c, lose, win};
    }

    for (int j = 0; j <= x; j++)
    {
        dp[0][j] = 0; // 0人收益为0
    }
    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j <= x; j++)
        {
            dp[i][j] = dp[i - 1][j] + ps[i].lose;
            if (j >= ps[i].c)
            {
                dp[i][j] = max(dp[i][j], dp[i - 1][j - ps[i].c] + ps[i].win);
            }
        }
    }

    cout << dp[n][x] * 5;
    return 0;
}