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

动态规划。用栈进行括号匹配，失配时计算最大匹配长度。

```c++
class Solution
{
public:
    int longestValidParentheses(string s)
    {
        int max_len = 0;
        int now_len = 0;
        int l = 0;
        int n = s.size();
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '(')
            {
                l++;
            }
            else
            {
                if (l > 0)
                {
                    l--;
                    now_len += 2;
                    max_len = max(max_len, now_len);
                }
                else
                {
                    l = 0;
                    now_len = 0;
                }
            }
        }
        return max_len;
    }
};
```

但是这种思路只能过一半样例，原因是有可能匹配的是两侧的括号，中间还有没匹配的括号，比如`()(()`,因此,还需要根据左括号位置来判断。

参考了一位评论区大佬的做法，把失配位置标记成1，然后寻找最大连续0。

大佬的思路[https://leetcode.cn/problems/longest-valid-parentheses/description/comments/331989/]

```c++
class Solution
{
public:
    int longestValidParentheses(string s)
    {
        int max_len = 0;
        int now_len = 0;
        stack<int> sta;
        int n = s.size();
        vector<int> m(n, 0);
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '(')
            {
                sta.push(i);
            }
            else
            {
                if (!sta.empty())
                {
                    sta.pop();
                }
                else
                {
                    m[i] = 1;
                }
            }
        }
        while (!sta.empty())
        {
            int now = sta.top();
            sta.pop();
            m[now] = 1;
        }
        for (int i = 0; i < n; i++)
        {
            if (m[i] == 0)
            {
                now_len++;
            }
            else
            {
                max_len = max(now_len, max_len);
                now_len = 0;
            }
        }
        max_len = max(now_len, max_len);
        return max_len;
    }
};
```

然后看了一下官方的题解，发现官方的做法也相当好。对于之前提到的`()(()`的情况，只要反着遍历一遍就可以了！

可以实现不使用辅助空间：

```c++
class Solution
{
public:
    int longestValidParentheses(string s)
    {
        int max_len = 0;
        int now_len = 0;
        int l = 0;
        int n = s.size();
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '(')
            {
                l++;
            }
            else
            {
                if (l > 0)
                {
                    l--;
                    now_len += 2;
                    if (l == 0)
                    {
                        max_len = max(max_len, now_len);
                    }
                }
                else
                {
                    l = 0;
                    now_len = 0;
                }
            }
        }
        l = 0;
        now_len = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            if (s[i] == ')')
            {
                l++;
            }
            else
            {
                if (l > 0)
                {
                    l--;
                    now_len += 2;
                    if (l == 0)
                    {
                        max_len = max(max_len, now_len);
                    }
                }
                else
                {
                    l = 0;
                    now_len = 0;
                }
            }
        }
        return max_len;
    }
};
```

## 33.搜索旋转排序数组

要求时间复杂度为$O(log n)$
最简单想法：先用$O(log n)$时间找到旋转点，再由这个旋转点正常二分查找。
可以用最右边的值判断是否处于第二段，因为第一段一定大于第二段。为了方便，二分查找时映射下标，可以避免使用辅助空间。

```c++
class Solution
{
    int n;
    inline int trans(int idx, int m)
    {
        return (idx + m) % n;
    }

public:
    int search(vector<int> &nums, int target)
    {
        n = nums.size();
        int m = 0; // 旋转点
        if (nums[0] > nums[n - 1])
        {
            // 需要找旋转点
            int l = 0;
            int r = n - 1;
            while (l <= r)
            {
                int mid = (l + r) / 2;
                if (nums[mid] > nums[n - 1])
                {
                    l = mid + 1;
                }
                else
                {
                    if (nums[mid] < nums[mid - 1])
                    {
                        m = mid;
                        break;
                    }
                    else
                    {
                        r = mid - 1;
                    }
                }
            }
        }
        int l = 0;
        int r = n - 1;
        while (l <= r)
        {
            int mid = (l + r) / 2;
            int idx = trans(mid, m);
            if (nums[idx] == target)
            {
                return idx;
            }
            if (nums[idx] > target)
            {
                r = mid - 1;
            }
            else
            {
                l = mid + 1;
            }
        }
        return -1;
    }
};
```
