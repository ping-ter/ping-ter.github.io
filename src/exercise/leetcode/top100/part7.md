# 热门100题part7（139.单词拆分 647.回文子串 128.最长连续序列 124.二叉树中的最大路径和 322.零钱兑换）

本期强度过大，没有能一次AC的题，甚至看完连思路都没有

## 139.单词拆分

看上去像是多模式匹配，但有所区别的是不同模式间不能重叠
跟多模式匹配有一个显著的区别，那就是必须从头匹配，所以不必构造fail指针，也不需要AC自动机，只要构造一个字典树一起匹配各个模式即可。

```c++
class Solution
{

    inline static int trans(const char a)
    {
        return a - 'a';
    }
    struct TrieTree
    {
        struct node
        {
            string *word;
            node *next[26];
            node() : word(nullptr)
            {
                fill(next, next + 26, nullptr);
            }
        };
        node *root;

        TrieTree()
        {
            root = new node();
        }
        void insert(const string &word)
        {
            node *p = root;
            for (const char &i : word)
            {
                int idx = trans(i);
                if (p->next[idx] == nullptr)
                {
                    p->next[idx] = new node;
                }
                p = p->next[idx];
            }
            p->word = new string(word);
        }
    };
    TrieTree *trie;
    int n;
    bool dfs(const string &s, int st)
    {
        if (st == n)
        {
            return true;
        }
        auto p = trie->root;
        int result = false;
        for (int i = st; i < n && !result; i++)
        {
            if (p->next[trans(s[i])])
            {
                p = p->next[trans(s[i])];
                if (p->word)
                {
                    result = result | dfs(s, i + 1);
                }
            }
            else
            {
                result = false;
                break;
            }
        }
        return result;
    }

public:
    bool wordBreak(string s, vector<string> &wordDict)
    {
        trie = new TrieTree;
        n = s.size();
        for (auto &i : wordDict)
        {
            trie->insert(i);
        }
        return dfs(s, 0);
    }
};
```

然后就超时了，卡在一大长串a上，想想怎么剪枝。
一方面可以加一个哈希表，如果遇到字符集不同的可以直接判false；但是更本质的问题是词典的词有包含关系，`aaa`以及更长的`aaa...`都可以用`a`来表示,因此更长的aaa都是不必存在的。可以插入串时检查，如果能用其他字符串表示，就不插入到字典树，检查方法实际上就是之前的dfs。
然后就被下一个测试用例卡住了。看来要尝试别的思路。
还有一个可以剪枝的地方就是，如果确定某个长度能表示，那么不用关心他是怎么表示出来的，因为单词使用次数没限制。所以如果确定某个st不可以，那么再遇到相同st就没必要再dfs了，可以用一个数组来记录。
修改之后在上个用例还是会超时
还有一个可以节省时间的点就是，我们确定了(i,j)可以组成单词之后，后面回溯再进入别的分支后又重新计算了(i,j)

## 647.回文子串

初见没想出来，过了几天发现应该是动态规划：

1. 单独的字符是回文子串
2. 连续的两个字符是回文子串
3. 如果s是回文子串，那么`c+x+c`(c是字符)也是回文子串

长度为n的回文子串是依赖于长度为n-2的回文子串的，所以可以使用动态规划。

```c++
class Solution
{
public:
    int countSubstrings(string s)
    {
        int n = s.size();
        int cnt = n;
        int now = 0;
        int next = 1;

        for (int j = 2; j < 4; j += 1)
        {
            queue<int> q[2];
            // j01分别是奇数和偶数
            for (int i = 0; i < n; i++)
            {
                q[now].push(i);
            }
            for (int i = j; i <= n; i += 2)
            {
                while (!q[now].empty())
                {
                    // i = 0是两个连续字符
                    int idx = q[now].front();
                    q[now].pop();
                    int l = idx - 1;
                    int r = idx - 2 + i;
                    if (l >= 0 && r < n && s[l] == s[r])
                    {
                        cnt++;
                        // cout << s.substr(l, i) << " " << i << " " << j << endl;
                        q[next].push(idx - 1);
                    }
                }
                now = next;
                next = 1 - next;
            }
        }

        return cnt;
    }
};
```

需要注意的就是奇数偶数要分开

## 128.最长连续序列

初见也是不会，偷看了一眼发现可以并查集。当遍历到a时，如果a-1在并查集中，就把a-1和a合并。数字范围比较大，不好开数组，得用哈希表实现。

```c++
unordered_map<int, int> m;
```

~~为了能充分利用空间，我们把key>=0的情况作为父指针，key<0的情况计为这颗子树的节点数量，这样就不用使用pair也不用再开一个哈希表了。~~

然后突然发现看错了，数字是可以为负的，只能再开一片空间。

