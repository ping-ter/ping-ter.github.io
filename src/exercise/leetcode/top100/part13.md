# 热门100题part11（34.在排序数组中查找元素的第一个和最后一个位置）

## 34.在排序数组中查找元素的第一个和最后一个位置

要求必须设计并实现时间复杂度为$O(log n)$的算法解决此问题

二分查找的复杂度就是$O(log n)$，分别查找`target`和`target+1`就可以了

```c++
class Solution
{
public:
    vector<int> searchRange(vector<int> &nums, int target)
    {
        auto l = lower_bound(nums.begin(), nums.end(), target);
        if (l == nums.end() || *l != target)
        {
            return vector({-1, -1});
        }
        auto r = upper_bound(nums.begin(), nums.end(), target);
        int st = distance(nums.begin(), l);
        int ed = distance(nums.begin(), r);
        return vector<int>({st, ed - 1});
    }
};
```