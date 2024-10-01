#include <iostream>
#include <vector>
#include <algorithm>
#include <list>
using namespace std;

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