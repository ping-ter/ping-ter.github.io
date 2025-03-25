# 热门100题part8（494.目标和 461.汉明距离 448.找到所有数组中消失的数字 438.找到字符串中所有字母异位词 437. 路径总和 III）

## 494.目标和

先考虑一下动态规划的办法，如果`dp[i][j]`表示对于前i个数字，组成j的表达式数目。
那么对于第i个数字，让和为j的方法有两种：$(j-i)+i$和$(j+i)-i$，所以有：
$$\begin{equation*}
dp[i][j] = dp[i-1][j-i]+dp[i-1][j+i]
\end{equation*}$$

而$0 <= nums[i] <= 1000$，所以最大的数字范围是1000*1000.

如果使用DFS，那么空间会降到$O(n)$的水平，可以利用后缀和来剪枝。

接下来先试试DFS表现怎么样

```c++
class Solution
{
    vector<int> suffix;
    vector<int> *numsptr;
    int cnt = 0;
    int now = 0;
    int target;
    int n;
    void dfs(int idx)
    {
        if (idx >= n)
        {
            if (now == target)
            {
                cnt++;
            }
            return;
        }
        if (now + suffix[idx] >= target)
        {
            now += (*numsptr)[idx];
            dfs(idx + 1);
            now -= (*numsptr)[idx];
        }
        if (now - suffix[idx] <= target)
        {
            now -= (*numsptr)[idx];
            dfs(idx + 1);
            now += (*numsptr)[idx];
        }
    }

public:
    int findTargetSumWays(vector<int> &nums, int target)
    {
        n = nums.size();
        numsptr = &nums;
        this->target = target;
        suffix = vector<int>(n + 2);
        suffix[n] = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            suffix[i] = suffix[i + 1] + nums[i];
        }
        dfs(0);
        return cnt;
    }
};
```

没想到居然过了

```c++
Your runtime beats 4.99 % of cpp submissions
```

就是时间比较难看
尝试动态规划解决

```c++
class Solution
{
    int dp[24][2048] = {0};
    inline int trans(int x)
    {
        return x + 1024;
    }

public:
    int findTargetSumWays(vector<int> &nums, int target)
    {
        int n = nums.size();
        int sum = 0;
        for (const int &i : nums)
        {
            sum += i;
        }
        if (sum < abs(target))
        {
            return 0;
        }
        dp[0][trans(0)] = 1;
        for (int i = 0; i < n; i++)
        {
            for (int j = -sum; j <= sum; j++)
            {
                if (abs(j - nums[i]) <= sum)
                {
                    dp[i + 1][trans(j)] += dp[i][trans(j - nums[i])];
                }
                if (abs(j + nums[i]) <= sum)
                {
                    dp[i + 1][trans(j)] += dp[i][trans(j + nums[i])];
                }
            }
        }
        cout << dp[n][trans(target)];
        return dp[n][trans(target)];
    }
};
```

稍微要注意一下边界检查，因为绝对值大于sum部分的计算是没有任何意义的。

## 461.汉明距离

奖励关，位运算秒了

```c++
class Solution
{
public:
    int hammingDistance(int x, int y)
    {
        int r = x ^ y;
        int ans = 0;
        while (r != 0)
        {
            ans += r & 1;
            r >>= 1;
        }
        return ans;
    }
};
```

官解中提到可以用内置方法计算1的数量

```c++
class Solution {
public:
    int hammingDistance(int x, int y) {
        return __builtin_popcount(x ^ y);
    }
};
```

还有一种Brian Kernighan 算法，可以只遍历1，不过复杂度相同。

## 448. 找到所有数组中消失的数字

感觉难度设置有点问题，不使用额外空间且时间复杂度为$O(n)$的情况还是有点难想的。


先把所有数字放在ans里，然后把出现的标记为0，再进入最后处理阶段，把0从数组中移除，但是这实际上空间还是$O(n)$

```c++
class Solution
{
public:
    vector<int> findDisappearedNumbers(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> ans(n);
        for (int i = 1; i <= n; i++)
        {
            ans[i - 1] = i;
        }
        for (int &i : nums)
        {
            ans[i - 1] = 0;
        }
        int space = 0;
        for (int i = 0; i < n; i++)
        {
            if (ans[i] != 0)
            {
                swap(ans[space], ans[i]);
                space++;
            }
        }
        ans.resize(space);
        return ans;
    }
};
```

## 438.找到字符串中所有字母异位词

阅读示例发现所谓的异位词就是字符一样，位置不同。异位词长度是固定的，跟模式串一样，因此可以采用滑动窗口，复杂度是遍历一遍串，每次对多比较26个字母的数量，可以用位运算加速一下，用一个二进制串表示字符集，先匹配一遍字符集，可以避免很多不必要的操作。

```c++
class Solution
{
public:
    vector<int> findAnagrams(string s, string p)
    {
        vector<int> m(26, 0);
        vector<int> sm(26, 0);
        auto check = [&]()
        {
            for (int i = 0; i < 26; i++)
            {
                if (m[i] != sm[i])
                {
                    return false;
                }
            }
            return true;
        };
        vector<int> ans;
        int cset = 0;
        int scset = 0;
        int pn = p.size();
        int n = s.size();
        if (n < pn)
        {
            return ans;
        }
        for (char c : p)
        {
            int idx = c - 'a';
            cset |= 1 << idx;
            m[idx]++;
        }

        int st = 0, ed = pn - 1;
        for (int i = 0; i < pn - 1; i++)
        {
            int idx = s[i] - 'a';
            scset |= 1 << idx;
            sm[idx]++;
        }

        while (ed < n)
        {
            sm[s[ed] - 'a']++;
            if (check())
            {
                ans.push_back(st);
            }
            sm[s[st] - 'a']--;
            st++;
            ed++;
        }

        return ans;
    }
};
```

这段代码成功AC了，还没使用位运算优化，因为数量级相同，开启的只需要每次判断下sm是不是减到0了即可。

## 437. 路径总和 III

这题跟`494.目标和`有点像，但是要难得多，如果直接搜索复杂度会很高。
路径必须向下，不会跨越两颗子树，可以先根遍历，同时由于中间不会有空的节点，所以其实是在前缀和中找能相等的目标和。关键是怎么存找前缀和，哈希表的话，由于是前缀和的头部在变动，需要频繁删除和插入，先用链表试试.

结果发现简单的回溯就能过：

```c++
class Solution
{
#define ll long long
    int cnt = 0;
    list<ll> now;
    ll target;
    void order(TreeNode *root)
    {
        if (root == nullptr)
        {
            return;
        }
        for (ll &i : now)
        {
            i += root->val;
            if (i == target)
            {
                cnt++;
            }
        }
        now.push_back(root->val);
        if (root->val == target)
        {
            cnt++;
        }
        order(root->left);
        order(root->right);
        now.pop_back();
        for (ll &i : now)
        {
            i -= root->val;
        }
    }

public:
    int pathSum(TreeNode *root, int targetSum)
    {
        target = targetSum;
        order(root);
        return cnt;
    }
};
```

值得注意的是，这题中间结果会超int范围，需要开ll的链表