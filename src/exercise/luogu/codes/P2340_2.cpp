// 搜索版
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
int cnt = 0;

struct
{
    int F;
    int S;
    int sum;
} sums[512], usums[512]; // 后缀和,正后缀和,只记录最大值

int nowmax = 0;

int dfs(int nowcow, int nowf, int nows)
{
    if (nowf + usums[nowcow].F < 0)
    {
        return 0; // 救不了
    }
    else if (nows + usums[nowcow].S < 0)
    {
        return 0;
    }
    else if (nows + nowf + usums[nowcow].sum < nowmax)
    {
        return 0;
    }

    if (nowcow > cnt)
    {
        nowmax = max(nowmax, nowf + nows);
        // if (nowf < 0)
        // {
        //     return 0;
        // }
        // else if (nows < 0)
        // {
        //     return 0;
        // }
        return nowf + nows;
    }
    // 两种选择，要or不要
    return max(dfs(nowcow + 1, nowf, nows), dfs(nowcow + 1, nowf + cows[nowcow].F, nows + cows[nowcow].S));
}

int main()
{

    int N;
    cin >> N;
    int bases = 0;
    int basef = 0;
    // 全正的一定取，全负的一定不取
    for (int i = 1; i <= N; i++)
    {
        int f, s;
        cin >> f >> s;
        if (f >= 0 && s >= 0)
        {
            basef += f;
            bases += s;
            continue;
        }
        else if (f <= 0 && s <= 0)
        {
            continue;
        }
        cnt++;
        cows[cnt].F = f;
        cows[cnt].S = s;
    }

    sums[cnt + 1] = {0, 0, 0};
    usums[cnt + 1] = {0, 0, 0};
    // 计算前缀和
    for (int i = cnt; i >= 1; i--)
    {
        sums[i].F = sums[i + 1].F + cows[i].F;
        sums[i].S = sums[i + 1].S + cows[i].S;
        sums[i].sum = sums[i].F + sums[i].S;

        usums[i].F = usums[i + 1].F;
        usums[i].S = usums[i + 1].S;
        usums[i].sum = usums[i + 1].sum;
        if (cows[i].F > 0)
        {
            usums[i].F = usums[i + 1].F + cows[i].F;
        }
        if (cows[i].S > 0)
        {
            usums[i].S = usums[i + 1].S + cows[i].S;
        }
        if (cows[i].F + cows[i].S > 0)
        {
            usums[i].sum = usums[i + 1].sum + cows[i].S + cows[i].F;
        }
    }

    cout << dfs(1, basef, bases);

    return 0;
}