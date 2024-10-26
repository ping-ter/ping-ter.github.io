#include <iostream>
#include <cstring>
#include <deque>
#include <fstream>
#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

struct
{
    int v, w, m; // 价值,重量,数量
} goods[128];

int dp[2][40960]; // 使用滚动数组
int now = 0;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    memset(dp, 0, sizeof(dp));
    int n, W;
    cin >> n >> W;
    for (int i = 1; i <= n; i++)
    {
        cin >> goods[i].v >> goods[i].w >> goods[i].m;
    }

    for (int i = 1; i <= n; i++)
    {
        // for (int c = 1, s = goods[i].m; s != 0; s >>= 1, c <<= 1)
        // 这么拆是错误的, 这样不能组成任意的
        int s = goods[i].m;
        for (int c = 1; s >= c; s -= c, c <<= 1)
        {
            // int pre = now;
            // now = 1 - now;
            int now_v = goods[i].v * c;
            int now_w = goods[i].w * c;

            for (int j = W; j >= now_w; j--)
            {
                dp[now][j] = max(dp[now][j], dp[now][j - now_w] + now_v);
            }
        }
        if (s != 0) // 二进制剩余
        {
            int now_v = goods[i].v * s;
            int now_w = goods[i].w * s;

            for (int j = W; j >= now_w; j--)
            {
                dp[now][j] = max(dp[now][j], dp[now][j - now_w] + now_v);
            }
        }
    }

    cout << dp[now][W];

    return 0;
}
