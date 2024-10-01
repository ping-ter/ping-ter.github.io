#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

template <typename dataType>
struct node
{
    dataType *data;
    node<dataType> *leftChild;
    node<dataType> *rightChild;
};

template <typename dataType, typename Key, typename getKey>
struct BST
{
    node<dataType> *root;

    BST() : root(nullptr) {}
    BST(const vector<dataType> &datas)
    {
        
    }
    dataType *search(Key key);
    void delNode(Key key);
    void insert(dataType *);
};

template <typename dataType, typename Key, typename getKey>
dataType *BST<dataType, Key, getKey>::search(Key key)
{
    node<dataType> *p = root;
    while (p != nullptr)
    {
        if (getKey(p) < key)
        {
            p = p->leftChild;
        }
        else if (getKey(p) > key)
        {
            p = p->rightChild;
        }
        else
        {
            return p;
        }
    }
    return nullptr; // 未查询到
}



