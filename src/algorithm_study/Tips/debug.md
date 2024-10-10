# debug

可以用下面的代码方便的输出变量的值

```c++
#define debug(x) #x << ":" << x << " "

使用:
for (int i = 0; i < m; i++)
{
    cout << debug(i);
}
```
