# 热门100题part17（11.盛最多水的容器 621.任务调度器 581.最短无序连续子数组 64.最小路径和 32.最长有效括号 33.搜索旋转排序数组）

## 11.盛最多水的容器

可以想到，线越靠外越好，并且越高越好，他们分别组成矩形的长和宽，因此，可以用两个指针从两边向内部遍历，而且向内移动指针时，比当前线短的可以跳过，因为他不可能更长。由于宽取决于最短的线，所以每次移动最短线的指针，指针相遇时，结束。

```c++
class Solution
{
public:
    int maxArea(vector<int> &height)
    {
        int n = height.size();
        int max_s = 0;
        int pre = 0;
        int i = 0;
        int j = n - 1;
        int *a = &i;
        int sep = 1;
        while (i < j)
        {
            if (height[*a] <= pre)
            {
                *a += sep;
                continue;
            }
            if (height[i] < height[j])
            {
                a = &i;
                sep = 1;
                pre = height[i];
            }
            else
            {
                a = &j;
                sep = -1;
                pre = height[j];
            }
            max_s = max(max_s, height[*a] * (j - i));
            *a += sep;
        }
        return max_s;
    }
};
```

## 621.任务调度器

先贪心，尽量各个任务交替，发现并不能AC

## 581.最短无序连续子数组

可以维护前缀最大值和后缀最小值，确保选定的区间排序后不会出现逆序。

```c++
class Solution
{
public:
    int findUnsortedSubarray(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> suffix(n + 1);
        vector<int> prefix(n + 1);
        int m = -0x3f3f3f3f;
        for (int i = 0; i < n; i++)
        {
            m = max(m, nums[i]);
            prefix[i] = m;
        }
        m = 0x3f3f3f3f;
        for (int i = n - 1; i >= 0; i--)
        {
            m = min(m, nums[i]);
            suffix[i] = m;
        }
        int l = 0, r = n;
        while (l < r && nums[l] <= suffix[l])
        {
            l++;
        }
        while (l < r && nums[r - 1] >= prefix[r - 1])
        {
            r--;
        }
        cout << l << "," << r;
        return r - l;
    }
};
```

## 64.最小路径和

可以建有向图来求，但是也可以简化一些，因为每次只能向下或者向右移动一步，所以可以DP，没必要用图最短路。

```c++
class Solution
{
public:
    int minPathSum(vector<vector<int>> &grid)
    {

        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n));
        dp[0][0] = grid[0][0];
        for (int i = 1; i < m; i++)
        {
            dp[i][0] = grid[i][0] + dp[i - 1][0];
        }
        for (int j = 1; j < n; j++)
        {
            dp[0][j] = grid[0][j] + dp[0][j - 1];
        }
        for (int i = 1; i < m; i++)
        {
            for (int j = 1; j < n; j++)
            {
                dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m - 1][n - 1];
    }
};
```

## 32.最长有效括号

动态规划。

## 33.搜索旋转排序数组


