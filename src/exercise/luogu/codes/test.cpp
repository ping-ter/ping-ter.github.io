#include <iostream>
using namespace std;
int main()
{
    int s = 78;
    for (int c = 1; s != 0; c *= 2, s = s >> 1)
    {
        cout << (s & 0x0001);
    }
    return 0;
}