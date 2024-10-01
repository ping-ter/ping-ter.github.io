# 关于c++处理数字字符混合的情况
当cin获取到一个非整形字符的时候，cin >> i 会返回false，并且会对cin对象做一个错误标记
只有使用 cin.clear() 清除错误标记后才能继续从缓冲区读取数据

[参考连接](https://blog.csdn.net/qq_41191055/article/details/115349012)

```c++
while (1)
{
    if (cin >> i)
    {
        // 获取到整型值
        ivec.push_back(i);
    }
    else
    {
        // 需要先清除错误标记
        cin.clear();
        // cin.get()会获取缓冲区中的第一个字符，注意，空格和回车也会读取。
        char t = cin.get();
        if (t == ' ')
        {
            // 如果获取到了空格，则跳过，获取下一个字符
            t = cin.get();
        }
        // 此时t已经是我们想要的字符了
        cvec.push_back(t);
    }
}
