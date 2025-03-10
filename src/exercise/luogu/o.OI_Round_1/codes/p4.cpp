#include <iostream>
#include <list>
#include <map>
#include <string.h>
#define debug(x) #x << ": " << x << " "
#define ll long long
using namespace std;

// struct node
// {
//     int l;
//     int r;
//     node() : l(0), r(0) {}
// };

map<int, int> a; // 寄存器
int a_counts[13];
int a_v[13];
struct node
{
    list<int> next;
};
node nodes[400004];
int S[400004];
int ex[400004];

int insertA(int i)
{
    int ans = -1;
    for (int j = 1; j <= 12; j++)
    {
        // cout << debug(a_counts[j]) << debug(a_v[j]) << debug(nodes[a_v[j]].next.size()) << "\n";
        if (a_v[j] == -1 || a_counts[j] >= nodes[a_v[j]].next.size())
        {
            ans = j;
            break;
        }
    }
    if (ans == -1)
    {
        while (1)
        {
        }
    }
    cout << "1 " << ans << " " << i << "\n";

    a.insert(make_pair(i, ans));
    a_v[ans] = i;
    a_counts[ans] = 0;
    return ans;
}

// int cnt = 1;

int getfromA(int i)
{
    auto p = a.find(i);
    int ans;
    if (p == a.end())
    {
        ans = insertA(i);
        // ans = cnt;
        // a.insert(make_pair(i, ans));
        // cout << "1 " << ans << " " << i << "\n";
        // cnt += 1;
        // if (cnt == 13)
        // {
        //     cnt = 1;
        // }
    }
    else
    {
        ans = (*p).second;
    }

    return ans;
}

void dfs(int st)
{
    if (S[st] == 1)
    {
        return;
    }
    S[st] = 1;
    // a.insert(make_pair(st, ))
    for (int i : nodes[st].next)
    {
        dfs(i);
    }

    for (int i : nodes[st].next)
    {
        // 找到父节点
        if (ex[i] == 0)
        {
            int y = getfromA(st);
            int x = getfromA(i);
            a_counts[y]++;
            a_counts[x]++;
            cout << "2 " << x << " " << y << "\n";
            ex[st] = 1;
            return;
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    memset(S, 0, sizeof(int) * 400004);
    memset(ex, 0, sizeof(int) * 400004);
    memset(a_counts, 0, sizeof(int) * 13);
    memset(a_v, -1, sizeof(int) * 13);
    int n;
    cin >> n;
    int a, b;
    for (int i = 0; i < n - 1; i++)
    {
        cin >> a >> b;
        nodes[a].next.push_back(b);
        nodes[b].next.push_back(a);
    }
    cout << n + n - 1 << "\n";
    dfs(1);
    return 0;
}