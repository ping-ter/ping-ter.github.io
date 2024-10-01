#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

struct node
{
    int data;
    node(int data)
        : data(data) {}
};

struct heap
{
    vector<node *> nodes;

    heap(const vector<node *> &nodes)
        : nodes(nodes) {}
    heap() {}
    void push(int data);
    void pop();
    inline int father(int index)
    {
        return (index - 1) / 2; // 父亲节点
    }
    inline int leftChild(int index)
    {
        return index * 2 + 1; // 左子树
    }
    inline int rightChild(int index)
    {
        return index * 2 + 2; // 右子树
    }
    inline int size()
    {
        return nodes.size();
    }
    inline int top()
    {
        return nodes[0]->data; // 堆顶
    }
    inline void print()
    {
        for_each(nodes.begin(), nodes.end(), [](node *now)
                 { cout << now->data << " "; });
        cout << endl;
    }
};

void heap::push(int data)
{
    int index = size();
    nodes.push_back(new node(data)); // 插入堆底

    // 进行堆化
    while (index > 0)
    {
        // 小根堆
        int fi = father(index);
        if (nodes[fi]->data > nodes[index]->data)
        {
            node *temp = nodes[fi];
            nodes[fi] = nodes[index];
            nodes[index] = temp;
            index = father(fi);
        }
        else
        {
            break;
        }
    } // 进行气泡操作
}

void heap::pop()
{
    swap(nodes[0], nodes[nodes.size() - 1]);
    nodes.pop_back();
    int index = 0;
    int n = size();
    while (index < n)
    {
        int lc = leftChild(index);
        int rc = rightChild(index);
        int toswap = index;
        if (lc < n && nodes[lc]->data < nodes[toswap]->data)
        {
            toswap = lc;
        }
        if (rc < n && nodes[rc]->data < nodes[toswap]->data)
        {
            toswap = rc;
        }

        if (toswap != index)
        {
            swap(nodes[toswap], nodes[index]);
            index = toswap;
        }
        else
        {
            break;
        }
    }
}

int main()
{
    heap myfirst_heap;
    myfirst_heap.push(1);
    myfirst_heap.push(5);
    myfirst_heap.push(4);
    myfirst_heap.push(8);
    myfirst_heap.push(3);
    myfirst_heap.push(7);
    myfirst_heap.push(2);
    myfirst_heap.print();

    myfirst_heap.pop();
    myfirst_heap.print();
    myfirst_heap.pop();
    myfirst_heap.print();
    myfirst_heap.pop();
    myfirst_heap.print();
    myfirst_heap.pop();
    myfirst_heap.print();
    return 0;
}