#include <iostream>
#include <string>
#define debug(x) #x << ":" << x << " "
#define ll long long
using namespace std;


int next_[1000000];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
	
	
	
	string s,p;
	cin >> s >> p;
	
	// 构建next数组
	
	next_[0] = 0;
	next_[1] = 0;
	int k = 0;
	for (int i = 1; i < p.size(); i++)
	{
		while(k != 0 && p[i] != p[k]){
			k = next_[k];
		}
		if (p[i] == p[k])
		{
			k++;
		}
		next_[i+1] = k;
	
	}
	int j = 0;
	for (int i = 0; i < s.size(); i++)
	{
		if (p[j] == s[i])
		{
			j++;
			if (j == p.size())
			{
//				j--;
				cout << i - j + 2 << "\n";
				j = next_[j];
//				i--;
			}
			
		}
		else
		{
//			i--;
			if (j != 0)
			{
				i--;
			}
			j = next_[j];
		}
	}
    for (int i = 1; i <= p.size(); i++)
	{
		cout << next_[i] << " ";
	}
    

    return 0;
}

