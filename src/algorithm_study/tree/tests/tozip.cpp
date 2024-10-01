#include <stdio.h>
#include <limits.h>
#include <queue>
#include <stack>
#include <list>
using namespace std;

struct node
{
    int data;
    int max_sum;
    int max_route_len;
    static node *nullNode;
    node *leftChild;
    node *rightChild;
    node *parent;
    int rank;
    node(int data)
    {
        max_sum = 0;
        max_route_len = 0;
        this->data = data;
        leftChild = nullNode;
        rightChild = nullNode;
    }
    node(int data, int parent_rank, node *parent)
    {
        max_route_len = 1;
        this->data = data;
        this->rank = parent_rank + 1;
        this->parent = parent;
        leftChild = nullNode;
        rightChild = nullNode;
    }
};
struct args
{
    node *&nownode;
    node *parent;
    int parent_rank;
    args(node *&nownode, int parent_rank, node *parent)
        : nownode(nownode), parent(parent)
    {
        this->parent_rank = parent_rank;
    }
};
node *node::nullNode = new node(0);
struct binary_tree
{
    node *root;
    node *max_node;
    int amax_sum;
    list<node *> ranks[100];
    int max_rank;
    binary_tree()
    {
        amax_sum = INT_MIN;
        max_rank = 0;
        stack<args *> sta;
        sta.push(new args(root, -1, node::nullNode));
        while (!sta.empty())
        {
            int temp;
            scanf("%d", &temp);
            args *nowargs = sta.top();
            sta.pop();
            if (temp == 0)
            {
                nowargs->nownode = node::nullNode;
            }
            else
            {
                nowargs->nownode = new node(temp, nowargs->parent_rank, nowargs->parent);
                if (nowargs->nownode->rank > max_rank)
                {
                    max_rank = nowargs->nownode->rank;
                }
                ranks[nowargs->nownode->rank].insert(ranks[nowargs->nownode->rank].end(), nowargs->nownode);
                sta.push(new args(nowargs->nownode->rightChild, nowargs->nownode->rank, nowargs->nownode));
                sta.push(new args(nowargs->nownode->leftChild, nowargs->nownode->rank, nowargs->nownode));
            }
        }
    }
    void get_max(node *nownode)
    {
        if (nownode == node::nullNode)
        {
            return;
        }
        if (nownode->max_sum > amax_sum)
        {
            max_node = nownode;
            amax_sum = nownode->max_sum;
        }
        get_max(nownode->leftChild);
        get_max(nownode->rightChild);
    }
    void search_maxroute()
    {
        auto max_or = [](node *a, node *b) -> node *
        {
            if (a->max_sum > b->max_sum)
            {
                return a->max_sum > 0 ? a : node::nullNode;
            }
            else if (a->max_sum < b->max_sum)
            {
                return b->max_sum > 0 ? b : node::nullNode;
            }
            else
            {
                if(a->max_sum <= 0)
                {
                    return node::nullNode;
                }
                return a->max_route_len <= b->max_route_len ? a : b;
            }
        };

        for (int i = max_rank; i >= 0; i--)
        {
            for (node *j : ranks[i])
            {
                node *route_next = max_or(j->leftChild, j->rightChild);
                j->max_sum = j->data + route_next->max_sum;
                j->max_route_len += route_next->max_route_len;
            }
        }
        stack<node *> sta;
        sta.push(root);
        while (!sta.empty())
        {
            node *nownode = sta.top();
            sta.pop();
            if (nownode != node::nullNode)
            {
                if(nownode->max_sum > amax_sum || (nownode->max_sum == amax_sum && nownode->max_route_len < max_node->max_route_len))
                {
                    max_node = nownode;
                    amax_sum = nownode->max_sum;
                }
                sta.push(nownode->rightChild);
                sta.push(nownode->leftChild);
            }
        }

        printf("%d\n", amax_sum);
    }
    void print_route()
    {
        auto max = [](node *a, node *b, node *c) -> node *
        {
            if (a->max_sum > b->max_sum)
            {
                return a->max_sum > c->max_sum ? a : c;
            }
            else
            {
                return b->max_sum > c->max_sum ? b : c;
            }
        };
        queue<node *> que;
        node *p = max_node;
        while (p != node::nullNode)
        {
            que.push(p);
            p = max(p->rightChild, p->leftChild, node::nullNode);
        }
        while (!que.empty())
        {
            node *nownode = que.front();
            printf("%d ", nownode->data);
            que.pop();
        }
        printf("\n");
    }
};

void debug_preorder(node *root)
{
    if (root == node::nullNode)
    {
        return;
    }
    printf("%d max:%d     ", root->data, root->max_sum);
    debug_preorder(root->leftChild);
    debug_preorder(root->rightChild);
}
int main()
{
    binary_tree tree;
    tree.search_maxroute();
    tree.print_route();
    // debug_preorder(tree.root);
    return 0;
}