#include <iostream>
#include <vector>
#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

class Solution
{
public:
    int shoppingOffers(vector<int> &price, vector<vector<int>> &special, vector<int> &needs)
    {
        cout << special.size();
        // for (auto i : special)
        // {
        //     for (auto j : i)
        //     {
        //         cout << j;
        //     }
        // }
    }
};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    auto s = Solution();
    vector<int> price = {2, 3, 4};
    vector<vector<int>> special({vector<int>({1, 1, 0, 4}), vector<int>({2, 2, 1, 9})});
    cout << special.size() << "\n";
    vector<int> needs = {1, 2, 1};
    int result = s.shoppingOffers(price, special, needs);
    cout << result;
    return 0;
}