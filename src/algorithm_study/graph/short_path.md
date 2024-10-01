# 图最短路

## 无权图

无权图的路径长度完全取决于路径上的节点数量

### 基于BFS的无权图最短路径算法

#### 算法思想

从源点出发,按照广度优先搜索,可以遍历所有距离为1的点,然后再从这些点遍历到所有距离为2的点,并且对于最短路径(a,b,c,d,e,f),f到d,d到a一定都是最短路.

于是我们可以通过广度优先遍历,求得源点到其它所有点的最短路

我们对下面这张图进行BFS

![](files/noweight.jpg)

首先从A开始,得到B,C,D的最短路都是1,路径为A->B,A->C,A->D,然后我们继续遍历,得到B->E,D->F也为1,所以我们得到了E的最短路,A->D->F,路径长度为2

#### 算法实现

+ 首先初始化两个辅助数组,path和dist,其中,path[i]表示i点在最短路径中的上一个顶点,-1表示无上一顶点,初始化为-1;dist[i]表示到i的最短距离,源点初始化为0,其余节点初始化为无穷大(一般用int的limit或者0x3f3f3f3f)
+ 从源点开始进行BFS,将邻接的节点path改为当前节点,dist为当前节点的最短距离加一

```c++
void graph::shortPath(int index)
    {
        int n = nodes.size();
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF); // 最短路径长
        vector<int> path(n, -1);  // 最短路径中的上一节点
        dist[index] = 0;
        queue<int> que; // 辅助队列

        que.push(index);
        while (!que.empty())
        {
            int now = que.front();
            que.pop();
            for_each(nodes[now].link.begin(), nodes[now].link.end(), [&](const linknode &a)
                     {
                if(dist[a.index] == INF)//确保未被访问过
                {
                    path[a.index] = now;
                    dist[a.index] = dist[now] + 1;
                    que.push(a.index);
                } });
        }

        for_each(nodes.begin(), nodes.end(), [](const node &a)
                 { cout << a.data << " "; });
        cout << endl;
        for_each(dist.begin(), dist.end(), [](int a)
                 { cout << a << " "; });
        cout << endl;
        for_each(path.begin(), path.end(), [&](int a)
                 { cout << nodes[a].data << " "; });
        cout << endl;
    }

```

运行结果:

    A B C D E F G H I
    1 2 1 0 2 1 3 2 4
    D A D   C D E F G

## 正权图

### Dijkstra算法

#### 算法思想

与BFS相同,运用了一个定理

    对于ab间的最短路径,路径上的任意两点v1 v2之间一定也是最短距离

在Dijkstra算法中

1. 首先把源点u放入集合S,记录Di记录源点u到顶点i的最短距离,初始时令Di = INF,Du = 0
2. 从集合`V-S`中挑选一个点v,并且S中一个点s,使得`weight(v,s) + Ds`最短,`Dv = weight(v,s) + Ds`
3. 挑选后,对于`V - S`中的各个顶点i,如果`weight(v,i) + Dv < Di`,则更新Di,`Di = weight(v,i) + Dv`
4. 重复2,3操作,直到`S = V`

#### 算法实现

需要引入3个辅助数组:

1. dist[],记录源点到各点的最短距离,源点初始为0,其余各点初始为INF
2. pre[],记录最短距离中当前顶点的上一个点,初始为-1
3. S[],记录当前顶点是否在S中


代码如下:

```c++
    void graph::Dijkstra(int index)
    {
        int n = nodes.size();
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF);
        vector<int> pre(n, -1);
        vector<int> S(n, 0);
        dist[index] = 0;

        auto findMin = [&]() -> int
        {
            int min_index = -1;
            int min = INF;
            for (int i = 0; i < n; i++)
            {
                if (S[i] == 0 && dist[i] < min)
                {
                    min_index = i;
                    min = dist[i];
                }
            }
            return min_index;
        };

        for (int i = 0; i < n; i++)
        {
            int now = findMin();
            if (now == -1)
            {
                return; // 图不连通,剩下的点源点都不可及,结束算法
            }
            S[now] = 1;
            for_each(nodes[now].link.begin(), nodes[now].link.end(), [&](linknode &a)
                     {
                if(S[a.index] == 0 && dist[now] + a.weight < dist[a.index])
                {
                    dist[a.index] = dist[now] + a.weight;
                    pre[a.index] = now;
                } }); // 只需要更新邻接的点
        }
    }
```

