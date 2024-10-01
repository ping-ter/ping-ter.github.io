#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int> &datas, int la, int ra, int lb, int rb, vector<int> &temp) // 归并有序数组
{
    // 都是闭区间[la,ra],[lb,rb]
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
    merge(datas.begin() + l, datas.begin() + mid, datas.begin() + mid, datas.begin() + r, temp.begin() + l);
    copy(temp.begin() + l, temp.begin() + r, datas.begin() + l);
}

void mergeSortRecursion(vector<int> &datas)
{
    int n = datas.size();
    vector<int> temp(n, 0);
    mergeSortRecursionInner(datas, 0, n, temp);
}

// int main()
// {
//     vector<int> temp(10,0);
//     vector<int> test = {1,3,5,7,9,2,4,6,8,10};
//     merge(test,0,4,5,9,temp);
//     for_each(temp.begin(),temp.end(),[](int a)
//     {
//         cout << a << " ";
//     });
//     return 0;

// }