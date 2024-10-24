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

    // fstream in;
    // in.open("in.txt", ios::in);
    // cin.rdbuf(in.rdbuf());
    memset(dp, 0, sizeof(dp));
    int n, W;
    cin >> n >> W;
    for (int i = 1; i <= n; i++)
    {
        cin >> goods[i].v >> goods[i].w >> goods[i].m;
    }

    for (int i = 1; i <= n; i++)
    {
        int pre = now;
        now = 1 - now;

        // 物品循环
        // 以余数分组
        // f[i][j]=max(f[i−1][k′∗d+b]−k′∗w[i])+a∗w[i]
        // j = a * w + b
        // k' = a - k
        // 注意j和k'是正相关的
        // int a = W / min(W / goods[i].w, goods[i].m); // 最大能选的数目

        for (int b = 0; b < goods[i].w; b++)
        {

            deque<int> que;
            // dp[now][b] = dp[]
            // 物品件数循环
            //
            for (int k = 0; k <= W / goods[i].w; k++)
            {
                // 加上k*w[i]的原因:
                // 我们的单调队列维护的是前i-1种的状态最大值.
                // 因此这里加上k*w[i].
                // k和b的组合其实就是j
                int j = k * goods[i].w + b;
                
                int nowv = 
            }
        }
        for (int p = 0; p <= W; p++)
        {
            cout << dp[now][p] << " ";
        }
        cout << "\n";
    }

    cout << dp[now][W];

    return 0;
}
