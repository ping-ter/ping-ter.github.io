#include <iostream>
#include <cstring>
#define debug(x) #x << ":" << x << " "

using namespace std;

struct
{
    int weight;
    int cost;
} hay[128];

int dp[55020];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int N, H;
    cin >> N >> H;
    
    memset(dp,0x3f3f3f3f,sizeof(dp));
    dp[0] = 0;
    for (int i = 1; i <= N; i++)
    {
        cin >> hay[i].weight >> hay[i].cost;
    }

    for (int i = 1; i <= N; i++)
    {
        for (int j = hay[i].weight; j <= H + 5000; j++)
        {
            dp[j] = min(dp[j],dp[j - hay[i].weight] + hay[i].cost);
        }
    }

    int minc = dp[H];
    for (int j = H + 1; j <= H + 5000;j++)
    {
        // cout << debug(dp[j]);
        minc = min(minc, dp[j]);
    }

    cout << minc;
    return 0;
}
