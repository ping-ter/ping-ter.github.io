#include <iostream>
#include <vector>
#include <algorithm>
#include <list>
#include <queue>
#include <stack>
#include "../tree/union_find.cpp"
using namespace std;

struct linknode
{
    int index;
    int weight;
    linknode(int index, int weight)
        : index(index), weight(weight) {}
};
struct node
{
    char data;
    list<linknode> link;
    node()
        : data(0) {}
};

struct edge // 按边储存图
{
    int start;
    int end;
    int weight;
    edge(int start, int end, int weight)
        : start(start), end(end), weight(weight) {}
};

struct graph
{
    vector<node> nodes;
    vector<edge> edges;

    int nodes_size;
    graph(int nodes_count)
        : nodes_size(nodes_count), nodes(nodes_count) {}

    void addEdge(int i, int j, int weight)
    {
        nodes[i].link.push_back(linknode(j, weight));
        nodes[j].link.push_back(linknode(i, weight));
        edges.push_back(edge(i, j, weight));
        // edges.push_back(edge(j, i, weight));
    }
    void print()
    {
        for (int i = 0; i < nodes.size(); i++)
        {
            cout << i << " link: ";
            for_each(nodes[i].link.begin(), nodes[i].link.end(), [&](linknode &now)
                     { cout << now.index << " "; });
            cout << endl;
        }
    }
    int Prim(int start);
    int Prim_pro(int start);
    int Kruskal();
};

int graph::Kruskal()
{
    sort(edges.begin(), edges.end(), [](edge &a, edge &b)
         { return a.weight < b.weight; }); // 将边按升序排序
    int edges_count = edges.size();

    int sumWeight = 0; // 边权和
    int mstEdge = 0;   // MST里边数
    union_find vertexSet(nodes_size);
    for (edge &i : edges)
    {
        if (vertexSet.find_set(i.start) != vertexSet.find_set(i.end))
        {
            vertexSet.union_set(i.start, i.end);
            cout << i.start << "-" << i.end << "\n";
            mstEdge++;
            sumWeight += i.weight;
            if (mstEdge == nodes_size - 1) // 找到了全部的n - 1条边
            {
                return sumWeight;
            }
        }
    }
    // 存在不连通的情况
    return 0x3f3f3f3f;
}

int graph::Prim(int start)
{
    int INF = 0x3f3f3f3f;
    vector<int> lowcost(nodes_size, INF);
    vector<int> pre(nodes_size, -1);
    vector<int> S(nodes_size, 0);
    int sumWeight = 0; // 累计加权
    lowcost[start] = 0;

    auto findMin = [&]() -> int
    {
        int min = INF;
        int min_index = -1;

        for (int i = 0; i < nodes_size; i++)
        {
            if (S[i] == 0 && lowcost[i] < min)
            {
                min = lowcost[i];
                min_index = i;
            }
        }
        return min_index;
    };

    for (int i = 0; i < nodes_size; i++)
    {
        int now = findMin();
        if (now == -1)
        {
            return sumWeight; // 图不联通,已不存在跨边
        }

        S[now] = 1;
        sumWeight += lowcost[now];
        if (now != start)
        {
            cout << pre[now] << "-" << now << "\n"; // 输出最小支撑树里的边
        }
        for (linknode &a : nodes[now].link)
        {
            if (S[a.index] == 0 && lowcost[a.index] > a.weight)
            {
                lowcost[a.index] = a.weight;
                pre[a.index] = now;
            }
        }
    }
    return sumWeight;
}

int graph::Prim_pro(int start)
{
    int INF = 0x3f3f3f3f;
    vector<int> lowcost(nodes_size, INF);
    vector<int> pre(nodes_size, -1);
    vector<int> S(nodes_size, 0);
    int sumWeight = 0; // 累计加权
    lowcost[start] = 0;
    struct Compare
    {
        bool operator()(const pair<int, int> &a, const pair<int, int> &b)
        {
            return a.second > b.second;
        }
    };
    priority_queue<pair<int, int>, vector<pair<int, int>>, Compare> que;

    que.push({start, 0});
    while (!que.empty())
    {
        pair<int, int> now_pair = que.top();
        que.pop();
        int now = now_pair.first;

        if (S[now] == 1)
        {
            continue;
        }
        if (lowcost[now] == INF)
        {
            return sumWeight; // 结束
        }

        S[now] = 1;
        sumWeight += lowcost[now];
        if (now != start)
        {
            cout << pre[now] << "-" << now << "\n"; // 输出最小支撑树里的边
        }
        for (linknode &a : nodes[now].link)
        {
            if (S[a.index] == 0 && lowcost[a.index] > a.weight)
            {
                lowcost[a.index] = a.weight;
                pre[a.index] = now;
                que.push({a.index, a.weight});
            }
        }
    }
    return sumWeight;
}

int main()
{
    freopen("../files/MSTtestdata.in", "r", stdin);
    int v, e;
    cin >> v >> e;
    int a, b, w;
    graph gra(v);
    for (int i = 0; i < e; i++)
    {
        cin >> a >> b >> w;
        gra.addEdge(a, b, w);
    }
    // gra.print();
    cout << gra.Prim_pro(0) << "\n";

    return 0;
}
