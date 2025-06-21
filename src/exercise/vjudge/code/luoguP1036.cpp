#include <iostream>
#include <vector>
#define debug(x) #x << ": " << x << " "
#define ll long long
using namespace std;
int x[24];
int s[24] = {0};
int n, k;
int cnt = 0;
int now = 0;
bool isPrime(int a)
{
    if (a < 2)
    {
        return false;
    }
    for (int i = 2; i <= a / 2; i++)
    {
        if (a % i == 0)
        {
            return false;
        }
    }
    return true;
}
void dfs(int j, int st)
{
    if (j == k)
    {
        if (isPrime(now))
        {
            cnt++;
        }
        return;
    }
    if (n - st < k - j)
    {
        return;
    }
    for (int i = st; i < n; i++)
    {
        if (s[i] != 0)
        {
            continue;
        }
        s[i] = 1;
        now += x[i];
        dfs(j + 1, i);
        now -= x[i];
        s[i] = 0;
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> n >> k;
    for (int i = 0; i < n; i++)
    {
        cin >> x[i];
    }
    dfs(0, 0);
    cout << cnt;
    return 0;
}