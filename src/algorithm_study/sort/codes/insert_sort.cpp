#include <algorithm>
#include <iostream>
#include <vector>
#include "selectSort.cpp"
using namespace std;

vector<int> origin = {2, 27, 39, 70, 86, 95, 99, 126, 162, 179, 180, 212, 319, 322, 354, 398, 432, 465, 470, 500, 527, 568, 571, 579, 600, 673, 742, 746, 771, 842, 852, 873, 908, 912, 988, 1007, 1037, 1116, 1136, 1140, 1241, 1283, 1341, 1373, 1403, 1442, 1518, 1574, 1588, 1621, 1667, 1718, 1784, 1789, 1841, 1982, 1998, 1998, 2066, 2082, 2123, 2132, 2144, 2200, 2305, 2312, 2427, 2486, 2495, 2506, 2584, 2593, 2686, 2699, 2731, 2808, 2820, 2836, 2880, 2979, 3023, 3071, 3163, 3258, 3267, 3293, 3323, 3495, 3510, 3516, 3523, 3587, 3611, 3687, 3714, 3719, 3743, 3759, 3883, 3932, 3974};
vector<int> toSort = {1784, 1998, 1998, 600, 568, 579, 2123, 742, 1403, 212, 1373, 3293, 2880, 2305, 2584, 2506, 3714, 852, 3071, 908, 1621, 3510, 673, 3267, 1283, 162, 3974, 2495, 1574, 1241, 746, 1140, 3495, 2593, 3759, 2, 432, 3258, 3883, 99, 2808, 3523, 3163, 2066, 1982, 95, 465, 1789, 2427, 86, 571, 2820, 2836, 126, 180, 2486, 179, 1341, 2312, 3611, 527, 1442, 1841, 3687, 70, 2731, 1037, 1116, 2200, 1588, 3023, 3587, 322, 2686, 470, 319, 1136, 2144, 912, 2699, 842, 398, 1667, 39, 3719, 3323, 27, 1518, 873, 354, 3516, 3932, 1007, 3743, 2979, 988, 2132, 771, 500, 2082, 1718};

void insertSort(vector<int> &datas)
{
    int n = datas.size();
    for (int i = 1; i < n; i++)
    {
        int temp = datas[i]; // 插入过程中会覆盖掉datas值,提前保存
        int j = i - 1;
        while (datas[j] > temp && j >= 0) // 寻找合适位置
        {
            datas[j + 1] = datas[j]; // 后移元素,模拟插入过程
            j--;
        }
        datas[j + 1] = temp;
    }
}

void insertSort2(vector<int> &datas)//另一种写法
{
    int n = datas.size();
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < i; j++)
        {
            if (datas[i] < datas[j])
            {
                int temp = datas[i];
                datas[i] = datas[j];
                datas[j] = temp;
            }
        }
    }
}

void binary_insertSort(vector<int> &datas)
{
    int n = datas.size();
    for (int i = 1; i < n; i++)
    {
        int temp = datas[i];
        int index = upper_bound(datas.begin(), datas.begin() + i, temp) - datas.begin();
        copy(datas.begin() + index, datas.begin() + i, datas.begin() + index + 1);
        datas[index] = temp;
    }
}

void shellSort(vector<int> &datas)
{
    int n = datas.size();
    for (int gap = n / 2; gap > 0; gap /= 2)
    {
        // 对每一组元素进行插入排序
        for (int i = gap; i < n; i++)
        {
            int j = i - gap;
            int temp = datas[i];
            while (j >= 0 && datas[j] > temp)
            {
                datas[j + gap] = datas[j];
                j -= gap;
            }
            datas[j + gap] = temp;
        }
    }
}

void print()
{
    for (int i = 0; i < toSort.size(); i++)
    {
        cout << toSort[i] << " ";
    }
    cout << endl;
}

void judge()
{
    for (int i = 0; i < toSort.size(); i++)
    {
        if (toSort[i] != origin[i])
        {
            cout << "Sort Error" << endl;
            return;
        }
    }
    cout << "Sort Right" << endl;
}

int main()
{
    print();
    cout << endl;
    heapSort(toSort);
    print();
    judge();
    return 0;
}
