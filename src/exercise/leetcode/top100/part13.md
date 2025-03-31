# 热门100题part13（34.在排序数组中查找元素的第一个和最后一个位置 31.下一个排列 560.和为K的子数组 19.删除链表的倒数第N个结点 17.电话号码的字母组合 5.最长回文子串）

## 34.在排序数组中查找元素的第一个和最后一个位置

要求必须设计并实现时间复杂度为$O(log n)$的算法解决此问题

二分查找的复杂度就是$O(log n)$，分别查找`target`和`target+1`就可以了

```c++
class Solution
{
public:
    vector<int> searchRange(vector<int> &nums, int target)
    {
        auto l = lower_bound(nums.begin(), nums.end(), target);
        if (l == nums.end() || *l != target)
        {
            return vector({-1, -1});
        }
        auto r = upper_bound(nums.begin(), nums.end(), target);
        int st = distance(nums.begin(), l);
        int ed = distance(nums.begin(), r);
        return vector<int>({st, ed - 1});
    }
};
```

## 31. 下一个排列

实现STL里的`next_permutation`，之前的`46.全排列`使用了DFS得到全排列，这次要找下一个排列（下一个字典序更大的排列）。
要使字典序增大，但是增大幅度最小，那就尽量影响较少的元素，

## 560.和为K的子数组

目标和动态规划。但是看了一眼数据范围有可能扛不住，先试一下.
根本过不了编译。
那就只能想办法回溯了.
突然注意到：子数组是数组中元素的连续非空序列，所以不是子集和问题，而是滑动窗口。使用前缀和即可。

```c++
class Solution
{
    int sums[20004];
public:
    int subarraySum(vector<int> &nums, int k)
    {
        int n = nums.size();
        sums[0] = 0;
        for (int i = 1; i <= n; i++)
        {
            sums[i] = nums[i - 1] + sums[i - 1];
        }
        int cnt = 0;
        for (int i = 1; i <= n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (sums[i] - sums[j] == k)
                {
                    cnt++;
                }
            }
        }
        return cnt;
    }
};
```

从时间看（超过10%），应该还是又很大优化空间的
判断条件`sums[i] - sums[j] == k`相当于`sums[j] == sums[i] - k`

## 19.删除链表的倒数第N个结点

双指针，一个快指针提前走N步，然后慢指针出发一起走，快指针到头的时候慢指针到达要删除的位置。

```c++
class Solution
{
public:
    ListNode *removeNthFromEnd(ListNode *head, int n)
    {
        auto fast = head;
        auto slow = head;
        auto pre = head;
        for (int i = 0; i < n; i++)
        {
            fast = fast->next;
        }
        while (fast)
        {
            fast = fast->next;
            pre = slow;
            slow = slow->next;
        }
        if (slow == head)
        {
            return slow->next;
        }
        pre->next = slow->next;
        delete slow;
        return head;
    }
};
```

## 17.电话号码的字母组合

DFS即可。

```c++
class Solution
{
    string *digits;
    vector<string> m = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> ans;
    string now;
    void dfs(int i)
    {
        if (i == digits->size())
        {
            ans.push_back(now);
            return;
        }
        for (auto c : m[(*digits)[i] - '2'])
        {
            now += c;
            dfs(i + 1);
            now.pop_back();
        }
    }

public:
    vector<string> letterCombinations(string digits)
    {
        if (digits.empty())
        {
            return ans;
        }
        this->digits = &digits;
        dfs(0);
        return ans;
    }
};
```

## 5.最长回文子串

有点类似`647.回文子串`，思路也类似，递推即可。

```c++
class Solution
{
public:
    string longestPalindrome(string s)
    {
        queue<pair<int, int>> q;
        q.push(make_pair(0, 0));
        int n = s.size();
        int ml = 0, mr = 0;
        for (int i = 1; i < n; i++)
        {
            q.push(make_pair(i, i));
            if (s[i] == s[i - 1])
            {
                ml = i - 1;
                mr = i;
                q.push(make_pair(i - 1, i));
            }
        }

        while (!q.empty())
        {
            auto now = q.front();
            q.pop();
            int l = now.first - 1;
            int r = now.second + 1;
            if (l >= 0 && r < n && s[l] == s[r])
            {
                q.push(make_pair(l, r));
                if (r - l > mr - ml)
                {
                    mr = r;
                    ml = l;
                }
            }
        }
        return s.substr(ml, mr - ml + 1);
    }
};
```