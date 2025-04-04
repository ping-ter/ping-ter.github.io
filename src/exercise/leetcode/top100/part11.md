# 热门100题part11（300.最长递增子序列 287.寻找重复数 297.二叉树的序列化与反序列化 283.移动零 42.接雨水）

## 300.最长递增子序列

进阶要求时间复杂度降低到$O(nlogn)$

对于每个数字，他能参与的最长递增子序列就是前面所有序列中，小于他的数字的最长序列。但是如果挨个遍历来找，需要$O(n^2)$时间。如果对已经遍历完的排序，能加快查找速度，但是排序过程会是$O(n^2)$（因为是在线排序）。可以引入一种淘汰机制，长度为m时，如果一个a结尾，一个b结尾，并且a<b，那么a可以支配b，因为能让b延长的一定可以让a延长，反之则不行，也就是遍历到一个位置时，各长度应该是唯一的

```c++
class Solution
{
    struct node
    {
        int tail;
        int length;
    };
public:
    int lengthOfLIS(vector<int> &nums)
    {
        map<int, int> m_l;
        map<int, int> m_t;
        m_l.insert(make_pair(0, -0x3f3f3f3f));
        m_t.insert(make_pair(-0x3f3f3f3f, 0));
        int n = nums.size();
        for (int i = 0; i < n; i++)
        {
            // 找到小于nums[i]的最大值
            auto p = *(--m_t.lower_bound(nums[i]));
            int nowlen = p.second + 1;
            auto it_gt = m_l.lower_bound(nowlen);
            if (it_gt != m_l.end())
            {
                if (it_gt->second <= nums[i])
                {
                    continue;
                }
                if (it_gt->first == nowlen)
                {
                    m_t.erase(it_gt->second);
                    m_l.erase(nowlen);
                }
            }

            m_l.insert(make_pair(p.second + 1, nums[i]));
            m_t.insert(make_pair(nums[i], p.second + 1));

            for (auto it = m_l.begin(); it != m_l.end() && it->first < nowlen; it++)
            {
                if (it->second >= nums[i])
                {
                    m_t.erase(it->second);
                    it = m_l.erase(it);
                }
            }
        }
        return m_l.rbegin()->first;
    }
};
```

代码用到了两个红黑树，删除和插入操作复杂度为$O(logn)$，整体复杂度为$O(nlogn)$

## 287.寻找重复数

要求线性时间，常量空间。
这题有点和一道题`136.只出现一次的数字`有些类似。可以


## 297.二叉树的序列化与反序列化

似乎没限制最小空间，用一个极大值表示空节点，然后先根遍历建树即可。为了方便读数字，可以使用字符串作为输入流。

```c++
class Codec
{
    void serialize_inner(ostringstream &s, TreeNode *root)
    {
        if (root == nullptr)
        {
            s << 0x3f3f3f3f << ' ';
            return;
        }
        s << root->val << ' ';
        serialize_inner(s, root->left);
        serialize_inner(s, root->right);
    }
    TreeNode *deserialize_inner(istringstream &s)
    {
        int n;
        s >> n;
        if (n == 0x3f3f3f3f)
        {
            return nullptr;
        }
        auto node = new TreeNode(n);
        node->left = deserialize_inner(s);
        node->right = deserialize_inner(s);
        return node;
    }

public:
    // Encodes a tree to a single string.
    string serialize(TreeNode *root)
    {
        ostringstream s;
        serialize_inner(s, root);
        return s.str();
    }

    // Decodes your encoded data to tree.
    TreeNode *deserialize(string data)
    {
        istringstream s(data);
        return deserialize_inner(s);
    }
};
```

## 283.移动零

不使用辅助空间，尽量少操作。
可以使用双指针，一个遍历，另一个标记当前空位置.

```c++
class Solution
{
public:
    void moveZeroes(vector<int> &nums)
    {
        int p = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++)
        {
            if (nums[i] != 0)
            {
                swap(nums[i], nums[p]);
                p++;
            }
        }
    }
};
```

之前好像使用过这种方法，但是找不到哪题了

## 42.接雨水

观察可以发现，能接的一块雨水大小取决于两边的柱子高度，可以维护一个当前最高柱子，以及一个栈，用来找之前的柱子高度；最高柱子更新时，计算能接的雨水单位数量。

```c++
class Solution
{
public:
    int trap(vector<int> &height)
    {
        stack<int> s;
        int max_h = 0;
        int sum = 0;
        for (const int &i : height)
        {
            if (i <= max_h)
            {
                s.push(i);
                continue;
            }
            while (!s.empty())
            {
                int now = s.top();
                if (now > i)
                {
                    break;
                }
                s.pop();
                sum += max_h - now;
            }
            max_h = i;
        }
        // 处理剩下的
        max_h = 0;
        while (!s.empty())
        {
            int now = s.top();
            s.pop();
            if (now > max_h)
            {
                max_h = now;
                continue;
            }
            sum += max_h - now;
        }
        return sum;
    }
};
```
