#include <iostream>
#include <cstring>
#define ll long long
#define debug(x) #x << ":" << x << " "

using namespace std;

struct
{
    ll a;
    ll b;
} debt[50];

ll dp[50000];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    memset(dp, 0, sizeof(dp));
    ll s, n, d;
    cin >> s >> n >> d;
    for (int i = 1; i <= d; i++)
    {
        cin >> debt[i].a >> debt[i].b;
        debt[i].a /= 1000;
    }

    double m = 1.1;
    for (int i = 0; i < n; i++)
    {
        m *= 1.1;
    }
    // cout << debug(s) << debug(m) ;
    ll maxj = (s * m) / 1000 + 1;
    // cout << maxj << " ";
    // cout << debug(maxj);

    for (int i = 1; i <= d; i++)
    {
        for (int j = debt[i].a; j <= maxj; j++)
        {
            dp[j] = max(dp[j], dp[j - debt[i].a] + debt[i].b);
        }
    }
    ll money = s;
    // 逐年递推
    for (int i = 0; i < n; i++)
    {
        // cout << debug(money);
        money += dp[money / 1000];
    }
    cout << money;
    return 0;
}
