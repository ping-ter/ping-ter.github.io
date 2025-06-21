# 搜索

## 全排列 洛谷-U518153

直接搜

```c++
#include <iostream>
#include <vector>
#define debug(x) #x << ": " << x << " "
#define ll long long
using namespace std;
vector<int> arr(10, 0);
vector<int> now;
int n;

void dfs(int j)
{
    if (j == 0)
    {
        for (const auto& i : now)
        {
            cout << i << " ";
        }
        cout << "\n";
        return;
    }
    for (int i = 1; i <= n; i++)
    {
        if (arr[i] != 0)
        {
            continue;
        }
        arr[i] = 1;
        now.push_back(i);
        dfs(j - 1);
        arr[i] = 0;
        now.pop_back();
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    cin >> n;
    dfs(n);
    return 0;
}
```

## 选数 洛谷-P1036

这里是组合不是排列，顺序无关，所以搜索方式与上面稍微有点区别

```c++
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
```

## 全球变暖 洛谷-P8662

先并查集找到所有岛屿，然后根据规则删岛屿。

```c++
#include <iostream>
#include <vector>
#include <cstring>
#include <unordered_map>
#define debug(x) #x << ": " << x << " "
#define ll long long
using namespace std;

int N;
char m[1024][1024];
int uf_set[1024][1024];
struct Point
{
    int x;
    int y;
};
inline int trans(int x, int y)
{
    return x * N + y;
}
inline Point intrans(int c)
{
    return {c / N, c % N};
}

int find_set(const Point &a)
{
    int fa = uf_set[a.x][a.y];
    if (fa >= 0)
    {
        fa = find_set(intrans(fa));
        uf_set[a.x][a.y] = fa;
        return fa;
    }
    else
    {
        return trans(a.x, a.y);
    }
}
void union_set(const Point &a, const Point &b)
{
    int fa = find_set(a);
    int fb = find_set(b);
    if (fa == fb)
    {
        return;
    }
    Point pfb = intrans(fb);
    uf_set[pfb.x][pfb.y] = fa;
}

bool check(int i, int j)
{
    if (i - 1 >= 0 && m[i - 1][j] == '.')
    {
        return true;
    }
    if (j - 1 >= 0 && m[i][j - 1] == '.')
    {
        return true;
    }
    if (i + 1 < N && m[i + 1][j] == '.')
    {
        return true;
    }
    if (j + 1 < N && m[i][j + 1] == '.')
    {
        return true;
    }
    return false;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    cin >> N;
    memset(uf_set, -1, sizeof(int) * 1024 * 1024);
    for (int i = 0; i < N; i++)
    {
        cin >> m[i];
    }
    // 构建并查集
    for (int i = 1; i < N; i++)
    {
        if (m[i][0] == '#' && m[i - 1][0] == '#')
        {
            union_set({i - 1, 0}, {i, 0});
        }
    }
    for (int i = 1; i < N; i++)
    {
        if (m[0][i] == '#' && m[0][i - 1] == '#')
        {
            union_set({0, i - 1}, {0, i});
        }
    }
    for (int i = 1; i < N; i++)
    {
        for (int j = 1; j < N; j++)
        {
            if (m[i][j] == '#')
            {
                if (m[i - 1][j] == '#')
                {
                    union_set({i - 1, j}, {i, j});
                }
                if (m[i][j - 1] == '#')
                {
                    union_set({i, j - 1}, {i, j});
                }
            }
        }
    }
    unordered_map<int, int> islands;
    // 扫描计数
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (m[i][j] == '#')
            {
                int idx;
                if (uf_set[i][j] < 0)
                {
                    idx = trans(i, j);
                }
                else
                {
                    idx = find_set({i, j});
                }
                if (islands.find(idx) == islands.end())
                {
                    islands.insert(make_pair(idx, 0));
                }
                islands[idx]++;
            }
        }
    }
    // 淹没
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            if (m[i][j] == '#' && check(i, j))
            {
                int idx;
                if (uf_set[i][j] < 0)
                {
                    idx = trans(i, j);
                }
                else
                {
                    idx = find_set({i, j});
                }
                islands[idx]--;
            }
        }
    }
    int cnt = 0;
    for (const auto &i : islands)
    {
        if (i.second == 0)
        {
            cnt++;
        }
    }
    cout << cnt;
    // for (int i = 0; i < N; i++)
    // {
    //     for (int j = 0; j < N; j++)
    //     {
    //         cout << uf_set[i][j] << " ";
    //     }
    //     cout << "\n";
    // }

    return 0;
}
```

一开始没过，问了下ai是

```c++
cin >> N;
// ...
for (int i = 0; i < N; i++)
{
  cin.getline(m[i], 1024);
}
```

读取时有bug，应该直接用cin读
