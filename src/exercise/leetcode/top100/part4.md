# 热门100题part4（236.二叉树的最近公共祖先 234.回文链表 739.每日温度 221.最大正方形 215.数组中的第K个最大元素）

## 236.二叉树的最近公共祖先

使用后序遍历，自底向上找p和q，第一个找到两个节点的就是最近公共祖先

```c++
class Solution
{
public:
    TreeNode *p, *q;
    TreeNode *ans = nullptr;
    int inner(TreeNode *root)
    {
        if (ans)
        {
            return 2;
        }
        if (root == nullptr)
        {
            return 0;
        }
        int l = inner(root->left);
        int r = inner(root->right);
        int c = l + r;
        if (root == p)
        {
            c++;
        }
        if (root == q)
        {
            c++;
        }
        if (c == 2 && ans == nullptr)
        {
            ans = root;
        }
        return c;
    }
    TreeNode *lowestCommonAncestor(TreeNode *root, TreeNode *p, TreeNode *q)
    {
        this->p = p;
        this->q = q;
        inner(root);
        return ans;
    }
};
```

## 234.回文链表

进阶要求用$O(n)$时间复杂度和$O(1)$空间复杂度

如果是数组，可以首尾两个指针对比，而单链表不能随机访问，可以通过回溯达到类似的效果，但是这样需要使用栈空间，不能达到$O(1)$

```c++
class Solution
{
public:
    bool isPalindrome(ListNode *head)
    {
        stack<int> sta;
        auto p = head;
        int cnt = 0;
        while (p)
        {
            sta.push(p->val);
            p = p->next;
            cnt++;
        }
        p = head;
        for (int i = 0; i < cnt / 2; i++)
        {
            if (p->val != sta.top())
            {
                return false;
            }
            p = p->next;
            sta.pop();
        }
        return true;
    }
};
```

提交结果：

```
93/93 cases passed (12 ms)
Your runtime beats 22.04 % of cpp submissions
Your memory usage beats 38.95 % of cpp submissions (124.4 MB)
耗时 0:24:22
```

解法比较差

要想不使用辅助空间，就得修改原来的链表结构，反转一半的链表结构。
可以使用快慢指针来找到中间位置，确定要反转的范围。

```c++
class Solution
{
public:
    bool isPalindrome(ListNode *head)
    {
        ListNode *pre = nullptr, *h = head, *next, *fast = head;

        while (h && fast)
        {
            fast = fast->next;

            next = h->next;
            h->next = pre;
            pre = h;
            h = next;

            if (fast)
            {
                fast = fast->next;
            }
            else
            {
                pre = pre->next;
            }
        }
        while (pre != nullptr)
        {
            if (pre->val != h->val)
            {
                return false;
            }
            pre = pre->next;
            h = h->next;
        }
        return true;
    }
};
```

成功AC，70%时间，97%空间

## 739.每日温度

初读题目，本题没限制辅助空间，这么说可以使用单调栈，维持一个递减的队列，遇到即将入队的元素大于队首的情况就出队维持队列的递减性质，这时可以确定将要出队的元素的答案。

```c++
class Solution
{
public:
    vector<int> dailyTemperatures(vector<int> &temperatures)
    {
        stack<pair<int, int>> sta;
        int n = temperatures.size();
        vector<int> ans(n, 0);

        for (int i = 0; i < n; i++)
        {
            while (!sta.empty() && sta.top().first < temperatures[i])
            {
                int j = sta.top().second;
                sta.pop();
                ans[j] = i - j;
            }
            sta.push(make_pair(temperatures[i], i));
        }
        while (!sta.empty())
        {
            int j = sta.top().second;
            sta.pop();
            ans[j] = 0;
        }
        return ans;
    }
};
```

但是没想到这居然不然最好的解法：

```
Your runtime beats 9.02 % of cpp submissions
Your memory usage beats 4.99 % of cpp submissions (109.4 MB)
```

然后自己实现了一个栈就好多了
```c++
class Solution
{
public:
    vector<int> dailyTemperatures(vector<int> &temperatures)
    {
        pair<int, int> sta[100000];
        int top = -1;
        int n = temperatures.size();
        vector<int> ans(n, 0);

        for (int i = 0; i < n; i++)
        {
            while (top >= 0 && sta[top].first < temperatures[i])
            {
                int j = sta[top].second;
                top--;
                ans[j] = i - j;
            }
            top++;
            sta[top] = make_pair(temperatures[i], i);
        }
        while (top >= 0)
        {
            int j = sta[top].second;
            top--;
            ans[j] = 0;
        }
        return ans;
    }
};
```

```
Accepted
48/48 cases passed (1 ms)
Your runtime beats 99.86 % of cpp submissions
Your memory usage beats 80.79 % of cpp submissions (101.3 MB)
```

## 221.最大正方形

## 215.数组中的第K个最大元素

要求$O(n)$时间，也就是不能排序，因为排序至少$O(nlog(n))$，同样的，也不能使用优先队列$O(nlog(k))$,这里也有所争议，因为大根堆$O(n+klogn)$，小根堆$O(k+nlogk)$，如果k和n数量级相差很大可以使用小根堆。

这是个经典的Top-K问题，典型解法是使用快排中的分划操作(partition)，快速选择算法最坏的复杂度为$O(n)$，但是有相关证明，随机化快速选择算法的期望时间复杂度为$O(n)$

复习下三路分划：将数据划分成小于v，等于v，大于v，分别置于左中右

[史上最清晰的三路快速排序，你 Get 到了吗？](https://zhuanlan.zhihu.com/p/357002752)

AC代码

```c++
class Solution
{
public:
    int partition(vector<int> &nums, int k, int l, int r)
    {
        if (r == l)
        {
            return nums[l];
        }
        // 随机选择
        int pivot = rand() % (r - l + 1) + l;
        swap(nums[l], nums[pivot]);
        int lt = l;
        int gt = r + 1;
        int i = l + 1;
        int v = nums[lt];
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
                swap(nums[gt], nums[i]);
            }
            else
            {
                i++;
            }
        }
        if (k <= r - gt + 1)
        {
            return partition(nums, k, gt, r);
        }
        if (k <= r - lt + 1)
        {
            return v;
        }
        else
        {
            return partition(nums, k - (r - lt + 1), l, lt - 1);
        }
    }
    int findKthLargest(vector<int> &nums, int k)
    {
        srand(0);
        return partition(nums, k, 0, nums.size() - 1);
    }
};
```