算法执行结果:

|index|0|1|2|3|4|
|:---:|:---:|:---:|:---:|:---:|:---:|
|pre|-1|0|-1|-1|0|
|dist|0|3|INF|INF|30|
|S|1|0|0|0|0|

|index|0|1|2|3|4|
|:---:|:---:|:---:|:---:|:---:|:---:|
|pre|-1|0|1|1|0|
|dist|0|3|28|11|30|
|S|1|1|0|0|0|

|index|0|1|2|3|4|
|:---:|:---:|:---:|:---:|:---:|:---:|
|pre|-1|0|3|1|3|
|dist|0|3|15|11|23|
|S|1|1|0|1|0|

|index|0|1|2|3|4|
|:---:|:---:|:---:|:---:|:---:|:---:|
|pre|-1|0|3|1|3|
|dist|0|3|15|11|23|
|S|1|1|1|1|0|

|index|0|1|2|3|4|
|:---:|:---:|:---:|:---:|:---:|:---:|
|pre|-1|0|3|1|3|
|dist|0|3|15|11|23|
|S|1|1|1|1|1|

成功找出了源点到各点的最短路径

#### 算法优化

可以用优先队列来优化

对于findMin函数,可以用堆来代替,堆中储存点和其最小权值

1. 开始时将{起点,0}和入堆
2. 每次循环时将堆顶元素出堆,进行操作(代替findMin)
3. 更新权值后,将{更新点,新权值}入堆

这里需要用到优先队列,优先队列可以自定义比较函数,这里用仿函数填模版:

```c++
struct Compare
{//仿函数,定义比较方式
    bool operator()(const pair<int, int> &a, const pair<int, int> &b)
    {
        return a.second > b.second;
    }
};
priority_queue<pair<int, int>, vector<pair<int, int>>, Compare> que;
```

代码实现:

```c++
    void graph::Dijkstra_pro(int index)
    {
        int n = nodes.size();
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF);
        vector<int> pre(n, -1);
        vector<int> S(n, 0);
        dist[index] = 0;

        typedef pair<int, int> vw; // 点和权值
        struct Compare
        {
            bool operator()(const vw &a, const vw &b)
            {
                return a.second > b.second;
            }
        };
        priority_queue<vw, vector<vw>, Compare> que;
        que.push({index, 0});

        while (!que.empty())
        {
            vw now_vw = que.top();
            que.pop();
            int now = now_vw.first;
            if (S[now] == 1)
            {
                continue; // 已经加入S了
            }
            if (now_vw.second == INF)
            {
                break; // 图不连通,剩下的点源点都不可及,结束算法
            }
            S[now] = 1;
            for_each(nodes[now].link.begin(), nodes[now].link.end(), [&](linknode &a)
                     {
                if(S[a.index] == 0 && dist[now] + a.weight < dist[a.index])
                {
                    dist[a.index] = dist[now] + a.weight;
                    pre[a.index] = now;
                    que.push({a.index,dist[a.index]}); // 入堆
                } });
        }
    }
```

用斐波纳契堆优化效果最佳,但不易实现


#### 求所有最短路径

最短路径未必只有一条,有时需要求出所有的最短路径

无论如何,之前的定理依然适用

    对于ab间的最短路径,路径上的任意两点v1 v2间一定也是最短距离

因此,可以把pre改成表,更新路径时,如果得到最短距离与已知的相等,可以将新的路径添加到pre

代码如下:

