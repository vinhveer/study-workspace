#include <iostream>
#include <string.h>
using namespace std;
int main() 
{
	string c;
	cin >> c;
	int chu, so, ky_tu;
	for (int i = 0; i < sizeof(c); i++) {
		if (((c[i] >= 'A') && (c[i] <= 'Z')) || ((c[i] >= 'a') && (c[i] <= 'z')))
			chu += 1;
		else if ((c[i] >= '0') && (c[i] <= '9'))
			so += 1;
		else
			ky_tu += 1;
	}
	cout << chu << " " << so << " " << ky_tu << endl;
	return 0;
}
