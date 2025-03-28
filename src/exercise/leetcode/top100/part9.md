# 热门100题part9（416.分割等和子集 406.根据身高重建队列 339.除法求值 394.字符串解码 347.前K个高频元素 338.比特位计数）

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
考虑这题能不能动态规划
前面提到，**这题就是在找和为S/2的子集**，因此可以转化成求目标和的动态规划问题，这题不需要记录次数，只要真假即可。
```c++
class Solution
{
    bool dp[20050];

public:
    bool canPartition(vector<int> &nums)
    {
        int n = nums.size();
        int sum = 0;
        for (const int &i : nums)
        {
            sum += i;
        }
        if (sum % 2 == 1)
        {
            return false;
        }
        int target = sum / 2;
        fill(dp, dp + target, false);
        dp[0] = true;
        for (int i = 0; i < n; i++)
        {
            for (int j = target; j >= nums[i]; j--)
            {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
        return dp[target];
    }
};
```

成功AC，注意必须倒着遍历j，否则会出现重复利用（参考01背包）

## 406. 根据身高重建队列

没想出思路，甚至看完tag都不会。

排在最前面的元素$k_i$一定为0，因为前面没有其他人，同时，他应该是k=0里最矮的，否则后面的元素就违背k=0了；k越大的元素应该越靠后。此外，k不受比自己身高矮的人的影响，也就是说可以先排高的，矮的按k值插队。
people = [[7,0],[4,4],[5,0],[6,1],[5,2],[7,1]]
[5,0],[7,0],[5,2],[6,1],[4,4],[7,1],

```c++
class Solution
{
    struct node
    {
        node *next;
        vector<int> *p;
    };

public:
    vector<vector<int>> reconstructQueue(vector<vector<int>> &people)
    {
        sort(people.begin(), people.end(),
             [](const vector<int> &a, const vector<int> &b)
             {
                 if (a[0] != b[0])
                 {
                     return a[0] > b[0];
                 }
                 return a[1] < b[1];
             });
        node *head = new node({nullptr, nullptr});
        for (vector<int> &now : people)
        {
            node *p = head;
            int cnt = 0;
            while (p->next != nullptr && cnt < now[1])
            {
                p = p->next;
                if ((*(p->p))[0] >= now[0])
                {
                    cnt++;
                }
            }
            auto nownode = new node({p->next, &now});
            p->next = nownode;
        }
        vector<vector<int>> ans;
        node *p = head;
        while (p->next != nullptr)
        {
            p = p->next;
            ans.push_back(*(p->p));
        }

        return ans;
    }
};
```

## 399. 除法求值

给了除法结果其实就是给了一个倍数关系，可以互相表示，这样一来很容易想到使用并查集，相同集合内的可以互相表示，全都用根部来表示。

