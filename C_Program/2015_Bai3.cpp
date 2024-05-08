#include <stdio.h>
#include <stdlib.h>

int main() {
	int n,m,x,y,k;
	int i,j;
	printf("Nhap kich thuoc ban bi-a (n x m): \n");
	printf("n = ");
	scanf("%d",&n);
	printf("m = ");
	scanf("%d",&m);
	printf("Nhap toa do vi tri bong bi-a: \n");
	printf("x = ");
	scanf("%d",&x);
	printf("y = ");
	scanf("%d",&y);
	printf("Nhap luc danh: \n");
	printf("k = ");
	scanf("%d",&k);
	return 0;
	int tdx = x;
	int tdy = y;
	for (i=1;i<=n;i++) {
		for (j=1;j<=m;j++) {
			tdx += i;
			tdy += j;
			printf("%d %d\n",x,y);
		}
	}
}
