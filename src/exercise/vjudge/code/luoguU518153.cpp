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