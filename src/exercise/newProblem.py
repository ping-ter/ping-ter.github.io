import os
import luogu

num = int(input("输入洛谷题号: "))

cpp_template = """#include <iostream>

#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    

    return 0;
}

"""

with open(f"./luogu/codes/P{num}.cpp","w") as f:
    f.write(cpp_template)
    
luogu.create_luogu_md(num,f"./luogu/P{num}.md")