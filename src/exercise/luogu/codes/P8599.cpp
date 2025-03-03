#include <iostream>
#include <algorithm>
#include <vector>
#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

ll getnum(vector<ll> &nums, int s, int e)
{
    int num = 0;
    int base = 1;
    for (int j = e - 1; j >= s; j--)
    {
        // cout << debug(j);
        num += base * nums[j];
        base *= 10;
    }
    return num;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    ll N;
    cin >> N;

    int bits = 0;
    int tmp = N;
    while (tmp > 0)
    {
        bits++;
        tmp /= 10;
    }
    // cout << bits;
    int cnt = 0;
    vector<ll> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9};

    // cout << getnum(nums, 0, 3);

    do
    {
        int a, b, c;
        for (int i = 1; i <= bits; i++)
        {
            a = getnum(nums, 0, i);

            for (int j = i + (9 - i) / 2; j < 9; j++)
            {
                b = getnum(nums, i, j);
                c = getnum(nums, j, 9);
                // cout << debug(a) << debug(b) << debug(c) << endl;
                if (b % c == 0 && (b / c) + a == N)
                {
                    cnt++;
                }
            }
            
        }
        // return 0;
    } while (next_permutation(nums.begin(), nums.end()));

    cout << cnt;
    return 0;
}
