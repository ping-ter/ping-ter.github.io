# 最小支撑树(MST)

## 概念

### 支撑树

对于n个顶点的无向连通权图,G,由G的n个顶点和n-1条边构成的连通子图,成为G的一棵**支撑树**,也叫**生成树**

其中,边权之和最小的支撑树成为**最小支撑树**

### 跨集合边

G = (V,E)是一个连通图,S是V的一个非空子集,如果边(u,v)满足`u in S`, `v in V - S`,那么边(u,v)为**跨集合边**

其中权值最小的跨集合边称为**最小跨边**

    最小跨边一定在某棵最小支撑树里

## 算法

### Prim算法(逐点加入)

算法如下:

1. 从V中选择一个点为起点,放入S中
2. 找最小跨集合边(u,v),其中,u in `S`,v in `V - S`,将这条边加入最小支撑树中,并将v放入S
3. 重复2操作,直到S = V

算法的主要问题在于找最小跨集合边,可以采用类似Dijkstra算法的方法,每次扩充时更新最小距离

    Lowcost[v]:顶点v到S的最小权值,即其到集合S的最短距离
    S[v]:v是否在集合S中
    pre[v]:含v的最小跨边中,在S里的那个端点

代码如下:

```c++
int graph::MST(int start)
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
```

测试:

```
in:
5 8
0 1 8
0 4 5
1 4 7
1 3 6
1 2 3
2 4 1
2 3 9
3 4 2

out:
0-4
4-2
4-3
2-1
11
```
### Prim算法优化

类似Dijkstra算法,可以用堆优化

利用小根堆,一开始,将起点入堆,然后更新距离时将被更新的点入堆

```c++
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
        bool operator()(const pair<int, int>& a, const pair<int, int>& b)
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
```

### Kruskal算法(逐边加入)

与Prim不同,Kruskal算法选择将最短的边逐条加入

算法思路如下:

1. 初始时有图G(v,e),T包含G中的所有点和0条边
2. 从G中选择权值最小的边,从G中删去这条边
3. 如果这条边加入T后不会在T中产生环,而是会使T的连通分量减1,则将这条边加入T中;否则这步无操作
4. 重复2,3,直到T中只剩一个连通分量

算法实现:

**存图**: 用边集数组储存图中的边信息
**选边**: 可以对所有的边进行排序
**判环**: 可以借助并查集,把连通的点之间视为在同一个集合

代码如下:

```c++
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
```

### 算法分析

Prim的时间复杂度是`O(n^2)`,适用于`稠密图`(边多)

Kruskal的时间复杂度是`O(nlogn)`,适用于`稀疏图`(边少)

