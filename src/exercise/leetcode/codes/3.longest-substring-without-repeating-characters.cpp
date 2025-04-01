/*
 * @lc app=leetcode.cn id=3 lang=cpp
 * @lcpr version=30204
 *
 * [3] 无重复字符的最长子串
 */

// @lcpr-template-start
using namespace std;
#include <algorithm>
#include <array>
#include <bitset>
#include <climits>
#include <deque>
#include <functional>
#include <iostream>
#include <list>
#include <queue>
#include <stack>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
// @lcpr-template-end

// @lc code=start
class Solution
{
public:
    int lengthOfLongestSubstring(string s)
    {
        unordered_map<char, int> m;
        int max_len = 0;
        int pre_len = 0;
        int n = s.size();
        for (int i = 0; i < n; i++)
        {
            if (m.find(s[i]) == m.end())
            {
                m.insert(make_pair(s[i], i));
                pre_len++;
            }
            else if (m[s[i]] < i - pre_len)
            {
                m[s[i]] = i;
                pre_len++;
            }
            else
            {
                int front = m[s[i]];
                m[s[i]] = i;
                pre_len = i - front;
            }
            if (pre_len > max_len)
            {
                max_len = pre_len;
            }
        }
        return max_len;
    }
};
// @lc code=end

/*
// @lcpr case=start
// "abcabcbb"\n
// @lcpr case=end

// @lcpr case=start
// "bbbbb"\n
// @lcpr case=end

// @lcpr case=start
// "pwwkew"\n
// @lcpr case=end

 */
