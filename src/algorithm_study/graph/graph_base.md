# 图的存储结构,创建图

## 存储结构

### 邻接矩阵

用一个矩阵表示A表示点之间的关系,其中

1. 如果是权图:

   如果`A[i][j] == 0`,那么点i和j之间不存在边,否则这个值为权值,特殊地,`A[i][i] = 0`

2. 如果是非权图:

    如果存在边i -> j,则`A[i][j] == 1`,否则`A[i][j] == 0`

邻接矩阵中,行i中不为0的值为i的出度,列i中不为0的值为i的入度

```c++
namespace Mat_graph
{
    struct node
    {
        char data;
        node(char data)
            : data(data) {}
    };
    struct graph
    {
        vector<node> nodes;
        vector<vector<int>> adjMat;
        bool direct; // 是否为有向图
        graph(int nodes_count, const vector<node> &nodes, bool direct)
            : nodes(nodes), adjMat(nodes_count, vector<int>(nodes_count, 0)), direct(direct) {}

        void addEdge(int i, int j, int weight) // 权图
        {
            adjMat[i][j] = weight;
            if (!direct)
            {
                adjMat[j][i] = weight;
            }
        }
        void addEdge(int i, int j) // 非权图
        {
            adjMat[i][j] = 1;
            if (!direct)
            {
                adjMat[j][i] = 1;
            }
        }
        void print()
        {
            for (int i = 0; i < nodes.size(); i++)
            {
                for (int j = 0; j < nodes.size(); j++)
                {
                    cout << adjMat[i][j] << " ";
                }
                cout << endl;
            }
        }
    };

};

int main()
{
    using namespace Mat_graph;
    graph myfirst_graph(5, {'a', 'b', 'c', 'd', 'e'}, false);
    myfirst_graph.addEdge(1, 0);
    myfirst_graph.addEdge(4, 0);
    myfirst_graph.addEdge(2, 0);
    myfirst_graph.addEdge(2, 4);
    myfirst_graph.addEdge(1, 3);
    myfirst_graph.addEdge(3, 2);
    myfirst_graph.print();
    return 0;
}
```

运行结果:

    0 1 1 0 1
    1 0 0 1 0
    1 0 0 1 1
    0 1 1 0 0
    1 0 1 0 0

    请按任意键继续. . .

### 邻接表

+ 先采用一个顺序结构储存各个顶点
+ 每个顶点包含一个单链表,储存这个顶点的所有邻接顶点

```c++
namespace List_graph
{
    struct linknode
    {
        int index;
        int weight; // 权图
        linknode(int index)
            : index(index) {}
        linknode(int index, int weight)
            : index(index), weight(weight) {}
    };
    struct node
    {
        char data;
        list<linknode> link;
        node(char data)
            : data(data) {}
    };

    struct graph
    {
        vector<node> nodes;
        bool direct; // 是否为有向图
        graph(int nodes_count, const vector<node> &nodes, bool direct)
            : nodes(nodes), direct(direct) {}

        void addEdge(int i, int j, int weight) // 权图
        {
            nodes[i].link.push_back(linknode(j, weight));
            if (!direct)
            {
                nodes[j].link.push_back(linknode(i, weight));
            }
        }
        void addEdge(int i, int j) // 非权图
        {
            nodes[i].link.push_back(linknode(j));
            if (!direct)
            {
                nodes[j].link.push_back(linknode(i));
            }
        }
        void print()
        {
            for (int i = 0; i < nodes.size(); i++)
            {
                cout << nodes[i].data << " link: ";
                for_each(nodes[i].link.begin(), nodes[i].link.end(), [&](linknode &now)
                         { cout << nodes[now.index].data << " "; });
                cout << endl;
            }
        }
    };
};

int main()
{
    using namespace Mat_graph;
    graph myfirst_graph(5, {'a', 'b', 'c', 'd', 'e'}, false);
    myfirst_graph.addEdge(1, 0);
    myfirst_graph.addEdge(4, 0);
    myfirst_graph.addEdge(2, 0);
    myfirst_graph.addEdge(2, 4);
    myfirst_graph.addEdge(1, 3);
    myfirst_graph.addEdge(3, 2);
    myfirst_graph.print();
    return 0;
}
```

运行结果:

    a link: b e c
    b link: a d
    c link: a e d
    d link: b c
    e link: a c

    请按任意键继续. . .