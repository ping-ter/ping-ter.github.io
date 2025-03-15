---
date: 2025-03-14
---
# 热门100题part6（）

## 155.最小栈

本题只要求了常数时间内检索到最小元素，但是没限制辅助空间等，应该还是简单的。
首先想到的是可以在内部维护一个单调队列/单调栈：一个元素如果有可能成为最小值，要么没有比他更小的，要么更小的被pop掉，如果有更小且更先入栈的元素，显然无法成为最小值。因此维护一个自下往上递减单调栈可以解决这个问题。

```c++
class MinStack
{
    stack<int> sta;
    stack<int> mont_sta;

public:
    MinStack()
    {
    }

    void push(int val)
    {
        sta.push(val);
        if (mont_sta.empty() || mont_sta.top() >= val)
        {
            mont_sta.push(val);
        }
    }

    void pop()
    {
        if (!mont_sta.empty() && mont_sta.top() == sta.top())
        {
            mont_sta.pop();
        }
        sta.pop();
    }

    int top()
    {
        return sta.top();
    }

    int getMin()
    {
        return mont_sta.top();
    }
};
```

成功AC

## 152.乘积最大子数组

动态规划，同时维护最大值和最小值，正负通吃。对于第i个元素，可以选择是否加入i-1，还是开始一个新的子数组。

```c++
class Solution
{
public:
    int maxProduct(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> maxdp(n + 1, 1);
        vector<int> mindp(n + 1, 1);

        for (int i = 1; i <= n; i++)
        {
            int nownum = nums[i - 1];
            int t1 = maxdp[i - 1] * nownum;
            int t2 = mindp[i - 1] * nownum;
            maxdp[i] = max({t1, t2, nownum});
            mindp[i] = min({t1, t2, nownum});
        }
        return *max_element(maxdp.begin() + 1, maxdp.end());
    }
};
```

## 148.排序链表

链表排序的模板题。查阅资料后链表使用归并排序较优，因为归并排序空间复杂度的缺点在链表中并不存在。
先使用快慢指针找到中间节点断开，然后归并。

```c++
class Solution
{
    ListNode *merge(ListNode *left, ListNode *right)
    {
        ListNode *head = new ListNode(0);
        auto p = head;
        while (left || right)
        {
            if (left && right)
            {
                if (left->val > right->val)
                {
                    p->next = right;
                    right = right->next;
                }
                else
                {
                    p->next = left;
                    left = left->next;
                }
            }
            else
            {
                if (left)
                {
                    p->next = left;
                    left = left->next;
                }
                else
                {
                    p->next = right;
                    right = right->next;
                }
            }
            p = p->next;
        }
        p = head->next;
        delete head;
        return p;
    }

public:
    ListNode *sortList(ListNode *head)
    {
        if (head == nullptr || head->next == nullptr)
        {
            return head;
        }
        auto p1 = head, p2 = head->next;
        while (p2)
        {
            p2 = p2->next;
            if (p2)
            {
                p1 = p1->next;
                p2 = p2->next;
            }
        }
        p2 = p1->next;
        p1->next = nullptr;
        auto l = sortList(head);
        auto r = sortList(p2);
        auto h = merge(l, r);
        return h;
    }
};
```

表现不佳：

```
Your runtime beats 9.69 % of cpp submissions
Your memory usage beats 5.06 % of cpp submissions (84.5 MB)
```

算法使用了递归，会使用$O(logn)$的栈空间，想做到$O(1)$空间复杂度就要想办法消除递归。归并排序可以自底向上无递归排序。单个节点的链表是有序的，然后可以2个一组归并，再2，4，8递推

## 146.LRU 缓存

`get`和`put`必须以$O(1)$的平均时间复杂度运行