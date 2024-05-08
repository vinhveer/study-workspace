#include <iostream>
using namespace std;
int main() {
	int n,i,j,pi,pj;
	int temp = 0;
	cout << "Nhap so tien can rut: " ;
	cin >> n;
	if (n % 5 != 0) {
		cout << "Khong the rut tien";
	}
	else {
		if (n < 20) {
			pi = n;
			cout << "5: " << pi/5 << " 20: " << 0 << " 50: " << 0 << endl;
		}
		else if (n < 50) {
			pi = n;
			for (j=0;j<=(pi/20);j++) {
				pj = pi;
				pj -= j*20;
				cout << "5: " << pi/5 << " 20: " << j << " 50: " << 0 << endl;
			}
		}
		else if (n >= 50) {
			for (i=0;i<=(n/50);i++) {
				pi = n;
				pi -= i*50;
				for (j=0;j<=(pi/20);j++) {
					pj = pi;
					pj -= j*20;
					cout << "5: " << pi/5 << " 20: " << j << " 50: " << i << endl;
				}
			}
		}	
	}
	return 0;
}
