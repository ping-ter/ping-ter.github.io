# KMP算法

## 求next数组
---


next数组保存模式串在匹配失败后的下一个位置
prefix表则表示该字符串到此位置的最长相同前后缀长度
例如对于模式串 **"abababca"**,它的next数组应该为:

| 字符串 |   a   |   b   |   a   |   b   |   a   |   b   |   c   |   a   |
| :----: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| index  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |
|  prefix   |   0   |   0   |   1   |   2   |   3   |   4   |   0   |   1   |
|  next  |  -1   |   0   |   -1   |   0   |   -1  |   0   |   4   |   -1   |

next[0]匹配失败后下一个位置仍然是0,这里设置成-1只是方便判断判断是否为第一个字符匹配失败

## 求prefix表

第一个字符的最长相同前后缀长度一定为0

	prefix[0] = 0

从prefix[1]开始:

+ 如果与前一个字符的最长相同前缀的后一个字符相同,原本的相等前后缀就延长了,那么就在前面的基础上+1,例如:

	|   A   |   B   |   C   |   A   |   B   |
	| :---: | :---: | :---: | :---: | :---: |
	|   0   |   1   |   2   |   3   |   4   |
	|   0   |   0   |   0   |   1   |   2   |

	[4]之前是[3],而[3]的最长相同前缀长度为1,而[4]和[1]相同,那么就把原来的相同前后缀A延伸成AB,长度为2

 
+ 如果与前一个不同,那么回退到前缀的前缀,例如:

	|    A |   B   |   C   |   A   |   B   | D |
	| ---: | ---: | :---: | :---: | :---: | :---: |
	|    0 |    1 |   2   |   3   |   4   |   5   |
	|    0 |    0 |   0   |   1   |   2   |   0   |

	[5]和[2]不同,那么就要把比较对象回退到 **[prefix[2 - 1]]**,即[0],再重复这两个过程

实现方法如下:

```c++
void build_pat(char *strings,int pat[])
{
    int i = 0;
    int j = 1;
    int max = 0;
    pat[0] = 0;
    while (strings[j] != '\0')
    {
        while (i > 0 && strings[i] != strings[j])
        {
            i = pat[i - 1];//不符合条件1则一直回退
        }
        if (strings[i] == strings[j])
        {
            i++;
        }
        pat[j] = i;
        j++;
    }
}
```

### 求next数组

next数组是匹配过程中出现不相等字符时模式串回退到的位置 

以最开始的 **"abababca"** 为例子:
| needle |   a   |   b   |   a   |   b   |   a   |   b   |   c   |   a   |
| :----: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| index  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |
|  prefix   |   0   |   0   |   1   |   2   |   3   |   4   |   0   |   1   |
|  next  |  -1   |   0   |   -1   |   0   |   -1  |   0   |   4   |   -1   |

+ 最开始时,我们令next[0]为-1,方便匹配时判断主串的指针是否移动
+ 如果**当前**的位置prefix为0,即没有相等前后缀,那么**下一个**匹配失败时位置显然要从头匹配
+ 如果**当前**位置prefix不为0,存在相等前后缀,**下一个**位置匹配失败时,预先有匹配好的前缀,所以只需要跳到prefix

代码如下:

```python
def build_next(self, needle):
    next = [-1]
    i = -1
    j = 0
    while j < len(needle) - 1:
        while i >= 0 and needle[i] != needle[j]:
            i = next[i]
        i += 1
        j += 1
        if needle[i] == needle[j]:
            next.append(next[i])#则说明当前位置j之前的前后缀相同
        else:
            next.append(i)#不同,直接赋值

def build_next2(self, needle):#写法2
    next = [-1]
    i = -1
    j = 0
    while j < len(needle):
        if i == -1 or needle[i] == needle[j]:
            i += 1
            j += 1
            next.append(i)
        else:
            i = next[i]
```


查找过程
---
匹配时,提前构建好next数组

然后遵循规则匹配即可:
各有一个指针i j指向主串和模式串的当前位置,如果:
+ i j匹配,它们一起向前移动,继续比较
+ 不匹配,j移动到next[j],如果j为-1,则i移动,否则i不移动,继续比较

直到i j有一个到达末尾,匹配结束
代码如下:
```python
def KMP_strStr(self, haystack, needle):
    i = 0
    j = 0
    build_next(needle)
    while i < len(haystack) and j < len(needle):
        if j == -1 or haystack[i] == needle[j]:
            i += 1
            j += 1
        else:
            j = next[j]
    if j == len(needle):
        return i - j
    return -1     

```

复杂度计算
--
生成next数组和匹配过程中,都没出现指针的回退,一直向前
若模式串长度为m,主串为n,则算法的时间复杂度为`O(n + m)`,由于使用了next数组,空间复杂度为`O(m)`