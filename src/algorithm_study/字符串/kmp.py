class Solution(object):
    def build_next(self, needle):
        self.next = [-1]
        i = -1
        j = 0
        while j < len(needle) - 1:
            while i >= 0 and needle[i] != needle[j]:
                i = self.next[i]
            i += 1
            j += 1
            if needle[i] == needle[j]:
                self.next.append(self.next[i])#则说明当前位置j之前的前后缀相同
            else:
                self.next.append(i)#不同,直接赋值
        print(self.next)
        #[-1, 0, 0, 0, 0, -1, 0, 0, 3]
    def build_next2(self, needle):#写法2
        self.next = [-1]
        i = -1
        j = 0
        while j < len(needle):
            if i == -1 or needle[i] == needle[j]:
                i += 1
                j += 1
                self.next.append(i)
            else:
                i = self.next[i]
        #[-1, 0, 0, 0, 0, 0, 1, 2, 3, 0]
    def strStr(self, haystack, needle):
        """
        :type haystack: str
        :type needle: str
        :rtype: int
        """

        i = 0
        j = 0
        self.build_next(needle)
        while i < len(haystack) and j < len(needle):
            if j == -1 or haystack[i] == needle[j]:
                i += 1
                j += 1
            else:
                j = self.next[j]
        if j == len(needle):
            return i - j
        return -1
a = Solution()
a.strStr("abcabcasdfh","abababca")

  