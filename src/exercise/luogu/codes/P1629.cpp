#include <iostream>
#include <list>
#include <queue>
#include <string.h>
#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

struct edge
{
    int next;
    int weight;
};

struct node
{
    list<edge> edges;
};

node nodes[1024];
int dist_[1024][1024];
int S[1024];

class Less
{
public:
    bool operator()(const edge &a, const edge &b)
    {
        return a.weight > b.weight;
    }
};
int main()
{
    // cout << "asdas";
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int n, m;
    cin >> n >> m;

    int u, v, w;
    for (int i = 0; i < m; i++)
    {
        cin >> u >> v >> w;
        nodes[u].edges.push_back({v, w});
    }

    // int path[1024];

    const int inf = 0x3f3f3f3f;

    for (int p = 1; p <= n; p++)
    {
        auto &dist = dist_[p];
        memset(dist, inf, 1024 * sizeof(int));
        memset(S, 0, 1024 * sizeof(int));
        // S[p] = 1;
        dist[p] = 0;
        priority_queue<edge, vector<edge>, Less> pq;
        pq.push({p, 0});
        for (int i = 0; i < n; i++)
        {
            int now = -1;
            while (!pq.empty())
            {
                int tmp = pq.top().next;
                pq.pop();
                if (S[tmp] == 0)
                {
                    now = tmp;
                    break;
                }
            }
            if (now == -1)
            {
                break;
            }
            // int now = 0;

            // for (int j = 1; j <= n; j++)
            // {
            //     // cout << debug(S[j]) << debug(dist[now]) << debug(dist[j]) << "\n";
            //     if (S[j] == 0 && dist[now] > dist[j])
            //     {

            //         now = j;
            //     }
            // }
            // if (now == 0)
            // {
            //     break;
            // }
            // cout << "daedqed";

            S[now] = 1;

            for (edge edge_ : nodes[now].edges)
            {
                int othernode = edge_.next;
                if (S[othernode] == 0 && dist[othernode] > dist[now] + edge_.weight)
                {
                    dist[othernode] = dist[now] + edge_.weight;
                    pq.push({othernode, dist[othernode]});
                }
            }
        }
        // for (int t = 1; t <= n; t++)
        // {
        //     cout << p << "->" << t << ": " << dist[t] << " ";
        // }
        // cout << endl;
    }

    int sumpath = 0;
    for (int i = 2; i <= n; i++)
    {
        sumpath += dist_[1][i] + dist_[i][1];
    }

    cout << sumpath;

    return 0;
}
