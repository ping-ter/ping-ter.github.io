# 热门100题part15（53.最大子数组和 62.不同路径 4.寻找两个正序数组的中位数 79.单词搜索 98.验证二叉搜索树 55.跳跃游戏 56.合并区间）

## 53.最大子数组和

线性DP

```c++
class Solution
{
public:
    int maxSubArray(vector<int> &nums)
    {
        int max_sum = nums[0];
        int pre_sum = nums[0];
        int n = nums.size();
        for (int i = 1; i < n; i++)
        {
            pre_sum = nums[i] + max(pre_sum, 0);
            max_sum = max(max_sum, pre_sum);
        }
        return max_sum;
    }
};
```

## 62.不同路径

组合数学，由于每次只能向下或者向右移动一步，所以必定要向下`m - 1`步，只要确定向下走的位置就确定路线了，即`C(n, m - 1) + n`，问题的关键是组合数的算法。

[ACWing大佬提供的动态规划思路](https://www.acwing.com/blog/content/50579/)

依据：
$$
C_n^m = C_n^{n - m} \\
C_n^m = C_n^{m - 1} + C_{n - 1}^{m - 1}
$$
第一个式子可以简化要计算的组合数，第二个可以动态规划递推,计算从$C_{m - 1}^{m - 1}$ 到$C_{n}^{m - 1}$

## 4.寻找两个正序数组的中位数

题目要求算法的时间复杂度应该为 $O(log(m+n))$，也就是跟一个数组中二分查找的复杂度相同，同时这个是有序数组，考虑二分解决。

## 79.单词搜索

先试试DFS

```c++
class Solution
{
    int S[6][6] = {0};
    int now = 0;
    bool ans = false;
    int m;
    int n;
    string *word;
    vector<vector<char>> *board;
    inline bool check(int i, int j)
    {
        return i >= 0 && i < m && j >= 0 && j < n;
    }
    void dfs(int i, int j)
    {
        if ((*word)[now] != (*board)[i][j])
        {
            return;
        }
        now++;
        if (now == word->size())
        {
            ans = true;
            return;
        }
        S[i][j] = 1;
        if (!ans && check(i - 1, j) && !S[i - 1][j])
        {
            dfs(i - 1, j);
        }
        if (!ans && check(i + 1, j) && !S[i + 1][j])
        {
            dfs(i + 1, j);
        }
        if (!ans && check(i, j - 1) && !S[i][j - 1])
        {
            dfs(i, j - 1);
        }
        if (!ans && check(i, j + 1) && !S[i][j + 1])
        {
            dfs(i, j + 1);
        }
        S[i][j] = 0;
        now--;
    }

public:
    bool exist(vector<vector<char>> &board, string word)
    {
        this->word = &word;
        this->board = &board;
        m = board.size();
        n = board[0].size();
        for (int i = 0; i < m && !ans; i++)
        {
            for (int j = 0; j < n && !ans; j++)
            {
                dfs(i, j);
            }
        }
        return ans;
    }
};
```

成功通过了，应该还有很多剪枝技巧，以及动态规划方法的完成方式。

## 98.验证二叉搜索树

正常先根遍历即可

```c++
class Solution
{
    bool order(TreeNode *root, long max_v, long min_v)
    {
        if (root == nullptr)
        {
            return true;
        }
        if (root->val <= max_v && root->val >= min_v)
        {
            return order(root->left, long(root->val) - 1, min_v) && order(root->right, max_v, long(root->val) + 1);
        }
        return false;
    }

public:
    bool isValidBST(TreeNode *root)
    {
        return order(root, 2147483647, -2147483648);
    }
};
```

由于数据范围问题，需要转化成long

## 55.跳跃游戏

BFS即可，后面的必须通过前面的才能到达。

```c++
class Solution
{
public:
    bool canJump(vector<int> &nums)
    {
        int n = nums.size();
        vector<bool> visited(n, false);
        queue<int> q;
        q.push(0);
        visited[0] = true;
        while (!q.empty())
        {
            int idx = q.front();
            q.pop();
            if (idx + nums[idx] >= n - 1)
            {
                return true;
            }
            for (int i = idx + 1; i <= idx + nums[idx]; i++)
            {
                if (!visited[i])
                {
                    visited[i] = true;
                    q.push(i);
                }
            }
        }
        return false;
    }
};
```

也可以不使用队列，因为只能往前跳，所以记录一个最远可达位置即可。

```c++
class Solution
{
public:
    bool canJump(vector<int> &nums)
    {
        int n = nums.size();
        int far = 0;
        for (int i = 0; i <= far; i++)
        {
            far = max(far, i + nums[i]);
            if (far >= n - 1)
            {
                return true;
            }
        }
        return false;
    }
};
```

## 56.合并区间

使用红黑树来维护区间，每次插入时寻找可能合并的位置，利用红黑树可以区间查找的特性。

```c++
class Solution
{
    map<int, int> m;
    void insert(int l, int r)
    {
        auto lt = m.lower_bound(l);
        if (lt != m.begin())
        {
            lt--;
        }
        auto rt = m.upper_bound(r);
        // cout << distance(lt, rt);
        for (auto it = lt; it != m.end() && distance(it, rt) > 0;)
        {
            if (l <= it->second && r >= it->first)
            {
                l = min(l, it->first);
                r = max(r, it->second);
                it = m.erase(it);
            }
            else
            {
                it++;
            }
        }
        m.insert(make_pair(l, r));
    }

public:
    vector<vector<int>> merge(vector<vector<int>> &intervals)
    {
        for (auto &p : intervals)
        {
            insert(p[0], p[1]);
        }
        vector<vector<int>> ans;
        for (auto &p : m)
        {
            ans.push_back({p.first, p.second});
        }
        return ans;
    }
};
```

查看题解之后发现排序就可以解决了，能合并的区间排序后一定是连续的。

```c++
class Solution
{
public:
    vector<vector<int>> merge(vector<vector<int>> &intervals)
    {
        sort(intervals.begin(), intervals.end(),
             [](const vector<int> &a, const vector<int> &b)
             {
                 if (a[0] == b[0])
                 {
                     return a[1] < b[1];
                 }
                 return a[0] < b[0];
             });
        int l = intervals[0][0], r = intervals[0][1];
        vector<vector<int>> ans;
        int n = intervals.size();
        for (int i = 1; i < n; i++)
        {
            if (l <= intervals[i][1] && r >= intervals[i][0])
            {
                l = min(l, intervals[i][0]);
                r = max(r, intervals[i][1]);
            }
            else
            {
                ans.push_back({l, r});
                l = intervals[i][0];
                r = intervals[i][1];
            }
        }
        if (ans.empty() || r > ans.back()[0])
        {
            ans.push_back({l, r});
        }
        return ans;
    }
};
```

维护好当前区间即可。

