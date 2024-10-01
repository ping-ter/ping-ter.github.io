#include <iostream>
#include <queue>
// #include <list>
#include <list>
#include <vector>

using namespace std;

struct edge
{
    /* data */
    int weight;
    int other;
};

struct node
{
    /* data */
    list<edge> edges;
};

struct graph
{
    /* data */
    node nodes[5010];
    int n;
    graph(int n) : n(n) {}
    void addEdge(int start, int other, int weight)
    {
        // nodes[start].edges.
        nodes[start].edges.push_back({weight, other});
    }

    void test()
    {
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF);
        dist[0] = 0;
        // vector<int> quecount(n, 0);
        queue<int> que;
        vector<int> visited(n, 0);
        que.push(0);
        vector<int> count(n, 0);

        while (!que.empty())
        {
            int now = que.front();
            que.pop();
            visited[now] = 0;
            for (edge &nowegde : nodes[now].edges)
            {
                int other = nowegde.other;
                if (dist[other] > dist[now] + nowegde.weight)
                {

                    dist[other] = dist[now] + nowegde.weight;
                    if (!visited[other])
                    {
                        que.push(other);
                        visited[other] = 1;
                        count[other]++;
                        if (count[other] >= n)
                        {
                            cout << "No";
                            return;
                        }
                    }
                }
            }
        }
        cout << "Yes";
    }
};

int main()
{
    int n, m;
    cin >> n >> m;
    graph gra(n + 1);
    int op, a, b, d;

    for (int i = 0; i < m; i++)
    {
        cin >> op;
        if (op == 1)
        {
            // a - b >= c
            //  b - a <= -c
            cin >> a >> b >> d;
            gra.addEdge(a, b, -d);
        }
        else if (op == 2)
        {
            // a - b <= c
            cin >> a >> b >> d;
            gra.addEdge(b, a, d);
        }
        else
        {
            cin >> a >> b;
            gra.addEdge(b, a, 0);
            gra.addEdge(a, b, 0);
        }
    }
    // 添加一个额外点,到所有点边权为0,防止不图不连通
    for (int i = 0; i < n; i++)
    {
        gra.addEdge(0, i + 1, 0);
    }

    gra.test();
    return 0;
}
