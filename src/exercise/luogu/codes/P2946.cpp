#include <iostream>

#define MOD 100000000
using namespace std;

long long dp[2048][1024];
long long R[2048];
int N, F;

int main()
{
    // cout << (-3 )% 5 << endl;
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    cin >> N >> F;
    for (int i = 1; i <= N; i++)
    {
        cin >> R[i];
        R[i] = R[i] % F;
    }
    R[0] = 0;

    for (int j = 0; j < F; j++)
    {
        dp[0][j] = 0;
    }
    for (int i = 1; i <= N; i++)
    {

        for (int j = 0; j < F; j++)
        // for (int j = F; j < 2 * F; j--)
        {
            // cout << "j - R[i] + F) % F" << (j - R[i] + F) % F << " ";

            dp[i][j] = (dp[i - 1][(j - R[i] + F) % F] + dp[i - 1][j]) % MOD;
        }
        dp[i][R[i]] += 1;
        // for(int p = 0; p < F; p++)
        // {
        //     cout << dp[i][p] << " ";
        // }
        // cout << "\n";
    }
    cout << dp[N][0];
    return 0;
}