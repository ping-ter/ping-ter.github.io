#include <iostream>
#include <list>

#define debug(x) #x << ": " << x << " "
#define ll long long
#define mod 998244353
using namespace std;

struct node
{
    list<int> child;
    int father;
};
node nodes[500005];

ll travel(int root)
{
    ll num = 1;
    for (int i : nodes[root].child)
    {
        int p = i;
        ll cnt = 1;
        while (nodes[p].child.size() == 1)
        {
            cnt += 1;
            p = nodes[p].child.front();
        }
        num *= cnt;
        num = num % mod;
    }
    num = (num + 1) % mod;
    return num;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);

    nodes[1].father = 0;
    int n;
    cin >> n;
    for (int i = 2; i <= n; i++)
    {
        int f;
        cin >> f;
        nodes[i].father = f;
        nodes[f].child.push_back(i);
    }
    ll num = travel(1);
    cout << num;

    return 0;
}