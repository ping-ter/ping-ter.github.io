#include <list>
#include <stack>
#include <queue>
#include <string>
#include <iostream>
#include <sstream>
#include <algorithm>
#include <fstream>
#include <windows.h>
#include <map>
using namespace std;

struct node
{
    char data;
    int weight;
    node *leftChild;
    node *rightChild;
    node(char data, int weight)
        : data(data), weight(weight), leftChild(nullptr), rightChild(nullptr) {}
    node(char data, int weight, node *leftChild, node *rightChild)
        : data(data), weight(weight), leftChild(leftChild), rightChild(rightChild) {}
};

struct Huffman_tree
{
    node *root;
    Huffman_tree(list<node *> &);
    void preorder();
    void levelorder();
};
void Huffman_tree::levelorder()
{
    queue<node *> que;
    que.push(root);
    node *nownode;
    while (!que.empty())
    {
        nownode = que.front();
        que.pop();
        if (nownode != nullptr)
        {
            cout << nownode->weight << " ";
            if (nownode->data != 0)
            {
                cout << nownode->data << " ";
            }

            que.push(nownode->leftChild);
            que.push(nownode->rightChild);
        }
        else
        {
            cout << "0 ";
        }
    }
    cout << endl;
}
void Huffman_tree::preorder()
{
    stack<node *> sta;
    sta.push(root);
    while (!sta.empty())
    {
        node *nownode = sta.top();
        sta.pop();
        if (nownode != nullptr)
        {
            cout << nownode->weight << " ";
            if (nownode->data != 0)
            {
                cout << nownode->data << " ";
            }

            sta.push(nownode->rightChild);
            sta.push(nownode->leftChild); // 后进先出,后让右子树入栈
        }
        else
        {
            cout << "0 ";
        }
    }
    cout << endl;
}

Huffman_tree::Huffman_tree(list<node *> &nodes)
{
    node *p, *q;
    nodes.sort([](node *a, node *b)
               {
        if(a->weight < b->weight)
        {
            return true;
        }
        return false; });
    node *newnode;
    while (nodes.size() > 1)
    {
        // 弹出最小的两个元素
        p = nodes.front();
        nodes.pop_front();
        q = nodes.front();
        nodes.pop_front();

        // 创建新节点
        if (p->data > q->data)
        {
            newnode = new node(0, p->weight + q->weight, q, p);
        }
        else
        {
            newnode = new node(0, p->weight + q->weight, p, q);
        }
        auto it = nodes.begin();
        while (it != nodes.end() && (*it)->weight < newnode->weight)
        {
            ++it;
        }
        nodes.insert(it, newnode);
    }
    root = newnode;
}

list<node *> &file_analysis(const string &file)
{
    int frequency[300] = {0};
    for (char i : file)
    {
        frequency[i]++;
    }
    list<node *> *nodes = new list<node *>;
    for (int i = 0; i < 300; i++)
    {
        if (frequency[i] != 0)
        {
            (*nodes).push_front(new node(i, frequency[i]));
        }
    }
    return *nodes;
}

int main()
{
    SetConsoleOutputCP(CP_UTF8);
    ifstream file("tozip.cpp");
    string a;
    if (file.is_open())
    {
        std::stringstream buffer;
        buffer << file.rdbuf(); // 将文件内容读入缓冲区

        a = buffer.str(); // 将缓冲区内容转换为字符串

        std::cout << a << std::endl; // 输出文件内容
    }
    else
    {
        cout << "读取失败" << endl;
        return 0;
    }
    list<node *> &nodes = file_analysis(a);
    for_each(nodes.begin(), nodes.end(), [](node *a)
             { cout << "data: " << a->data << " "
                    << "weight" << a->weight << endl; });
    Huffman_tree htree(nodes);
    htree.levelorder();
    return 0;
}

