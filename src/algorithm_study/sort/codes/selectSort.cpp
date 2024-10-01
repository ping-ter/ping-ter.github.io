#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

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

