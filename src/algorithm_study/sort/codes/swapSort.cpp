#include <algorithm>
#include <iostream>
#include <vector>
#include <cstdlib>
using namespace std;

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

void insertSort(vector<int> &datas, int l, int r)
{

    for (int i = l + 1; i <= r; i++)
    {
        int temp = datas[i];
        int j = i - 1;
        while (j >= l && datas[j] > temp)
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
