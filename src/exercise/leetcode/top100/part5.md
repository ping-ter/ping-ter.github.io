# 热门100题part5（208.实现 Trie (前缀树) 207.课程表 200.岛屿数量 198.打家劫舍 169.多数元素）

## 208.实现 Trie (前缀树)

前缀树，也叫字典树，方便按前缀查询，算是一种典型的空间换时间的数据结构。先尝试实现个简单的能不能过

```c++
class Trie
{
    struct node
    {
        node *next[26];
        string *word;
        node() : word(nullptr)
        {
            fill(next, next + 26, nullptr);
        }
    };
    inline int getIndex(char c)
    {
        return c - 'a';
    }
    node *head;

public:
    Trie()
    {
        head = new node;
    }

    void insert(string word)
    {
        node *p = head;
        for (char &c : word)
        {
            int i = getIndex(c);
            if (!p->next[i])
            {
                p->next[i] = new node;
            }
            p = p->next[i];
        }
        p->word = new string(word);
    }

    bool search(string word)
    {
        node *p = head;
        for (char &c : word)
        {
            int i = getIndex(c);
            if (!p->next[i])
            {
                return false;
            }
            p = p->next[i];
        }
        if (p->word)
        {
            return true;
        }
        return false;
    }

    bool startsWith(string prefix)
    {
        node *p = head;
        for (char &c : prefix)
        {
            int i = getIndex(c);
            if (!p->next[i])
            {
                return false;
            }
            p = p->next[i];
        }
        return true;
    }
};
```

成功AC，这个字典树不需要查询前缀对应的所有word，因此不需要再节点存词，可以用一个布尔值代替，时间空间应该会更优。

## 207.课程表

课程的先后关系可以建立有向图，那么这个问题可以转化成拓扑排序。

```c++
class Solution
{
    struct node
    {
        list<int> next;
    };

public:
    bool canFinish(int numCourses, vector<vector<int>> &prerequisites)
    {
        vector<int> indegree(numCourses, 0);
        vector<node> nodes(numCourses);
        int geted = 0;
        for (vector<int> edge : prerequisites)
        {
            indegree[edge[0]]++;
            nodes[edge[1]].next.push_back(edge[0]);
        }
        queue<int> que;
        for (int i = 0; i < numCourses; i++)
        {
            if (indegree[i] == 0)
            {
                que.push(i);
                geted++;
            }
        }
        while (!que.empty())
        {
            int nownode = que.front();
            que.pop();
            for (int i : nodes[nownode].next)
            {
                indegree[i]--;
                if (indegree[i] == 0)
                {
                    que.push(i);
                    geted++;
                }
            }
        }
        return geted == numCourses;
    }
};
```

只击败了30%。本题只需要判断能否拓扑排序，但是不需要排出序列，所以拓扑排序可能浪费了些时间。不过查看官方题解思路跟我的类似。

## 200.岛屿数量

求图的连通分量，使用BFS即可，复杂度应该为$O(mn)$

```c++
class Solution
{
public:
    int numIslands(vector<vector<char>> &grid)
    {
        int m = grid.size();
        int n = grid[0].size();
        vector<int> S(m * n, 0);
        queue<pair<int, int>> que;
        int cnt = 0;
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (S[i * n + j] == 0)
                {
                    if (grid[i][j] == '0')
                    {
                        S[i * n + j] = 1;
                        continue;
                    }
                    que.push(make_pair(i, j));
                    cnt++;
                    while (!que.empty())
                    {
                        int p = que.front().first;
                        int q = que.front().second;
                        que.pop();
                        // int idx = p * n + q;
                        if (p < 0 || q < 0 || p >= m || q >= n || S[p * n + q])
                        {
                            continue;
                        }
                        S[p * n + q] = 1;
                        if (grid[p][q] == '0')
                        {
                            continue;
                        }
                        que.push(make_pair(p + 1, q));
                        que.push(make_pair(p - 1, q));
                        que.push(make_pair(p, q + 1));
                        que.push(make_pair(p, q - 1));
                    }
                }
            }
        }
        return cnt;
    }
};
```

