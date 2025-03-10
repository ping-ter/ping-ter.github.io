#include <iostream>

#define debug(x) #x << ": " << x << " "
#define ll long long
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n, m;
    cin >> n >> m;
    int cnt = 1;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cout << cnt << " ";
            cnt++;
        }
        
        cout << "\n";
    }

    return 0;
}