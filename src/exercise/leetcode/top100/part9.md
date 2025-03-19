# 热门100题part9（416. 分割等和子集 406. 根据身高重建队列）

## 416. 分割等和子集

看上去很难想的一道题。先慢慢找思路：

首先，如果和为奇数，那么一定没法分，沿着这个思路突然想到只需要判断能不能分而不需要给出方案，先尝试能不能转化成等价的问题。
另一方面，总和为S的话，这题就是在找和为S/2的子集，可以DFS，并且只有正数，也很方便剪枝，数据规模也相当小。

```c++
class Solution
{
    vector<int> suffix;
    int n;
    int ans = false;
    int sum;
    int now = 0;
    vector<int> *nums_ptr;
    void dfs(int idx)
    {
        if (ans || idx == n || now + suffix[idx] < sum)
        {
            return;
        }
        now += (*nums_ptr)[idx];
        if (now == sum)
        {
            ans = true;
            return;
        }
        dfs(idx + 1);
        now -= (*nums_ptr)[idx];
        dfs(idx + 1);
    }

public:
    bool canPartition(vector<int> &nums)
    {
        n = nums.size();
        nums_ptr = &nums;
        suffix = vector<int>(n + 1, 0);
        for (int i = n - 1; i >= 0; i--)
        {
            suffix[i] += suffix[i + 1] + nums[i];
        }
        if (suffix[0] % 2 == 1)
        {
            return false;
        }
        sum = suffix[0] / 2;
        dfs(0);
        return ans;
    }
};
```

先试了个DFS，超时了，$2^{100}$确实量级挺大的，而且遇到了无法剪枝的用例，

## 406. 根据身高重建队列

