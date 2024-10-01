# 并查集

## 概念

<span v-pre>`不相交集`:交集是空集的集合,如{2,3,4}和{1,5}</span>

并查集主要解决不相交集的问题

- 并,实现合并两个不相交集的操作
- 查,查询某个元素在哪个集合中
  
一般选择集合中的一个元素表示这个集合,作为`代表元`

## 操作

- `make_set(x)`,创建一个集合,该集合有一个元素x
- `union_set(x, y)`,合并两个元素所在的集合
- `find_set(x)`,找到元素所在的代表元

## 实现

并查集可以基于`森林`来实现,其中,树可以作为一个集合,树的根可以视为集合的代表元

在并查集的操作中,只需要知道某个节点的父亲即可,

### 存储结构

```c++
struct union_find
{
    array<int, 256> father;
    // 节点的父亲数组
    union_find()
    {
        fill(father.begin(), father.end(), 0); // 初始化成0
    }
    void make_set(char x);
    void union_set(char x, char y);
    char find_set(char x);
};
```

### 创建集合

```c++

void union_find::make_set(char x)
{
    father[x] = 0; // 为x构建一个单节点的树
}

```

### 查询元素所在集合

```c++
char union_find::find_set(char x)
{
    char p = x;
    while (father[p] != 0)
    {
        p = father[p];
    }
    return p;
}
```

### 合并集合

#### 直接合并

```c++
void union_find::union_set(char x, char y)
{
    father[find_set(x)] = find_set(y);
}
```

这种合并方式最坏的情况树会退化成一条直线,不利于查询操作

## 优化

### 路径压缩

在`find`操作时,找到**x**的根**fx**后,将沿途的元素的father都改成根

```c++
char union_find::find_set(char x)
{
    char p = x;
    stack<char> sta;
    while (father[p] != 0)
    {
        sta.push(p);
        p = father[p];
    }
    while(!sta.empty())
    {
        father[sta.top()] = p;
        sta.pop();
    }
    return p;
}
```

压缩前:

    1 in a  father: a
    a in a  father:
    b in x  father: p
    e in x  father: x
    x in x  father:
    p in x  father: x

压缩后

    1 in a  father: a
    a in a  father:
    b in x  father: x
    e in x  father: x
    x in x  father:
    p in x  father: x


### 合并策略

合并时,由矮树向高树合并可以缩短节点寻找根的路径

但是,uion时可以更新树的高度,而find路径压缩时不方便,难以实时更新

所以这里采用按`秩`合并,用**秩大**的节点作为**秩小**的节点的父亲

其中:
- 树高增加时(union操作),秩增加
- 树高减少时(find操作),秩不变
  
代码如下

```c++
void union_find::union_set(char x, char y)
{
    // father[find_set(x)] = find_set(y);
    char fx = find_set(x), fy = find_set(y);
    if (fx == fy)
    {
        return; // 已经在同一集合了,不合并
    }
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
```

## 复杂度分析



- 单独使用**路径压缩**或者**按秩合并**,Union和Find操作均摊下来的时间复杂度为`O(log n)`
- 同时**路径压缩**或者**按秩合并**两种优化策略,每个操作的均摊时间复杂度接近`O(1)`
