# 热门100题part15（53.最大子数组和）

## 53.最大子数组和

线性DP

```c++
class Solution
{
public:
    int maxSubArray(vector<int> &nums)
    {
        int max_sum = nums[0];
        int pre_sum = nums[0];
        int n = nums.size();
        for (int i = 1; i < n; i++)
        {
            pre_sum = nums[i] + max(pre_sum, 0);
            max_sum = max(max_sum, pre_sum);
        }
        return max_sum;
    }
};
```

## 62.不同路径

组合数学，由于每次只能向下或者向右移动一步，所以必定要向下`m - 1`步，只要确定向下走的位置就确定路线了，即`C(n, m - 1) + n`，问题的关键是组合数的算法。

[ACWing大佬提供的动态规划思路](https://www.acwing.com/blog/content/50579/)

依据：
$$
C_n^m = C_n^{n - m} \\
C_n^m = C_n^{m - 1} + C_{n - 1}^{m - 1}
$$
第一个式子可以简化要计算的组合数，第二个可以动态规划递推,计算从$C_{m - 1}^{m - 1}$ 到$C_{n}^{m - 1}$
