# 合并排序

有序数组可以用双指针法快速合并

```c++
void merge(vector<int> &datas, int la, int ra, int lb, int rb, vector<int> &temp) // 归并有序数组
{
    //都是闭区间[la,ra],[lb,rb]
    int index = la;
    int i = la;
    int j = lb;
    while (i <= ra && j <= rb)
    {
        if (datas[i] > datas[j])
        {
            temp[index] = datas[j];
            j++;
            index++;
        }
        else
        {
            temp[index] = datas[i];
            i++;
            index++;
        }
    }

    while (i <= ra)
    {
        temp[index] = datas[i];
        i++;
        index++;
    }
    while (j <= rb)
    {
        temp[index] = datas[j];
        j++;
        index++;
    }
    copy(temp.begin() + la, temp.begin() + index, datas.begin() + la);
}
```

可以直接调用std::merge

```c++
_OutIt merge<_InIt1, _InIt2, _OutIt, _Pr>(_InIt1 _First1, _InIt1 _Last1, _InIt2 _First2, _InIt2 _Last2, _OutIt _Dest, _Pr _Pred)
```

## 归并排序

首先长度为1的数组一定是有序的,那我们将这些两两合并,就得到了长度为2的有序数组,依次递推,可以完成数组排序

### 倍增法实现

从1开始逐倍增加数组长度,每次从头开始两两合并

```c++
void mergeSort(vector<int> &datas)
{
    int n = datas.size();
    vector<int> temp(n, 0);
    for (int lenth = 1; lenth < n; lenth = lenth << 1)
    {
        int step = lenth + lenth;
        for (int i = 0; i < n - lenth; i += step)
        {
            merge(datas, i, i + lenth - 1, i + lenth, min(i + step - 1, n - 1), temp);
        }
    }
}

```

### 分治法实现

运用递归实现:

1. 如果数组长度小于等于1,那么已经有序
2. 否则,把数组分成两部分,分别进行归并排序

代码实现:

```c++
void mergeSortRecursionInner(vector<int> &datas, int l, int r, vector<int> &temp)
{
    // 左闭右开区间[l,r)
    if (r - l <= 1)
    {
        return;
    }

    int mid = (r + l) / 2;
    mergeSortRecursionInner(datas, l, mid, temp);
    mergeSortRecursionInner(datas, mid, r, temp);
    merge(datas.begin() + l, datas.begin() + mid, datas.begin() + mid, datas.begin() + r, temp.begin() + l);//std::merge
    copy(temp.begin() + l, temp.begin() + r, datas.begin() + l);//std::copy
}

void mergeSortRecursion(vector<int> &datas)
{
    int n = datas.size();
    vector<int> temp(n, 0);
    mergeSortRecursionInner(datas, 0, n, temp);
}

```

### 性质

归并排序是稳定的排序,时间复杂度最优,平均和最坏情况均为`O(nlogn)`

空间复杂度为`O(n)`

## tim排序

**tim排序是python中的标准排序算法**

