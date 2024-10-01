#include <array>
#include <stack>
#include <vector>
#include <iostream>
using namespace std;

class Solution
{
public:
    int findCircleNum(const vector<vector<int>> &isConnected)
    {
        struct union_find
        {
            array<int, 300> father;
            array<int, 300> rank;
            int n;
            // 节点的父亲数组
            union_find(int n)
            {
                fill(father.begin(), father.end(), 0); // 初始化成0
                fill(rank.begin(), rank.end(), 0);     // 初始化成0
                this->n = n;
            }

            void make_set(int x)
            {
                father[x] = 0; // 为x构建一个单节点的树
                rank[x] = 0;
            }

            char find_set(int x)
            {
                char p = x;
                stack<char> sta;
                while (father[p] != 0)
                {
                    sta.push(p);
                    p = father[p];
                }
                while (!sta.empty())
                {
                    father[sta.top()] = p;
                    sta.pop();
                }
                return p;
            }

            void union_set(int x, int y)
            {
                // father[find_set(x)] = find_set(y);
                char fx = find_set(x), fy = find_set(y);
                if (fx == fy)
                {
                    return; // 已经在同一集合了,不合并
                }
                n--;
                if (rank[fx] > rank[fy])
                {
                    father[fy] = fx; // 树高没增加,秩不变
                }
                else
                {
                    father[fx] = fy;
                    if (rank[fx] == rank[fy])
                    {
                        rank[fy]++; // 如果秩相等,那么根的秩加一
                    }
                }
            }
        };
        int n = isConnected.size();
        union_find myset(n);
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (isConnected[i][j] == 1)
                {
                    myset.union_set(i + 1, j + 1);
                }
            }
        }
        return myset.n;
    }
};

int main()
{
    Solution a;
    auto b = vector<vector<int>>({vector<int>({1, 1, 1}), vector<int>({1, 1, 1}), vector<int>({1, 1, 1})});
    cout << a.findCircleNum(b);
    return 0;
}

