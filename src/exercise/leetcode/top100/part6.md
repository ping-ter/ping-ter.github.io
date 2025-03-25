---
date: 2025-03-14
---
# 热门100题part6（155.最小栈 152.乘积最大子数组 148.排序链表 146.LRU 缓存 141.环形链表 142.环形链表 II）

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

`get`和`put`必须以$O(1)$的平均时间复杂度运行，但是没限制空间，显然这题是空间换时间。$O(1)$查询就必须使用哈希表。而$O(1)$更新和寻找最久未使用的关键字，可以维护一个链表，每次使用新的关键字时，移动到尾部，表头始终为最近最少使用的，由于需要在链表中定位，所以需要在哈希表中存储链表节点，而移动操作需要前后的节点，所以应该是双向链表。

```c++
class LRUCache
{
    struct node
    {
        node *pre;
        node *next;
        int value;
        int key;
        node(int key, int value) : key(key), value(value), pre(nullptr), next(nullptr) {}
    };
    node *head;
    node *tail;
    int size;
    int cnt;
    unordered_map<int, node *> keymap;
    inline void push_back(node *p)
    {
        tail->next = p;
        p->pre = tail;
        tail = tail->next;
    }
    inline void move_back(node *p)
    {
        if (p == tail)
        {
            return;
        }
        node *pre = p->pre;
        node *next = p->next;
        pre->next = next;
        next->pre = pre;
        p->next = nullptr;
        push_back(p);
    }

public:
    LRUCache(int capacity)
    {
        size = capacity;
        cnt = 0;
        head = new node(0, 0);
        tail = head;
    }

    int get(int key)
    {
        auto it = keymap.find(key);
        if (it == keymap.end())
        {
            return -1;
        }
        move_back(it->second);
        return it->second->value;
    }

    void put(int key, int value)
    {
        auto it = keymap.find(key);
        node *nownode;
        if (it == keymap.end())
        {
            nownode = new node(key, value);
            keymap.insert(make_pair(key, nownode));
            cnt++;
            push_back(nownode);
            if (cnt > size)
            {
                node *p = head->next;
                head->next = p->next;
                head->next->pre = head;
                keymap.erase(p->key);
                delete p;
            }
        }
        else
        {
            nownode = (*it).second;
            nownode->value = value;
            move_back(nownode);
        }
    }
};
```

## 141.环形链表

进阶要求$O(1)$空间，也就是不能用数组或者哈希表来存，那么可以使用快慢指针，如果两个指针相遇，证明有环，如果快指针能走完，证明没有环。

```c++
class Solution
{
public:
    bool hasCycle(ListNode *head)
    {
        if (head == nullptr || head->next == nullptr)
        {
            return false;
        }
        ListNode *p1 = head;
        ListNode *p2 = head->next;
        while (p2 && p1 != p2)
        {
            p1 = p1->next;
            p2 = p2->next;
            if (p2)
            {
                p2 = p2->next;
            }
        }
        if (p2 == nullptr)
        {
            return false;
        }
        return true;
    }
};
```

## 142.环形链表 II

在上一题的基础上，需要找出尾部连接的点，同时，本题不允许修改链表。$O(1)$空间的限制其实对上题没什么影响，对这题则是很大限制了思路

偷看评论区发现可以在相遇后再使用双指针来确定
[参考评论](https://leetcode.cn/problems/linked-list-cycle-ii/description/comments/2982279/)

把链表起点到环入口距离记为$a$, 相遇时，慢指针在环内走过的距离为$b$，环总长度为$c$ 
首先，快慢指针相遇时，一定满足快指针走的跳数是慢指针两倍 
那么慢指针走过：$a+b$,快指针走过$a+nc$,而$2(a+b)=a+nc$，所以$nc=a+b$
也就是说，从如果相遇后再设置一个指针，那指针走$a$时，慢指针正好走到$nc$，他们在入口相遇。

```c++
class Solution
{
public:
    ListNode *detectCycle(ListNode *head)
    {
        ListNode *p1 = head;
        ListNode *p2 = head;
        while (p2)
        {
            p1 = p1->next;
            p2 = p2->next;
            if (p2)
            {
                p2 = p2->next;
            }
            if (p1 == p2)
            {
                break;
            }
        }
        if (!p2)
        {
            return nullptr;
        }
        ListNode *t1 = head, *t2  = p1;
        while (t1 != t2)
        {
            t1 = t1->next;
            t2 = t2->next;
        }
        return t1;
    }
};
```