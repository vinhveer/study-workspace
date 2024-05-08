#include <stdio.h>
int main() {
	int n,i,j,pi,pj;
	int temp = 0;
	printf("Nhap so tien can rut: ");
	scanf("%d",&n);
	if (n % 5 != 0) {
		printf("Khong the rut tien");
	}
	else {
		if (n < 20) {
			pi = n;
			printf("5: %d, 20: %d, 50: %d\n",pi/5,0,0);
		}
		else if (n < 50) {
			pi = n;
			for (j=0;j<=(pi/20);j++) {
				pj = pi;
				pj -= j*20;
				printf("5: %d, 20: %d, 50: %d\n",pj/5,j,0);
			}
		}
		else if (n >= 50) {
			for (i=0;i<=(n/50);i++) {
				pi = n;
				pi -= i*50;
				for (j=0;j<=(pi/20);j++) {
					pj = pi;
					pj -= j*20;
					printf("5: %d, 20: %d, 50: %d\n",pj/5,j,i);
				}
			}
		}	
	}
	return 0;
}
