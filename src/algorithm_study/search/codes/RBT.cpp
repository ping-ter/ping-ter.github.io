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

    node *leftChild;
    node *rightChild;
    node *father;
    node(int key, node *father = nullptr, Color color = Color::RED)
        : key(key), leftChild(nullptr), rightChild(nullptr), color(color), father(father) {}
};

struct RBT
{
public:
    node *root;
    RBT() : root(nullptr) {}
    void insert(int key);
    void delNode(int key);

    void inOrderTravel()
    {
        inOrder(root);
    }
    void preOrderTravel()
    {
        preOrder(root);
    }

private:
    void rotateLeft(node *&nownode);
    void rotateRight(node *&nownode);
    node *insertInner(int key, node *&nownode, node *father);
    void adjustAfterDel(node *nodetoDel);
    node *delNodeInner(int key, node *&nownode);
    void adjustAfterInsert(node *newnode);
    void preOrder(node *nownode);
    void inOrder(node *nownode);
};

int main()
{
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);

    RBT a;

    string op;
    int data;
    int n;

    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> op >> data;
        if (op[0] == 'I')
        {
            a.insert(data);
        }
        else
        {
            a.delNode(data);
        }
    }

    a.root->color = node::Color::BLACK;
    if (a.root == nullptr)
    {
        return 0;
    }
    a.inOrderTravel();
    cout << "\n";
    cout << "\n";
    a.preOrderTravel();
    cout << "\n";

    return 0;
}

void RBT::preOrder(node *nownode)
{
    if (nownode == nullptr)
    {
        return;
    }
    cout << nownode->key << " " << colorStr[nownode->color] << " ";
    preOrder(nownode->leftChild);
    preOrder(nownode->rightChild);
}

void RBT::inOrder(node *nownode)
{
    if (nownode == nullptr)
    {
        return;
    }

    inOrder(nownode->leftChild);
    cout << nownode->key << " " << colorStr[nownode->color] << " ";
    inOrder(nownode->rightChild);
}

void RBT::rotateLeft(node *&nownode)
{
    node *A = nownode;
    node *C = nownode->rightChild;
    node *D = C->leftChild;
    if (D != nullptr)
    {
        D->father = A;
    }

    A->rightChild = D;

    C->father = A->father;
    nownode = C;

    A->father = C;
    C->leftChild = A;
}
void RBT::rotateRight(node *&nownode)
{
    node *A = nownode;
    node *C = nownode->leftChild;
    node *D = C->rightChild;

    if (D != nullptr)
    {
        D->father = A;
    }

    A->leftChild = D;

    C->father = A->father;
    nownode = C;

    A->father = C;
    C->rightChild = A;
}

void RBT::insert(int key)
{
    node *newnode = insertInner(key, root, nullptr);
    adjustAfterInsert(newnode);
    if (root != nullptr)
    {

        root->color = node::Color::BLACK;
    }
}
node *RBT::insertInner(int key, node *&nownode, node *father)
{
    if (nownode == nullptr)
    {
        nownode = new node(key, father);
        return nownode;
    }
    else if (nownode->key > key)
    {
        return insertInner(key, nownode->leftChild, nownode);
    }
    else if (nownode->key < key)
    {
        return insertInner(key, nownode->rightChild, nownode);
    }
    else
    {
        return nullptr;
    }
}

void RBT::adjustAfterInsert(node *newnode)
{
    if (newnode == nullptr || newnode->father == nullptr)
    {
        return;
    }
    node *father = newnode->father;
    if (father->color == node::Color::BLACK)
    {
        return;
    }
    node *grandfather = father->father;
    if (grandfather == nullptr)
    {
        father->color = node::Color::BLACK;
        return;
    }
    node *uncle = (grandfather->leftChild == father) ? grandfather->rightChild : grandfather->leftChild;

    if (uncle != nullptr && uncle->color == node::Color::RED)
    {
        father->color = node::Color::BLACK;
        uncle->color = node::Color::BLACK;
        grandfather->color = node::Color::RED;
        adjustAfterInsert(grandfather);
        return;
    }
    bool newnodeLeft = newnode == father->leftChild;
    bool fatherLeft = father == grandfather->leftChild;

    if (newnodeLeft != fatherLeft)
    {
        if (fatherLeft)
        {
            rotateLeft(grandfather->leftChild);
        }
        else
        {
            rotateRight(grandfather->rightChild);
        }
        newnode = father;
        father = newnode->father;
    }

    if (grandfather->father == nullptr)
    {
        if (fatherLeft)
        {
            rotateRight(root);
        }
        else
        {
            rotateLeft(root);
        }
    }
    else
    {
        if (grandfather->father->leftChild == grandfather)
        {
            if (fatherLeft)
            {
                rotateRight(grandfather->father->leftChild);
            }
            else
            {
                rotateLeft(grandfather->father->leftChild);
            }
        }
        else
        {
            if (fatherLeft)
            {
                rotateRight(grandfather->father->rightChild);
            }
            else
            {
                rotateLeft(grandfather->father->rightChild);
            }
        }
    }
    father->color = node::Color::BLACK;
    grandfather->color = node::Color::RED;
}