```c++
    void graph::Dijkstra_many(int start)
    {
        int n = nodes.size();
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF);
        vector<list<int>> pre(n); // 储存前置节点
        vector<int> S(n, 0);
        dist[start] = 0;

        typedef pair<int, int> vw; // 点和权值
        struct Compare
        {
            bool operator()(const vw &a, const vw &b)
            {
                return a.second > b.second;
            }
        };
        priority_queue<vw, vector<vw>, Compare> que;
        que.push({start, 0});

        while (!que.empty())
        {
            vw now_vw = que.top();
            que.pop();
            int now = now_vw.first;
            if (S[now] == 1)
            {
                continue; // 已经加入S了
            }
            if (now_vw.second == INF)
            {
                break; // 图不连通,剩下的点源点都不可及,结束算法
            }
            S[now] = 1;
            for_each(nodes[now].link.begin(), nodes[now].link.end(), [&](linknode &a)
                     {
                if(S[a.index] == 0 && dist[now] + a.weight < dist[a.index])
                {
                    dist[a.index] = dist[now] + a.weight;
                    pre[a.index].clear();
                    pre[a.index].push_back(now);
                    que.push({a.index,dist[a.index]}); // 入堆
                }
                else if(dist[now] + a.weight == dist[a.index])
                {
                    pre[a.index].push_back(now);
                } });
        }

        for (int i = 0; i < n; i++)
        {
            cout << i << ": ";
            for (int p : pre[i])
            {
                cout << p << " ";
            }
            cout << endl;
        }
    }
```


## 权图

### Bellman Ford算法

Bellman Ford算法的主要思路是不断迭代, 先找1条边的最短路,再找2条边的最短路...依次类推

主要过程:

1. 对各个点进行松弛操作,松弛操作与Dijkstra相同
2. 重复1的操作,直到一次循环中没成功进行的任何松弛操作

实现:

```c++
void graph::BellmanFord(int start)
{
    int n = nodes.size();
    const int INF = 0x3f3f3f3f;
    vector<int> dist(n, INF);
    vector<int> pre(n, -1);
    dist[start] = 0;
    int flag = 1;
    int maxtimes = n; // 最大次数
    for (int i = 0; i < maxtimes && flag == 1; i++)
    {
        flag = 0;
        for (int now = 0; now < n; now++)
        {
            for (linknode &edge : nodes[now].link)
            {
                if (dist[now] + edge.weight < dist[edge.index])
                {
                    dist[edge.index] = dist[now] + edge.weight;
                    flag = 1;
                    pre[edge.index] = now;
                }
            }
        }
    }

    for (int i = 0; i < n; i++)
    {
        stack<int> path;
        int p = i;
        while (p != -1)
        {
            path.push(p);
            p = pre[p];
        }

        while (!path.empty())
        {
            cout << path.top() << "->";
            path.pop();
        }
        cout << endl;
    }
}
```

### SPFA 算法

SPFA算法是对Bellman Ford的优化,使用优先队列,只对进行过松弛操作的点再进行松弛操作

算法流程:

1. 将起点入队
2. 取队首的点,进行松弛操作,成功进行松弛操作时,将点加入到队列
3. 重复2,直到队空

算法实现:

```c++
    void graph::SPFA(int start)
    {

        int n = nodes.size();
        const int INF = 0x3f3f3f3f;
        queue<int> que;
        vector<int> dist(n, INF);
        vector<int> pre(n, -1);
        dist[start] = 0;
        que.push(start);
        int maxtimes = INF; // 最大次数
        for (int i = 0; i < maxtimes && !que.empty(); i++)
        {
            int now = que.front();
            que.pop();
            for (linknode &edge : nodes[now].link)
            {
                if (dist[now] + edge.weight < dist[edge.index])
                {
                    dist[edge.index] = dist[now] + edge.weight;
                    pre[edge.index] = now;
                    que.push(edge.index);
                }
            }
        }

        for (int i = 0; i < n; i++)
        {
            stack<int> path;
            int p = i;
            while (p != -1)
            {
                path.push(p);
                p = pre[p];
            }

            while (!path.empty())
            {
                cout << path.top() << "->";
                path.pop();
            }
            cout << endl;
        }
    }
```




## 算法选择

一般情况下,无负权边选择Dijkstra,有负权选择sfpa