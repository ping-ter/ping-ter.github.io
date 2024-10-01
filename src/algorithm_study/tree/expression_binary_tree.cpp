#include <iostream>
#include <stack>
using namespace std;

struct node
{
    int data;
    char calcu;
    node *leftChild;
    node *rightChild;
    node(int data, char calcu)
        : data(data), calcu(calcu), leftChild(nullptr), rightChild(nullptr) {}
    node(int data)
        : data(data), calcu(0), leftChild(nullptr), rightChild(nullptr) {}
    node(char calcu)
        : data(0), calcu(calcu), leftChild(nullptr), rightChild(nullptr) {}
};

struct expression_tree
{
    node *root;
    expression_tree();
    void preorder();
    int calculate();
    void inorder();
};
void expression_tree::inorder()
{
    stack<node *> sta;
    node *nownode = root;
    while (1)
    {
        while (nownode != nullptr)
        {
            sta.push(nownode);
            nownode = nownode->leftChild; // 沿左侧通路依次入栈
        }
        if (sta.empty())
        {
            return;
        }
        nownode = sta.top();
        sta.pop();
        if (nownode->calcu == 0)
        {
            cout << nownode->data << " ";
        }
        else
        {
            cout << nownode->calcu << " ";
        }
        nownode = nownode->rightChild; // 访问一个节点后,访问其右子树
    }
}
void expression_tree::preorder()
{
    stack<node *> sta;
    sta.push(root);
    while (!sta.empty())
    {
        node *nownode = sta.top();
        if (nownode != nullptr)
        {
            cout << nownode->data << " ";
            sta.pop();
            sta.push(nownode->rightChild);
            sta.push(nownode->leftChild); // 后进先出,后让右子树入栈
        }
        else
        {
            sta.pop();
        }
    }
    cout << endl;
}

expression_tree::expression_tree()
{
    int num;
    char op;
    stack<node *> sta;
    node *nownode;
    while (1)
    {
        if (cin >> num)
        {
            sta.push(new node(num));
        }
        else
        {
            cin.clear();
            op = cin.get();
            if (op == '\n')
            {
                break;
            }
            else if (op == '+' || op == '-' || op == '*' || op == '/')
            {
                nownode = new node(op);
                nownode->rightChild = sta.top();
                sta.pop();
                nownode->leftChild = sta.top();
                sta.pop();
                sta.push(nownode);
            }
        }
    }
    root = sta.top();
}

int expression_tree::calculate()
{
    return 0;
}

int main()
{
    expression_tree atree;
    atree.inorder();
    return 0;
}