# 差分约束

## 定义

**差分约束系统** 是一种特殊的 $n$ 元一次不等式组，它包含 $n$ 个变量 $x_1,x_2,\dots,x_n$ 以及 $m$ 个约束条件，每个约束条件是由两个其中的变量做差构成的，形如 $x_i-x_j\leq c_k$，其中 $1 \leq i, j \leq n, i \neq j, 1 \leq k \leq m$ 并且 $c_k$ 是常数（可以是非负数，也可以是负数）。我们要解决的问题是：求一组解 $x_1=a_1,x_2=a_2,\dots,x_n=a_n$，使得所有的约束条件得到满足，否则判断出无解。

差分约束系统中的每个约束条件 $x_i-x_j\leq c_k$ 都可以变形成 $x_i\leq x_j+c_k$，这与单源最短路中的三角形不等式 $dist[y]\leq dist[x]+z$ 非常相似。因此，我们可以把每个变量 $x_i$ 看做图中的一个结点，对于每个约束条件 $x_i-x_j\leq c_k$，从结点 $j$ 向结点 $i$ 连一条长度为 $c_k$ 的有向边。

注意到，如果 $\{a_1,a_2,\dots,a_n\}$ 是该差分约束系统的一组解，那么对于任意的常数 $d$，$\{a_1+d,a_2+d,\dots,a_n+d\}$ 显然也是该差分约束系统的一组解，因为这样做差后 $d$ 刚好被消掉。

## 过程

设 $dist[0]=0$ 并向每一个点连一条权重为 $0$ 边，跑单源最短路，若图中存在负环，则给定的差分约束系统无解，否则，$x_i=dist[i]$ 为该差分约束系统的一组解。

## 具体实现

图判断负环,可以使用`SPFA`算法, 根据入队次数判断,如果入队次数超过n次(n为点数),则存在负权环

::: tip
注意,需要添加一个额外点,到所有点边权为0,防止不图不连通
:::

关于判负环的细则,有洛谷大佬详解

[题解 P3385 【【模板】负环】](https://www.luogu.com.cn/article/k2scg910)

简单总结要点:

+ 不能按松弛次数判断,而是按入队次数
+ 按入队次数可能存在爆int的情况

最高效的方式是判断最短路的长度,因为如果存在负环,那么负环一定会出现在最短路上,所以判断最短路是否超过n即可

::: details 模版
```c++
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
```
:::
[SPFA](./short_path#spfa-算法)

参考题:

+ [洛谷 P3385 【【模板】负环】](../../exercise/luogu/P3385.md)
+ [洛谷 P1993 小 K 的农场](../../exercise/luogu/P1993/)
