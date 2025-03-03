#include <iostream>

#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

ll nums[102400];
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n = 0;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> nums[i];
    }
    int cnt = 0;
    int cnt_single = 0;
    int add_pre = 0;
    int add = -1;
    for (int i = 0; i < n / 2; i++)
    {

        int d = nums[i] - nums[n - i - 1];
        
        cnt += cnt_single;
        if (d == 0)
        {
            // cout << debug(cnt_single) << debug(cnt) << endl;
            cnt_single = 0;
            continue;
        }
        add_pre = add;
        add = (d < 0);
        
        d = abs(d);

        
        if (add == add_pre)
        {
            if (d <= cnt_single)
            {
                cnt_single = 0;
            }
            else
            {
                cnt_single = d - cnt_single;
            }
        }
        else
        {
            cnt_single = d;
        }
        // cout << debug(d)<< debug(cnt_single) << debug(cnt) << endl;
    }
    cout << cnt + cnt_single;

    return 0;
}
// 8 1 5 4 1 3 1 1 3 