void RBT::adjustAfterDel(node *nodetoDel)
{
    if (nodetoDel == root)
    {
        return;
    }
    node *father = nodetoDel->father;
    node *grandfather = father->father;
    bool nodetoDelLeft = father->leftChild == nodetoDel;
    node *brother = nodetoDelLeft ? father->rightChild : father->leftChild;

    if (brother != nullptr && brother->color == node::Color::RED)
    {
        node **toRotate = nullptr;

        if (grandfather == nullptr)
        {
            toRotate = &root;
        }
        else
        {
            bool fatherLeft = grandfather->leftChild == father;
            toRotate = fatherLeft ? &(grandfather->leftChild) : &(grandfather->rightChild);
        }
        if (nodetoDelLeft)
        {
            rotateLeft(*toRotate);
        }
        else
        {
            rotateRight(*toRotate);
        }

        brother->color = node::Color::BLACK;
        father->color = node::Color::RED;
    }

    grandfather = father->father;
    brother = nodetoDelLeft ? father->rightChild : father->leftChild;
    node *nephewLeft = brother->leftChild;
    node *nephewRight = brother->rightChild;

    if ((nephewLeft == nullptr || nephewLeft->color == node::Color::BLACK) && (nephewRight == nullptr || nephewRight->color == node::Color::BLACK) && (father->color == node::Color::RED))
    {
        brother->color = node::Color::RED;
        father->color = node::Color::BLACK;
        return;
    }

    if ((nephewLeft == nullptr || nephewLeft->color == node::Color::BLACK) && (nephewRight == nullptr || nephewRight->color == node::Color::BLACK) && (father->color == node::Color::BLACK))
    {
        brother->color = node::Color::RED;
        adjustAfterDel(father);
        return;
    }

    node *closeNephew;
    node *distantNephew;
    if (nodetoDelLeft)
    {
        closeNephew = nephewLeft;
        distantNephew = nephewRight;
    }
    else
    {
        closeNephew = nephewRight;
        distantNephew = nephewLeft;
    }

    if ((nephewLeft != nullptr && nephewLeft->color == node::Color::RED) && (nephewRight != nullptr && nephewRight->color == node::Color::RED))
    {
        //distantNephew->color = node::Color::BLACK;
        if (father->color == node::Color::BLACK)
        {
            distantNephew->color = node::Color::BLACK;
        }
        else
        {
            brother->color = node::Color::RED;
            father->color = node::Color::BLACK;
            distantNephew->color = node::Color::BLACK;
        }
        node **toRotate = nullptr;
        if (grandfather == nullptr)
        {
            toRotate = &root;
        }
        else
        {
            bool fatherLeft = grandfather->leftChild == father;
            toRotate = fatherLeft ? &(grandfather->leftChild) : &(grandfather->rightChild);
        }

        if (nodetoDelLeft)
        {
            rotateLeft(*toRotate);
            
        }
        else
        {
            rotateRight(*toRotate);
        }
        return;
    }

    if (closeNephew != nullptr && closeNephew->color == node::Color::RED)
    {
        // node **toRotate = nullptr;
        if (nodetoDelLeft)
        {
            rotateRight(father->rightChild);
        }
        else
        {
            rotateLeft(father->leftChild);
        }

        brother->color = node::Color::RED;
        closeNephew->color = node::Color::BLACK;
    }
    brother = nodetoDelLeft ? father->rightChild : father->leftChild;
    nephewLeft = brother->leftChild;
    nephewRight = brother->rightChild;
    if (nodetoDelLeft)
    {
        closeNephew = nephewLeft;
        distantNephew = nephewRight;
    }
    else
    {
        closeNephew = nephewRight;
        distantNephew = nephewLeft;
    }
    node **toRotate = nullptr;

    if (grandfather == nullptr)
    {
        toRotate = &root;
    }
    else
    {
        bool fatherLeft = grandfather->leftChild == father;
        toRotate = fatherLeft ? &(grandfather->leftChild) : &(grandfather->rightChild);
    }
    if (nodetoDelLeft)
    {
        rotateLeft(*toRotate);
    }

    else
    {
        rotateRight(*toRotate);
    }
    swap(father->color, brother->color);
    distantNephew->color = node::Color::BLACK;
}

void RBT::delNode(int key)
{
    node *nodetoDel = delNodeInner(key, root);

    if (nodetoDel == nullptr)
    {
        return;
    }
    if (nodetoDel == root)
    {
        root = nullptr;
        return;
    }
    else if (nodetoDel != nullptr && nodetoDel->color == node::Color::BLACK)
    {
        adjustAfterDel(nodetoDel);
    }
    if (nodetoDel->father->leftChild == nodetoDel)
    {
        nodetoDel->father->leftChild = nullptr;
    }
    else
    {
        nodetoDel->father->rightChild = nullptr;
    }

    delete nodetoDel;
    if (root != nullptr)
    {
        root->color = node::Color::BLACK;
    }
}
node *RBT::delNodeInner(int key, node *&nownode)
{
    if (nownode == nullptr)
    {
        return nullptr;
    }
    else if (nownode->key > key)
    {
        return delNodeInner(key, nownode->leftChild);
    }
    else if (nownode->key < key)
    {
        return delNodeInner(key, nownode->rightChild);
    }
    else
    {

        if (nownode->leftChild != nullptr && nownode->rightChild != nullptr)
        {
            node *p = nownode->rightChild;
            while (p->leftChild != nullptr)
            {
                p = p->leftChild;
            }
            swap(p->key, nownode->key);

            return delNodeInner(key, p);
        }
        else
        {

            node *p = nownode->rightChild;
            if (nownode->leftChild != nullptr)
            {
                p = nownode->leftChild;
            }
            if (p != nullptr)
            {
                swap(p->key, nownode->key);
                return p;
            }
            else
            {
                return nownode;
            }
        }
    }
}

/*

14
Insert 11
Insert 13
Insert 9
Insert 3
Insert 4
Insert 2
Insert 1
Insert 7
Insert 10
Insert 6
Remove 9
Remove 5
Remove 6
Remove 7
Remove 14
Remove 11
Remove 13
Remove 8
Remove 12
Remove 15
*/