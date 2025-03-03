#include <bits/stdc++.h>
#define ll long long
#define debug(x) #x << ": " << x << " "
#define local
using namespace std;

struct edge
{
    int weight;
    int next;
};

struct node
{
    int t;
    list<edge> edges;
};

node nodes[256];
int dist[204][204][204]; // 时间-最短路径表（最多N个时间点）
int S[204];
int ts[204];
int inf = 0x3f3f3f3f;
int N, M;

struct compare_edge
{
    bool operator()(const edge &a, const edge &b)
    {
        return a.weight > b.weight;
    }
};

void dijkstra(int t_index, int st)
{
    auto &dist_ = dist[t_index][st];
    int now_t = ts[t_index];
    memset(dist_, inf, sizeof(int) * N);
    memset(S, 0, sizeof(int) * N);
    dist_[st] = 0;
    priority_queue<edge, vector<edge>, compare_edge> pq;
    pq.push({0, st});

    while (!pq.empty())
    {
        int nownode = pq.top().next;
        pq.pop();
        if (S[nownode] == 1)
        {
            continue;
        }
        S[nownode] = 1;
        for (edge &e : nodes[nownode].edges)
        {
            if (now_t >= nodes[e.next].t && S[e.next] == 0 && dist_[e.next] > dist_[nownode] + e.weight)
            {
                dist_[e.next] = dist_[nownode] + e.weight;
                pq.push({dist_[e.next], e.next});
            }
        }
    }
}

void upgrade(int t_index, int st)
{
    // 更新，添加新的村庄
    // 前面先调用dijkstra找到st到各点最短路
    auto &dist_d = dist[t_index];
    // int now_t = ts[t_index];
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < i; j++)
        {
            if (dist_d[i][j] > dist_d[st][i] + dist_d[st][j])
            {
                dist_d[i][j] = dist_d[st][i] + dist_d[st][j];
                dist_d[j][i] = dist_d[i][j];
            }
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    memset(ts, 0x3f3f3f3f, sizeof(int) * 200);
#ifdef local
    freopen("../point/P1119_2.in", "r", stdin);
    freopen("../point/P1119_local_out.txt", "w", stdout);
#endif

    // string s;
    // cin >> s;
    // cout << s;
    // cout << (ll)file;
    // return 0;
    ts[0] = 0;

    cin >> N >> M;
    int cnt_t = 0;
    for (int i = 0; i < N; i++)
    {
        cin >> nodes[i].t;
        if (nodes[i].t > ts[cnt_t])
        {
            cnt_t++;
            ts[cnt_t] = nodes[i].t;
        }
    }
    int x, y, w;
    // 建图
    for (int i = 0; i < M; i++)
    {
        cin >> x >> y >> w;
        nodes[x].edges.push_back({w, y});
        nodes[y].edges.push_back({w, x});
    }
    // 寻路
    // t=0时，先全都过一遍
    for (int i = 0; i < N; i++)
    {
        dijkstra(0, i);
    }
    // for (int i = 0; i < N; i++)
    // {
    //     cout << debug(dist[0][0][i]);
    // }
    // 更新
    for (int t = 1; t <= cnt_t; t++)
    {
        int now_t = ts[t];
        memcpy(dist[t], dist[t - 1], sizeof(int) * 204 * 204);

        for (int i = 0; i < N; i++)
        {
            if (nodes[i].t <= now_t && nodes[i].t > ts[t - 1])
            {
                dijkstra(t, i);
                upgrade(t, i);
            }
        }
    }

    int Q, qt;
    cin >> Q;
    for (int i = 0; i < Q; i++)
    {
        cin >> x >> y >> qt;
        int t = 1;
        while (ts[t] <= qt)
        {
            t++;
        }
        t -= 1;
        // cout << debug(t) << debug(qt) << debug(ts[t]);
        if (dist[t][x][y] == 0x3f3f3f3f)
        {
            cout << -1 << "\n";
        }
        else
        {
            cout << dist[t][x][y] << "\n";
        }
    }

    return 0;
}

/*
4 5
0 0 0 0
0 2 1
2 3 1
3 1 2
2 1 4
0 3 5
*/