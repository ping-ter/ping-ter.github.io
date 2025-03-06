# 热门100题（1.两数之和 2.两数相加 78.子集 226.翻转二叉树）

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