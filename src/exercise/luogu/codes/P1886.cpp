#include <iostream>
#include <deque>

#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

struct MonotoneQueue
{
    deque<int> que;
    bool (*func)(int, int);
    int maxlen;
    MonotoneQueue(int maxlen, bool (*func)(int, int)) : maxlen(maxlen), func(func) {}

    void insert(int data)
    {
        while (!que.empty() && data - que.front() >= maxlen) // 这里使用了que.front,所以必须判断是否为空
        {
            que.pop_front();
            // cout << "执行";
        }
        while (!que.empty() && func(data, que.back()))
        {
            que.pop_back();
        }
        que.push_back(data);
        // cout << debug(que.size()) << debug((que.size() > maxlen)) << endl;

        // cout << debug(que.size()) << debug((que.size() > maxlen)) << endl;
    }
    inline int getHead()
    {
        return que.front();
    }

    inline int getTail()
    {
        return que.back();
    }
};

int mins[1000020];
int maxs[1000020];
ll nums[1000020];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int n, k;
    cin >> n >> k;

    MonotoneQueue minque(k, [](int a, int b)
                         { return nums[a] < nums[b]; });
    MonotoneQueue maxque(k, [](int a, int b)
                         { return nums[a] > nums[b]; });

    for (int i = 1; i <= n; i++)
    {
        cin >> nums[i];
        minque.insert(i);
        maxque.insert(i);
        if (i >= k)
        {
            mins[i - k] = nums[minque.getHead()];
            maxs[i - k] = nums[maxque.getHead()];
        }
    }

    for (int i = 0; i <= n - k; i++)
    {
        cout << mins[i] << " ";
    }
    cout << "\n";
    for (int i = 0; i <= n - k; i++)
    {
        cout << maxs[i] << " ";
    }

    return 0;
}
