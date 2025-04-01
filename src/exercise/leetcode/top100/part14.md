# 热门100题part14（23.合并K个升序链表 101.对称二叉树 617.合并二叉树 75.颜色分类 102.二叉树的层序遍历 3.无重复字符的最长子串）

## 23.合并K个升序链表

先考虑分治，两两归并.

```c++
class Solution
{
    ListNode *merge(ListNode *h1, ListNode *h2)
    {
        ListNode *p1 = h1;
        ListNode *p2 = h2;
        ListNode *head = new ListNode;
        ListNode *p = head;
        while (p1 && p2)
        {
            if (p1->val > p2->val)
            {
                p->next = p2;
                p2 = p2->next;
                p = p->next;
            }
            else
            {
                p->next = p1;
                p1 = p1->next;
                p = p->next;
            }
        }
        while (p1)
        {
            p->next = p1;
            p1 = p1->next;
            p = p->next;
        }
        while (p2)
        {
            p->next = p2;
            p2 = p2->next;
            p = p->next;
        }
        p = head->next;
        delete head;
        return p;
    }

public:
    ListNode *mergeKLists(vector<ListNode *> &lists)
    {
        if (lists.empty())
        {
            return nullptr;
        }
        queue<ListNode *> q;
        for (auto &i : lists)
        {
            q.push(i);
        }
        while (q.size() > 1)
        {
            auto p1 = q.front();
            q.pop();
            auto p2 = q.front();
            q.pop();
            q.push(merge(p1, p2));
        }
        return q.front();
    }
};
```

成功AC

## 101.对称二叉树

层序遍历，变成回文数组判断问题

```c++
class Solution
{
public:
    bool isSymmetric(TreeNode *root)
    {
        int now = 0;
        int next = 1;
        deque<TreeNode *> dq[2];
        dq[0].push_front(root->left);
        dq[0].push_back(root->right);
        while (!dq[now].empty())
        {
            while (!dq[now].empty())
            {
                auto l = dq[now].front();
                auto r = dq[now].back();
                dq[now].pop_back();
                dq[now].pop_front();
                if (!l && !r)
                {
                    continue;
                }
                if (l && r && l->val == r->val)
                {
                    dq[next].push_front(l->right);
                    dq[next].push_front(l->left);
                    dq[next].push_back(r->left);
                    dq[next].push_back(r->right);
                }
                else
                {
                    return false;
                }
            }
            now = next;
            next = 1 - next;
        }
        return true;
    }
};
```

执行时间超过100%，只是空间利用率有些问题。

## 617.合并二叉树

按照规则递归即可。

```c++
class Solution
{
public:
    TreeNode *mergeTrees(TreeNode *root1, TreeNode *root2)
    {
        if (!root1 && !root2)
        {
            return nullptr;
        }
        auto nownode = new TreeNode;
        if (root1 && root2)
        {
            nownode->val = root1->val + root2->val;
            nownode->left = mergeTrees(root1->left, root2->left);
            nownode->right = mergeTrees(root1->right, root2->right);
        }
        else if (root1)
        {
            nownode->val = root1->val;
            nownode->left = root1->left;
            nownode->right = root1->right;
        }
        else
        {
            nownode->val = root2->val;
            nownode->left = root2->left;
            nownode->right = root2->right;
        }
        return nownode;
    }
};
```

## 75.颜色分类

Parition模板题

```c++
class Solution
{
public:
    void sortColors(vector<int> &nums)
    {
        int i = 0;
        int lt = 0;
        int gt = nums.size();
        while (i < gt)
        {
            if (nums[i] == 0)
            {
                swap(nums[lt], nums[i]);
                lt++;
                i++;
            }
            else if (nums[i] == 1)
            {
                i++;
            }
            else if (nums[i] == 2)
            {
                gt--;
                swap(nums[i], nums[gt]);
            }
        }
    }
};
```

## 102.二叉树的层序遍历

两个队列交替即可

```c++
class Solution
{
public:
    vector<vector<int>> levelOrder(TreeNode *root)
    {
        vector<vector<int>> ans;
        if (root == nullptr)
        {
            return ans;
        }
        int now = 0;
        int next = 1;
        int r = 0;
        queue<TreeNode *> q[2];
        q[now].push(root);
        while (!q[now].empty())
        {
            ans.push_back(vector<int>());
            while (!q[now].empty())
            {
                auto nownode = q[now].front();
                q[now].pop();
                ans[r].push_back(nownode->val);
                if (nownode->left)
                {
                    q[next].push(nownode->left);
                }
                if (nownode->right)
                {
                    q[next].push(nownode->right);
                }
            }
            r++;
            now = next;
            next = 1 - next;
        }
        return ans;
    }
};
```

## 3.无重复字符的最长子串

线性DP，当前最长取决于之前最长，并且不含当前字母的一段，这个检测过程可以用哈希表优化。
有个要注意的地方是检测到重复字符时，需要将字符从哈希表移除，但是这样需要循环，不如直接判断下标是否在有效范围内`m[s[i]] < i - pre_len`

```c++
class Solution
{
public:
    int lengthOfLongestSubstring(string s)
    {
        unordered_map<char, int> m;
        int max_len = 0;
        int pre_len = 0;
        int n = s.size();
        for (int i = 0; i < n; i++)
        {
            if (m.find(s[i]) == m.end())
            {
                m.insert(make_pair(s[i], i));
                pre_len++;
            }
            else if (m[s[i]] < i - pre_len)
            {
                m[s[i]] = i;
                pre_len++;
            }
            else
            {
                int front = m[s[i]];
                m[s[i]] = i;
                pre_len = i - front;
            }
            if (pre_len > max_len)
            {
                max_len = pre_len;
            }
        }
        return max_len;
    }
};
```
