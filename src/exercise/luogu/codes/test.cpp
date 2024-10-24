#include <iostream>
using namespace std;
int main()
{
    double m = 1.1;
    for (int i = 0; i < 40; i++)
    {
        m = m * 1.1;
        cout << m << " ";
    }
    cout << m;
    return 0;
}