```c++
class Solution
{
    struct node
    {
        node *father;
        int size;
    };
    unordered_map<int, node *> m;

    int max_len = 1;
    void insert(int x)
    {
        auto nownode = new node;
        nownode->father = nullptr;
        nownode->size = 1;
        m.insert(make_pair(x, nownode));
    }
    node *find(node *xn)
    {
        if (xn == nullptr)
        {
            return nullptr;
        }
        if (xn->father == nullptr)
        {
            return xn;
        }
        xn->father = find(xn->father);
        return xn->father;
    }
    node *find_from_map(int x)
    {
        auto xn = m.find(x);
        if (xn == m.end())
        {
            return nullptr;
        }
        return find(xn->second);
    }

    void union_set(int x, int y)
    {
        node *fx = find_from_map(x);
        node *fy = find_from_map(y);
        if (!fx || !fy || fx == fy)
        {
            return;
        }
        fx->size = fx->size + fy->size;
        fy->father = fx;
        max_len = max(fx->size, max_len);
    }

public:
    int longestConsecutive(vector<int> &nums)
    {
        if (nums.size() == 0)
        {
            return nums.size();
        }
        for (auto &i : nums)
        {
            insert(i);
            union_set(i, i - 1);
            union_set(i, i + 1);
        }
        return max_len;
    }
};
```

```
Accepted
81/81 cases passed (203 ms)
Your runtime beats 11.87 % of cpp submissions
Your memory usage beats 5.04 % of cpp submissions (115.2 MB)
耗时 3:26:40
```

然后看了一下大佬的题解，可以不设置father指针，直接设置邻接长度就可以。
[基于并查集求解](https://leetcode.cn/problems/longest-consecutive-sequence/solutions/3057394/ji-yu-bing-cha-ji-qiu-jie-by-13cnso1shx-jhkt)

感觉这个比官解还巧妙，仿照着写了一个：

```c++
class Solution
{
    unordered_map<int, int> m; // key为数字，value为最大连续长度
    int max_len = 1;
    inline int getlen(int x)
    {
        auto p = m.find(x);
        if (p != m.end())
        {
            return p->second;
        }
        return 0;
    }

public:
    int longestConsecutive(vector<int> &nums)
    {
        if (nums.size() == 0)
        {
            return 0;
        }
        for (int &i : nums)
        {
            if (m.find(i) != m.end())
            {
                continue;
            }
            // 我们假设i是中间值，那么他要把两边连接起来
            int l = getlen(i - 1);
            int r = getlen(i + 1);
            int nowlen = l + r + 1;
            m.insert(make_pair(i, nowlen));
            max_len = max(nowlen, max_len);

            // 然后是最巧妙的地方：由于已经形成了连续的一段，所以只需要更新边界处的节点就可以，不需要循环更新，这个效率要比路径压缩高得多
            m[i - l] = nowlen;
            m[i + r] = nowlen;
        }
        return max_len;
    }
};
```

下次看看官解

## 124.二叉树中的最大路径和

（总算有个直接有思路的了）
这题要找最大的路径和，而路径是可以跨越左右子树的，不是从上到下的一条路径。不过问题也不大，可以后根遍历，左右子树分别找最大值，

更新最大值时是根+左右子树的最大值，向上传播只能选择最多一颗子树

```c++
class Solution
{
    int max_len;
    int inner(TreeNode *root)
    {
        if (root == nullptr)
        {
            return 0;
        }
        int l = inner(root->left);
        int r = inner(root->right);
        int m = max({l, r, 0}) + root->val;
        max_len = max({l + r + root->val, max_len, m});
        return m;
    }

public:
    int maxPathSum(TreeNode *root)
    {
        max_len = -0x3f3f3f3f;
        inner(root);
        return max_len;
    }
};
```

## 322.零钱兑换

强度比之前的题目低不少，很标准的完全背包问题，直接DP。

```c++
class Solution
{
    int dp[10004];

public:
    int coinChange(vector<int> &coins, int amount)
    {
        // vector<int> dp(amount + 3, 0x3f3f3f3f);
        fill(dp, dp + amount + 1, 0x3f3f3f3f);
        dp[0] = 0;
        for (int &coin : coins)
        {
            for (int j = 0; j <= amount; j++)
            {
                for (int k = 1; k * coin <= j; k++)
                {
                    dp[j] = min(dp[j], dp[j - k * coin] + k);
                }
            }
        }
        if (dp[amount] == 0x3f3f3f3f)
        {
            return -1;
        }
        return dp[amount];
    }
};
```

不过因为是完全背包，可以改成两层循环

```c++
class Solution
{
    int dp[10004];

public:
    int coinChange(vector<int> &coins, int amount)
    {
        // vector<int> dp(amount + 3, 0x3f3f3f3f);
        fill(dp, dp + amount + 1, 0x3f3f3f3f);
        dp[0] = 0;
        for (int &coin : coins)
        {
            for (int j = coin; j <= amount; j++)
            {

                dp[j] = min(dp[j], dp[j - coin] + 1);
            }
        }
        if (dp[amount] == 0x3f3f3f3f)
        {
            return -1;
        }
        return dp[amount];
    }
};
```