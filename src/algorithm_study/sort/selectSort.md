# 选择排序

简单排序的思想是从序列中挑选元素,放到它应该在的位置

## 简单选择排序

简单选择排序即每次从未排序序列中选择一个最小的元素,放入有序序列的末尾,最终使得整个序列变成有序序列

算法实现很简单:

```c++
void selectSort(vector<int> &datas)
{
    int n = datas.size();
    for (int i = 0; i < n - 1; i++)
    {
        int min = i;
        for (int j = i + 1; j < n; j++)
        {
            if (datas[j] < datas[min])
            {
                min = j;
            }
        }
        swap(datas[i], datas[min]);
    }
}
```

## 堆排序

堆排序利用了堆这种数据结构

算法过程:

1. 将待排序的数组构建成二叉堆(升序排序构建成大根堆)
2. 将堆顶元素出堆,出堆方式为堆顶与堆底元素交换,末尾的即为有序序列
3. 重复上述过程,直到堆空

```c++
void siftDown(vector<int> &datas, int root, int n) // 向下重建堆
{
    int lchild = root * 2 + 1;
    int rchild;
    int max; // 最大的子树
    while (lchild < n)
    {
        rchild = lchild + 1;
        if (rchild < n && datas[rchild] > datas[lchild])
        {
            max = rchild;
        }
        else
        {
            max = lchild;
        }

        if (datas[max] <= datas[root])
        {
            return; // 根比左子树大,已经重建完成
        }

        swap(datas[max], datas[root]); // 交换根节点和最大子树
        root = max;
        lchild = root * 2 + 1;
    }
}

void heapSort(vector<int> &datas)
{
    int n = datas.size();
    for (int i = n - 1; i >= 0; i--) // 从最后一个元素开始,完成堆化
    {
        siftDown(datas, i, n);
    }

    for (int i = n - 1; i > 0; i--) // 堆排序过程
    {
        swap(datas[i], datas[0]); // 出堆,把最大的元素放到末尾
        siftDown(datas, 0, i);    // 维护堆结构
    }
}


```


## 锦标赛排序

