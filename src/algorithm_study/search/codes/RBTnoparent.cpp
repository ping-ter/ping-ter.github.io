#include <iostream>
using namespace std;
string colorStr[] = {"B", "R"};
struct node
{
    enum Color
    {
        BLACK,
        RED
    };
    int key;
    Color color;
    node *leftChild, *rightChild;
    node(int key, Color color = Color::RED) : key(key), leftChild(nullptr), rightChild(nullptr), color(color) {}
};
node* root;

void preOrder(node *nownode)
{
    if (nownode == nullptr)
    {
        return;
    }
    cout << nownode->key << " " << colorStr[nownode->color] << " ";
    preOrder(nownode->leftChild);
    preOrder(nownode->rightChild);
}
void inOrder(node *nownode)
{
    if (nownode == nullptr)
    {
        return;
    }
    inOrder(nownode->leftChild);
    cout << nownode->key << " " << colorStr[nownode->color] << " ";
    inOrder(nownode->rightChild);
}