```
Your runtime beats 12.64 % of cpp submissions
Your memory usage beats 18.31 % of cpp submissions (21.4 MB)
```

又是很差的提交。

这题还可以使用并查集，这样空间一共需要$O(mn)$，不需要使用队列，需要维护一个并查集，时间就是把所有点过一遍，也是$O(mn)$

```c++
class Solution
{
    vector<int> fa;
    vector<int> rank;
    int find(int x)
    {
        if (fa[x] == -1)
        {
            return x;
        }
        int f = find(fa[x]);
        fa[x] = f;
        return f;
    }
    void union_set(int x, int y)
    {
        int fx = find(x);
        int fy = find(y);
        if (rank[fx] > rank[fy])
        {
            fa[fy] = fx;
        }
        else
        {
            fa[fx] = fy;
            if (rank[fx] == rank[fy])
            {
                rank[fy]++;
            }
        }
    }

public:
    int numIslands(vector<vector<char>> &grid)
    {
        int m = grid.size();
        int n = grid[0].size();
        rank = vector<int>(m * n, 0);
        fa = vector<int>(m * n, -1);
        int cnt = m * n;
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] == '0')
                {
                    cnt--;
                    continue;
                }
                int x = i * n + j;
                int y = (i - 1) * n + j;
                if (i > 0 && grid[i - 1][j] == '1' && find(x) != find(y))
                {
                    cnt--;
                    union_set(x, y);
                }
                y = i * n + j - 1;
                if (j > 0 && grid[i][j - 1] == '1' && find(x) != find(y))
                {
                    cnt--;
                    union_set(x, y);
                }
            }
        }
        return cnt;
    }
};
```

这次成功超过88%，AC

查看了一下题解，大体思路基本相同。

## 198.打家劫舍

一眼动态规划，如果打劫i，那么最大能得到nums[i]加上i-2之前的最大值，不拿可以获得i-1之前的最大值

```c++
class Solution
{
    int dp[128];

public:
    int rob(vector<int> &nums)
    {
        dp[0] = 0;
        dp[1] = nums[0];
        int n = nums.size();
        for (int i = 2; i <= n; i++)
        {
            dp[i] = max(dp[i - 2] + nums[i - 1], dp[i - 1]);
        }
        return dp[n];
    }
};
```

其实空间可以优化一下，实际上只用到了`i - 1`和`i - 2`，根本不需要使用数组来储存。

## 169.多数元素


进阶要求是尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题，但是没要求不能修改数组，因此可以使用分划来解决。使用三路分划，由于出现次数大于n/2，所以一定出现在三路中较大的部分。随机选择有一半的概率直接选出来。

```c++
class Solution
{
    int n_2;
    int partition(vector<int> &nums, int l, int r)
    {
        while (l < r)
        {
            int pivot = rand() % (r - l + 1) + l;
            swap(nums[pivot], nums[l]);
            int v = nums[l];
            int gt = r + 1;
            int lt = l;
            int i = l + 1;
            while (i < gt)
            {
                if (nums[i] < v)
                {
                    swap(nums[i], nums[lt]);
                    lt++;
                    i++;
                }
                else if (nums[i] > v)
                {
                    gt--;
                    swap(nums[i], nums[gt]);
                }
                else
                {
                    i++;
                }
            }

            if (r - i + 1 > n_2)
            {
                return partition(nums, i, r);
            }
            if (i - lt > n_2)
            {
                return nums[lt];
            }
            r = lt - 1;
        }
        return nums[l];
    }

public:
    int majorityElement(vector<int> &nums)
    {
        n_2 = nums.size() / 2;
        return partition(nums, 0, nums.size() - 1);
    }
};
```