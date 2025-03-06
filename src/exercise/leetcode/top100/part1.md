# 热门100题part1（1.两数之和 2.两数相加 78.子集 226.翻转二叉树 46.全排列 108.将有序数组转换为二叉搜索树）

## 1.两数之和

使用哈希表，先检查再插入就可以确保不会自己跟自己组了。

```c++
class Solution
{
public:
    struct compare
    {
        bool operator()(pair<int, int> &a, pair<int, int> &b)
        {
            return a.first < b.first;
        }
    };

    vector<int> twoSum(vector<int> &nums, int target)
    {

        unordered_map<int, int> m;

        for (int i = 0; i < nums.size(); i++)
        {
            auto p = m.find(target - nums[i]);

            if (p != m.end())
            {
                return vector<int>({i, (*p).second});
            }
            m.insert(make_pair(nums[i], i));
        }
        return vector<int>();
    }
};
```

## 2.两数相加

运用双指针就行了，很简单的题目

```c++
class Solution
{
public:
    ListNode *addTwoNumbers(ListNode *l1, ListNode *l2)
    {
        int a = 0; // 进位
        ListNode *p1 = l1;
        ListNode *p2 = l2;
        ListNode *head = new ListNode(0);
        ListNode *ans = head;
        while (p1 || p2 || a)
        {
            int v1 = 0, v2 = 0;
            if (p1)
            {
                v1 = p1->val;
                p1 = p1->next;
            }
            if (p2)
            {
                v2 = p2->val;
                p2 = p2->next;
            }
            int m = a + v1 + v2;
            ans->next = new ListNode(m % 10);
            ans = ans->next;
            a = m / 10;
        }
        return head->next;
    }
};
```

## 78.子集

要求出幂集，也就是全组合

使用位运算来模拟每种情况：第i位为1表示取nums[i]，否则不要.

```c++
class Solution
{
public:
    vector<vector<int>> subsets(vector<int> &nums)
    {
        int size = 1 << nums.size();
        vector<vector<int>> ans;

        for (int i = 0; i < size; i++)
        {
            ans.push_back(vector<int>());
            for (int m = i, j = 0; m > 0; m >>= 1, j++)
            {
                if (m & 1)
                {
                    ans[i].push_back(nums[j]);
                }
            }
        }

        return ans;
    }
};
```

## 226.翻转二叉树

递归可解

```c++
class Solution
{
public:
    TreeNode *invertTree(TreeNode *root)
    {
        if (root == nullptr)
        {
            return nullptr;
        }
        auto tmp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(tmp);

        return root;
    }
};
```

## 46.全排列

全排列问题，可以使用`next_permutation`，也可以dfs，这里都尝试一下。

dfs版本(实在有点丑)：

```c++
class Solution
{
public:
    // dfs
    int S[6] = {0};
    vector<vector<int>> ans;
    vector<int> now;
    vector<int> nums;
    int n;
    void permute_dfs(int m)
    {
        if (m == n)
        {
            ans.push_back(now);
            return;
        }
        for (int i = 0; i < n; i++)
        {
            if (S[i] == 0)
            {
                now.push_back(nums[i]);
                S[i] = 1;
                permute_dfs(m + 1);
                now.pop_back();
                S[i] = 0;
            }
        }
    }
    vector<vector<int>> permute(vector<int> &nums)
    {
        n = nums.size();
        this->nums = nums;
        permute_dfs(0);
        return ans;
    }
};
```

超越19%难绷

STL版本:

```c++
class Solution
{
public:
    vector<vector<int>> permute(vector<int> &nums)
    {
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());
        do
        {
            ans.push_back(nums);
        } while (next_permutation(nums.begin(), nums.end()));
        return ans;
    }
};
```

## 108.将有序数组转换为二叉搜索树

递归

```c++
class Solution
{
public:
    TreeNode *sortedArrayToBST(vector<int> &nums)
    {
        return inner(nums, 0, nums.size());
    }
    TreeNode *inner(vector<int> &nums, int st, int ed)
    {
        if (st == ed)
        {
            return nullptr;
        }
        int mid = (st + ed) / 2;
        TreeNode *root = new TreeNode(nums[mid]);
        root->left = inner(nums, st, mid);
        root->right = inner(nums, mid + 1, ed);
        return root;
    }
};
```

