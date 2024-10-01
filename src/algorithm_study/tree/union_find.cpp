#include <iostream>
#include <vector>
#include <string>
#include <stack>
using namespace std;
struct union_find
{
    vector<int> father;
    vector<int> rank;
    int sets_count;
    // 节点的父亲数组
    union_find(int size)
        : father(size, 0), rank(size, 0), sets_count(size) {}
    void make_set(int x);
    void union_set(int x, int y);
    int find_set(int x);
};

void union_find::make_set(int x)
{
    father[x] = 0; // 为x构建一个单节点的树
    rank[x] = 0;
}

int union_find::find_set(int x)
{
    int p = x;
    stack<int> sta;
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

void union_find::union_set(int x, int y)
{
    // father[find_set(x)] = find_set(y);
    char fx = find_set(x), fy = find_set(y);
    if (fx == fy)
    {
        return; // 已经在同一集合了,不合并
    }
    sets_count--;
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

/*
int main()
{
    union_find aset;
    string str = "1abexp";
    for (char i : str)
    {
        aset.make_set(i);
    }

    aset.union_set('1', 'a');
    aset.union_set('e', 'x');
    aset.union_set('b', 'p');
    aset.union_set('p', 'x');

    for (char i : str)
    {
        cout << i << " in " << aset.find_set(i) << "  father: " << aset.father[i] << endl;
    }
    return 0;
}
*/