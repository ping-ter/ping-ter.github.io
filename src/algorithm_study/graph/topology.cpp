#include <iostream>
#include <vector>
#include <algorithm>
#include <list>
#include <stack>
using namespace std;
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
    node() : data(0) {}
};

struct graph
{
    vector<node> nodes;
    bool direct; // 是否为有向图
    graph(int nodes_count, const vector<node> &nodes, bool direct)
        : nodes(nodes), direct(direct) {}
    graph(int nodes_count, bool direct)
        : nodes(nodes_count), direct(direct) {}

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
    virtual void topoOrder() // 拓扑排序
    {
        int n = nodes.size();
        vector<int> inDegree(n, 0); // 记录各点入度
        stack<int> sta;             // 辅助栈
        for_each(nodes.begin(), nodes.end(), [&](node &now)
                 {
            for(linknode& i : now.link)
            {
                inDegree[i.index]++;
            } }); // 统计各点入度

        for (int i = 0; i < n; i++)
        {
            if (inDegree[i] == 0)
            {
                sta.push(i); // 入度为0的点入栈
            }
        }

        while (!sta.empty())
        {
            int index = sta.top();
            sta.pop();
            cout << nodes[index].data << " ";

            for (linknode &i : nodes[index].link)
            {
                inDegree[i.index]--; // 减少入度,模拟删除边的操作
                if (inDegree[i.index] == 0)
                {
                    sta.push(i.index); // 入度为0的点入栈
                }
            }
        }
        cout << endl;
    }
    void dfs_in(vector<int> &traversaled, int index)
    {
        traversaled[index] = 1; // 标记为已访问
        for (linknode &i : nodes[index].link)
        {
            if (traversaled[i.index] == 0)
            {
                dfs_in(traversaled, i.index);
            }
        }
        cout << nodes[index].data << " ";
    }
    void re_topoOrder()
    {
        int n = nodes.size();
        vector<int> traversaled(n, 0);
        dfs_in(traversaled, 0);
        cout << endl;
    }
};

struct AOE : public graph
{
    list<int> topolist;
    vector<int> ve;
    vector<int> vl;
    int n;
    AOE(int nodes_count, const vector<node> &nodes)
        : graph(nodes_count, nodes, true), ve(nodes_count, 0), vl(nodes_count), n(nodes_count) {}
    AOE(int nodes_count)
        : graph(nodes_count, true), ve(nodes_count, 0), vl(nodes_count), n(nodes_count) {}
    void addEdge(int i, int j, int weight) // 权图
    {
        nodes[i].link.push_back(linknode(j, weight));
        if (!direct)
        {
            nodes[j].link.push_back(linknode(i, weight));
        }
    }
    virtual void topoOrder() // 拓扑排序
    {
        topolist.clear();
        int n = nodes.size();
        vector<int> inDegree(n, 0); // 记录各点入度
        stack<int> sta;             // 辅助栈
        for_each(nodes.begin(), nodes.end(), [&](node &now)
                 {
            for(linknode& i : now.link)
            {
                inDegree[i.index]++;
            } }); // 统计各点入度

        for (int i = 0; i < n; i++)
        {
            if (inDegree[i] == 0)
            {
                sta.push(i); // 入度为0的点入栈
            }
        }

        while (!sta.empty())
        {
            int index = sta.top();
            sta.pop();
            topolist.push_back(index);

            for (linknode &i : nodes[index].link)
            {
                inDegree[i.index]--; // 减少入度,模拟删除边的操作
                if (inDegree[i.index] == 0)
                {
                    sta.push(i.index); // 入度为0的点入栈
                }
            }
        }
        cout << endl;
        if(topolist.size() != n)
        {
            cout << "unworkable project" << endl;
        }
    }

    void vertexEarliestTime() // 求ve
    {
        for (int &i : topolist)
        {
            for (linknode &j : nodes[i].link)
            {
                if (ve[j.index] < ve[i] + j.weight)
                {
                    ve[j.index] = ve[i] + j.weight;
                }
            }
        }
    }

    void vertexLastTime() // 求vl
    {
        for (int i = 0; i < n; i++)
        {
            vl[i] = ve[n - 1];
        }
        for_each(topolist.rbegin(), topolist.rend(), [&](int i)
                 {
                     for (linknode &j : nodes[i].link)
                     {
                         if (vl[i] > vl[j.index] - j.weight)
                         {
                             vl[i] = vl[j.index] - j.weight;
                         }
                     } });
    }
    void CriticalPath()
    {
        topoOrder();
        vertexEarliestTime();
        vertexLastTime();

        for (int i : ve)
        {
            cout << i << " ";
        }
        cout << "\n";

        for (int i : vl)
        {
            cout << i << " ";
        }
        cout << "\n";

        list<pair<int, int>> criticalPath;
        for (int i : topolist)
        {
            for (linknode j : nodes[i].link)
            {
                if (ve[i] == vl[j.index] - j.weight)
                {
                    criticalPath.push_back(make_pair(i, j.index));
                }
            }
        }
        for_each(criticalPath.begin(), criticalPath.end(), [](pair<int, int> &a)
                 { cout << a.first << "->" << a.second << " "; });
    }
};

int main()
{
    // graph topo(7, {'A', 'B', 'C', 'D', 'E', 'F', 'H'}, true);
    // topo.addEdge(0, 1);
    // topo.addEdge(0, 2);
    // topo.addEdge(1, 3);
    // topo.addEdge(2, 5);
    // topo.addEdge(1, 4);
    // topo.addEdge(1, 5);
    // topo.addEdge(4, 6);
    // topo.addEdge(5, 6);
    // topo.print();
    // topo.topoOrder();
    // topo.re_topoOrder();
    AOE critical(9);
    critical.addEdge(0, 1, 6);
    critical.addEdge(0, 2, 4);
    critical.addEdge(0, 3, 5);

    critical.addEdge(1, 4, 1);
    //critical.addEdge(4, 0, 1);// debug
    critical.addEdge(2, 4, 1);
    critical.addEdge(3, 5, 2);

    critical.addEdge(4, 6, 9);
    critical.addEdge(4, 7, 7);
    critical.addEdge(5, 7, 4);

    critical.addEdge(6, 8, 2);
    critical.addEdge(7, 8, 4);

    critical.CriticalPath();

    return 0;
}