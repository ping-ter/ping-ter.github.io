#include <iostream>
#include <queue>
#include <vector>
#include <list>

using namespace std;

struct edge
{
    int to;
    int weight;
};

struct node
{
    list<edge> edges;
};

struct graph
{
    node nodes[2048];
    int n;
    graph(int n) : n(n) {}
    void addedge(int start, int end, int weight)
    {
        nodes[start].edges.push_back({end, weight});
    }
    void spfa()
    {
        vector<int> dist(n, 0x3f3f3f3f);
        dist[1] = 0;
        vector<int> cnt(n, 0);
        queue<int> que;
        vector<int> visit(n,0);
        // visit[0] = 1;
        que.push(1);

        while (!que.empty())
        {
            int now = que.front();
            que.pop();
            visit[now] = 0;
            for (edge e : nodes[now].edges)
            {
                int end = e.to;
                if (dist[end] > dist[now] + e.weight)
                {
                    dist[end] = dist[now] + e.weight;
                    
                    // cnt[end]++; // 这样判断存在bug
                    cnt[end] = cnt[now] + 1; // 最短路径长度
                    if (cnt[end] > n)
                    {
                        cout << "YES" << "\n";
                        return;
                    }
                    if (!visit[end])
                    {
                        que.push(end);
                        visit[end] = 1;
                    }
                }
            }
        }
        cout << "NO" << "\n";
    }
};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int t;
    cin >> t;
    for (int p = 0; p < t; p++)
    {
        int n, m;
        cin >> n >> m;
        graph gra(n + 1);
        int u, v, w;
        for (int i = 0; i < m; i++)
        {
            cin >> u >> v >> w;

            gra.addedge(u, v, w);
            if (w >= 0)
            {
                gra.addedge(v, u, w);
            }
        }

        // 去掉超级源点
        // for (int i = 1; i <= n; i++)
        // {
        //     gra.addedge(0, i, 0);
        // }
        gra.spfa();
    }

    return 0;
}