但是合并操作有很多问题，如果都查找a，b的父结点，那没办法再衡量ab的倍数了，不过可以：
$
a=v_1*f_a \\
b=v_2*f_b \\
a=v'*b \\
f_a=((v'*v_2)/v_1)f_b
$

这样就得到了他们父指针之间的关系，就可以合并了。

然后是查找操作，我们希望能查找到父节点，以及跟父节点的倍数关系；同时，为了能够求出比值，查找同一集合不同元素应该返回相同的父节点，否则无法比较。因此查找必须进行路径压缩，并且压缩时更新倍数关系。

```c++
class Solution
{
    struct fptr
    {
        string father;
        double value;
    };

    unordered_map<string, fptr> m;
    fptr find(const string &x)
    {
        auto p = m.find(x);
        if (p == m.end())
        {
            return {"", -1.0};
        }
        if (p->second.father == x)
        {
            return {x, 1.0};
        }
        auto fx = find(p->second.father);
        p->second.value = p->second.value * fx.value;
        p->second.father = fx.father;
        return p->second;
    };
    void union_set(const string &a, const string &b, double value)
    {
        auto fa = find(a);
        auto fb = find(b);
        if (fa.father == fb.father)
        {
            return;
        }
        // fa.father = fb.father;
        // fb.value = value * fb.value / fa.value;
        // fa,fb都是临时返回值，这样不会有任何修改
        m[fa.father].father = fb.father;
        m[fa.father].value = value * fb.value / fa.value;
    };
    inline void insert(const string &x)
    {
        m.insert(make_pair(x, fptr({x, 1.0})));
    }

public:
    vector<double> calcEquation(vector<vector<string>> &equations, vector<double> &values, vector<vector<string>> &queries)
    {
        vector<double> ans;
        int n = equations.size();
        for (int i = 0; i < n; i++)
        {
            insert(equations[i][0]);
            insert(equations[i][1]);
            union_set(equations[i][0], equations[i][1], values[i]);
        }
        for (auto &i : queries)
        {
            auto a = find(i[0]);
            auto b = find(i[1]);
            // cout << a.father << " " << a.value << " " << b.father << " " << b.value << "\n";
            if (a.father != b.father || a.value <= 0 || b.value <= 0)
            {
                ans.push_back(-1.0);
            }
            else
            {
                ans.push_back(a.value / b.value);
            }
        }
        return ans;
    }
};
```

成功AC

## 394.字符串解码

这题主要的问题就是处理好嵌套的括号，先处理最里面，再向外处理。可以DFS，遇到数字则深入解析.

```c++
class Solution
{
    inline string getNStr(int n, const string &str)
    {
        string a;
        for (int i = 0; i < n; i++)
        {
            a += str;
        }
        return a;
    }
    inline int getK(const string &s, int &idx)
    {
        int p = 1;
        int sum = 0;
        while (idx >= 0 && s[idx] <= '9' && s[idx] >= '0')
        {
            sum += (s[idx] - '0') * p;
            p *= 10;
            idx--;
        }
        return sum;
    }
    string dfs(const string &s, int idx, int &ed)
    {
        int i = idx;
        while (i < n && s[i] != '[' && s[i] != ']')
        {
            i++;
        }
        if (i >= n || s[i] == ']')
        {
            ed = i;
            return s.substr(idx, i - idx);
        }
        int end = i;
        string mid = dfs(s, i + 1, end);
        i--;
        int k = getK(s, i);
        return s.substr(idx, i - idx + 1) + getNStr(k, mid) + dfs(s, end + 1, ed);
    }
    int n;

public:
    string decodeString(string s)
    {
        n = s.size();
        int e = 0;
        return dfs(s, 0, e);
    }
};
```

写代码费了不少劲，不过AC了

## 347.前K个高频元素

没限制空间复杂度，可以用哈希表。哈希表存完频次再topk

```c++
class Solution
{
    unordered_map<int, int> m;
    vector<int> ans;
    void partition(int l, int r, int k)
    {
        if (r - l + 1 <= k)
        {
            return;
        }
        int pivot = rand() % (r - l + 1) + l;
        swap(ans[pivot], ans[l]);
        int mid = m[ans[l]];
        int i = l;
        int lt = l;
        int gt = r + 1;
        while (i < gt)
        {
            if (m[ans[i]] < mid)
            {
                swap(ans[i], ans[lt]);
                lt++;
                i++;
            }
            else if (m[ans[i]] > mid)
            {
                gt--;
                swap(ans[i], ans[gt]);
            }
            else
            {
                i++;
            }
        }
        int gt_k = r - gt + 1;
        if (gt_k > k)
        {
            partition(gt, r, k);
            return;
        }
        else if (gt_k == k)
        {
            return;
        }
        k -= gt_k;
        int mid_k = gt - lt;
        if (mid_k >= k)
        {
            return;
        }
        partition(l, lt - 1, k - mid_k);
    }

public:
    vector<int> topKFrequent(vector<int> &nums, int k)
    {
        for (const int &i : nums)
        {
            if (m.find(i) == m.end())
            {
                m.insert(make_pair(i, 1));
                ans.push_back(i);
            }
            else
            {
                m[i]++;
            }
        }
        partition(0, ans.size() - 1, k);
        return vector<int>(ans.begin() + (ans.size() - k), ans.end());
    }
};
```

## 338.比特位计数

可以递推

```bash
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

只有一位时，有0,1两种；有两位时，实际上首位固定为1，另一位则是前面的0,1；三位时，首位为1，剩下两位时前面的情况总和。按照这个思路递推数量就可以了。

```c++
class Solution
{
public:
    vector<int> countBits(int n)
    {
        vector<int> ans;
        ans.push_back(0);
        if (n == 0)
        {
            return ans;
        }
        ans.push_back(1);
        if (n == 1)
        {
            return ans;
        }
        int b = 2;
        int nb = 4;
        for (int i = 2; i <= n; i++)
        {
            if (i >= nb)
            {
                b = nb;
                nb <<= 1;
            }
            ans.push_back(1 + ans[i - b]);
        }
        return ans;
    }
};
```