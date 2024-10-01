# 交换排序

## 冒泡排序

冒泡排序即遍历时将相邻两个顺序不对的元素交换,达到排序目的

```c++
void bubbleSort(vector<int> &datas)
{
    int n = datas.size();
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - 1 - i; j++)
        {
            if (datas[j] > datas[j + 1])
            {
                int temp = datas[j + 1];
                datas[j + 1] = datas[j];
                datas[j] = temp;
            }
        }
    }
}
```

## 快速排序

### 实现

快速排序运用了分治的思想

算法过程如下:

1. 从待排序序列中选取一个基准值
2. 把大于基准值的放到后面,小于基准值的放在前面
3. 对这两部分分别进行1和2

其中,2过程的实现方法一般是(以第一个元素为基准值):

1. 初始化指针i和j分别指向数组两端
2. 从j开始寻找小于基准值的元素,找到后放到i位置,然后令i++
3. 这时再从i开始寻找小于基准值的元素,放到j位置,j--
4. 重复2,3过程,2或3执行后如果`i == j`, 结束

代码实现:

```c++
void quickSortInner(vector<int> &datas, int left, int right)
{
    if (right <= left)
    {
        return;
    }
    int mid = datas[left];
    int i = left;
    int j = right;

    while (i < j)
    {
        while (datas[j] >= mid && j > i)
        {
            j--;
        }
        datas[i] = datas[j];
        while (datas[i] <= mid && j > i)
        {
            i++;
        }
        datas[j] = datas[i];
    }

    datas[i] = mid;
    quickSortInner(datas, left, i - 1);
    quickSortInner(datas, i + 1, right);
}

void quickSort(vector<int> &datas)
{
    quickSortInner(datas, 0, datas.size() - 1);
}

```

### 性质

快速排序是不稳定的算法

快速排序最优和平均时间复杂度为`O(nlogn)`,最坏情况时间复杂度为`O(n^2)`

### 优化

基本思路:

+ 序列较短时,采用插入排序
+ 选定基准值时避免极端情况,防止取到最大或者最小的数为基准数,方法如随机取数或是三数取中,取第一个,最后一个和中间元素的中位数
+ 把与基准值相等聚集在一起,避免重复排序

### 三路快速排序

三路快速排序是一种优化方案.它在分治时将序列分成3个部分,小于基准值,等于基准值,大于基准值

基本思路如下:

首先选定一个基准值mid(随机取数),初始令lt,gt指向两端,然后i指向遍历到的位置,然后从左到右遍历:

1. 如果`i < mid`,则令i和lt位置数字交换,然后lt++,i++
2. 如果`i > mid`,令i和gt位置数字交换,然后gt--,i不变
3. 如果`i == mid`,i++

最后遍历完得到的序列分成3个部分,小于基准值,等于基准值,大于基准值
然后对小于和大于的这两部分分别再三路快速排序就可以了

代码实现:

```c++

void insertSort(vector<int> &datas, int l, int r)
{
    for (int i = l + 1; i <= r; i++)
    {
        int temp = datas[i];
        int j = i - 1;
        while (j >= l && datas[j] > temp) // 要先判断j是否越界,否则datas[j抛出异常]
        {
            datas[j + 1] = datas[j];
            j--;
        }
        datas[j + 1] = temp;
    }
}

void quickSortThreeWaysInner(vector<int> &datas, int l, int r)
{
    if (r - l < 15)
    {
        insertSort(datas, l, r);
        return;
    }

    int mid = datas[rand() % (r - l + 1) + l];
    int i = l;
    int lt = l;
    int gt = r;
    while (i <= gt)
    {
        if (datas[i] < mid)
        {
            swap(datas[i], datas[lt]);
            i++;
            lt++;
        }
        else if (datas[i] == mid)
        {
            i++;
        }
        else
        {
            swap(datas[i], datas[gt]);
            gt--;
        }
    }
    quickSortThreeWaysInner(datas, l, lt - 1);
    quickSortThreeWaysInner(datas, gt + 1, r);
}

void quickSortThreeWays(vector<int> &datas)
{
    srand(1234);
    quickSortThreeWaysInner(datas, 0, datas.size() - 1);
}

```

### 内省排序

当递归深度过高,而序列仍比较长时,快速排序会退化到`O(n^2)`

而内省排序限制了递归深度,用堆排序优化快排

+ 如果长度小一定值,则对序列进行`插入排序`
+ 如果递归深度超过`log n`(向下取整),对序列进行`堆排序`

std::sort就是采用内省排序实现的

stl源码如下:

```c++
template <class _RanIt, class _Pr>
_CONSTEXPR20 void _Sort_unchecked(_RanIt _First, _RanIt _Last, _Iter_diff_t<_RanIt> _Ideal, _Pr _Pred) {
    // order [_First, _Last)
    for (;;) {
        if (_Last - _First <= _ISORT_MAX) { // small
            _Insertion_sort_unchecked(_First, _Last, _Pred);
            return;
        }
        // 对较短的序列采用插入排序

        if (_Ideal <= 0) { // heap sort if too many divisions
            _Make_heap_unchecked(_First, _Last, _Pred);
            _Sort_heap_unchecked(_First, _Last, _Pred);
            return;
        }

        // 递归深度较高时采用堆排序

        // divide and conquer by quicksort
        auto _Mid = _Partition_by_median_guess_unchecked(_First, _Last, _Pred);

        _Ideal = (_Ideal >> 1) + (_Ideal >> 2); // allow 1.5 log2(N) divisions
        // 限制在 1.5log2(N)
        if (_Mid.first - _First < _Last - _Mid.second) { // loop on second half
            _Sort_unchecked(_First, _Mid.first, _Ideal, _Pred);
            _First = _Mid.second;
        } else { // loop on first half
            _Sort_unchecked(_Mid.second, _Last, _Ideal, _Pred);
            _Last = _Mid.first;
        }
    }
}
```

自己实现的内省排序:

```c++
void heapfy(vector<int> &datas, int l, int r, int root)
{
    int child = l + (root - l) * 2 + 1;
    while (child <= r)
    {
        if (child + 1 <= r && datas[child + 1] > datas[child])
        {
            child++;
        }

        if (datas[child] <= datas[root])
        {
            return;
        }

        swap(datas[child], datas[root]);
        root = child;
        int child = l + (root - l) * 2 + 1;
    }
}

void heapSort(vector<int> &datas, int l, int r)
{
    for (int i = r; i >= l; i--)
    {
        heapfy(datas, l, r, i);
    }

    for (int i = r; i >= l; i--)
    {
        swap(datas[l], datas[i]);
        heapfy(datas, l, r, 0);
    }
}
void introSortInner(vector<int> &datas, int l, int r, int Ideal)
{
    if (r - l < 15)
    {
        insertSort(datas, l, r);
        return;
    }

    if (Ideal <= 0)
    {
        heapSort(datas, l, r);
    }
    int mid = datas[rand() % (r - l + 1) + l];
    int i = l;
    int lt = l;
    int gt = r;
    Ideal = (Ideal >> 1) + (Ideal >> 2); // 限制递归深度

    while (i <= gt)
    {
        if (datas[i] < mid)
        {
            swap(datas[i], datas[lt]);
            i++;
            lt++;
        }
        else if (datas[i] == mid)
        {
            i++;
        }
        else
        {
            swap(datas[i], datas[gt]);
            gt--;
        }
    }
    introSortInner(datas, l, lt - 1, Ideal);
    introSortInner(datas, gt + 1, r, Ideal);
}

void introSort(vector<int> &datas)
{
    introSortInner(datas, 0, datas.size() - 1, datas.size());
}

```