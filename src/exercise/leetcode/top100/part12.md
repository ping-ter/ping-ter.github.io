# 热门100题part12（39.组合总和543.二叉树的直径 279.完全平方数 239.滑动窗口最大值 49.字母异位词分组 240.搜索二维矩阵II）

## 39.组合总和

动态规划目标和，但是要给出方案。这题的难点也就是怎么输出方案，如果在dp过程中保存完整方案，需要大量内存。但是其实只保存状态转移时的数字即可，然后再向上一个回溯，就能得到完整方案。
调式过程中遇到了重复输出的问题，例如[2,3,5]，8出现了3,5和5,3的输出，解决方案是排序，然后通过大小顺序去重，确保只要递增序列。
排序的时间消耗在这当中可以忽略不记。

```c++
class Solution
{
    list<int> nums[64];
    vector<vector<int>> ans;
    vector<int> now;
    void dfs(int sum, int m)
    {
        if (sum == 0)
        {
            ans.push_back(now);
            return;
        }
        for (const int &i : nums[sum])
        {
            if (i > m)
            {
                return;
            }
            now.push_back(i);
            dfs(sum - i, i);
            now.pop_back();
        }
    }

public:
    vector<vector<int>> combinationSum(vector<int> &candidates, int target)
    {
        nums[0].push_back(0);
        sort(candidates.begin(), candidates.end());
        int n = candidates.size();
        for (int i = 0; i < n; i++)
        {
            for (int j = candidates[i]; j <= target; j++)
            {
                int base = j - candidates[i];
                if (!nums[base].empty())
                {
                    nums[j].push_back(candidates[i]);
                }
            }
        }

        // 回溯，寻找方案
        dfs(target, 0x3f3f3f3f);
        return ans;
    }
};
```

## 543.二叉树的直径

之前的题目`124.二叉树中的最大路径和`的简化版(应该先做这个的)

```c++
class Solution
{
    int max_len = 0;
    int inner(TreeNode *root)
    {
        if (root == nullptr)
        {
            return 0;
        }
        int l = inner(root->left);
        int r = inner(root->right);
        max_len = max(max_len, l + r);
        return max(l, r) + 1;
    }

public:
    int diameterOfBinaryTree(TreeNode *root)
    {
        inner(root);
        return max_len;
    }
};
```

## 279.完全平方数

目标和动态规划

```c++
class Solution
{
    int dp[10024];

public:
    int numSquares(int n)
    {
        fill(dp, dp + 10024, 0x3f3f3f3f);
        dp[0] = 0;
        for (int i = 1; i * i <= n; i++)
        {
            int num = i * i;
            for (int j = num; j <= n; j++)
            {
                dp[j] = min(dp[j], dp[j - num] + 1);
            }
        }
        return dp[n];
    }
};
```

## 239.滑动窗口最大值

维护单调队列即可

```c++
class Solution
{
    struct MonoQueue
    {
        deque<pair<int, int>> q;
        int size;
        MonoQueue(int size) : size(size) {}
        void push(int x, int idx)
        {
            while (!q.empty() && q.back().first <= x)
            {
                q.pop_back();
            }
            while (!q.empty() && idx - q.front().second >= size)
            {
                q.pop_front();
            }
            q.push_back(make_pair(x, idx));
        }
        int getfront()
        {
            return q.front().first;
        }
    };

public:
    vector<int> maxSlidingWindow(vector<int> &nums, int k)
    {
        MonoQueue q(k);
        int n = nums.size();
        vector<int> ans;
        for (int i = 0; i < n; i++)
        {
            q.push(nums[i], i);
            if (i >= k - 1)
            {
                ans.push_back(q.getfront());
            }
        }
        return ans;
    }
};
```

## 49.字母异位词分组

与`438.找到字符串中所有字母异位词`类似，映射一下即可。

```c++
class Solution
{
public:
    vector<vector<string>> groupAnagrams(vector<string> &strs)
    {
        unordered_map<string, int> m;
        vector<vector<string>> ans;
        for (auto &str : strs)
        {
            int chr[26] = {0};
            string key;
            for (auto &c : str)
            {
                chr[c - 'a']++;
            }
            for (int i = 0; i < 26; i++)
            {
                if (chr[i])
                {
                    key.append(chr[i], i + 'a');
                }
            }
            if (m.find(key) == m.end())
            {
                m.insert(make_pair(key, ans.size()));
                ans.push_back(vector<string>());
            }
            ans[m[key]].push_back(str);
        }
        return ans;
    }
};
```

先转化成key，再按照key找分组

## 240.搜索二维矩阵II

二分查找，二维版。从矩阵中心开始比较，每次缩小成几个矩阵的范围。

```c++
class Solution
{
    int target;
    bool ans = false;
    bool searchInner(vector<vector<int>> &matrix, int x1, int y1, int x2, int y2)
    {
        if (ans)
        {
            return true;
        }
        if (x1 > x2 || y1 > y2)
        {
            return false;
        }
        int x_mid = (x1 + x2) / 2;
        int y_mid = (y1 + y2) / 2;
        if (matrix[x_mid][y_mid] == target)
        {
            ans = true;
            return true;
        }
        else if (matrix[x_mid][y_mid] > target)
        {
            return searchInner(matrix, x1, y1, x_mid - 1, y2) | searchInner(matrix, x_mid, y1, x2, y_mid - 1);
        }
        else
        {
            return searchInner(matrix, x1, y_mid + 1, x_mid, y2) | searchInner(matrix, x_mid + 1, y1, x2, y2);
        }
    }

public:
    bool searchMatrix(vector<vector<int>> &matrix, int target)
    {
        this->target = target;
        return searchInner(matrix, 0, 0, matrix.size() - 1, matrix[0].size() - 1);
    }
};
```

每次可以减少1/4的搜索空间。
另一种思路（来自评论区）：可以把矩阵看成二叉搜索树。