#include <stdio.h>
#include <vector>
using namespace std;

struct ChildNode
{
    int index;
    ChildNode *next;
};

struct treeNode
{
    char data;
    int father_index;
    ChildNode *firstChild;
};

struct tree
{
    int size;
    vector<treeNode> table;
};

struct node
{
    char data;
    node *FirstChild;
    node *NextBrother;
};