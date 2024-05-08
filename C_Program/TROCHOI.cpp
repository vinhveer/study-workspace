#include <stdio.h>

int main() {
	int a[100];
	int n,i,j;
	printf("Nhap so la bai: ");
	scanf("%d",&n);
	for (i=1;i<=n;i++) {
		printf("a[%d] = ",i);
		scanf("%d",&a[i]);
	}
	int Tuan = 0,Nam = 0;
	i = 1;
	j = n;
	while (i <= j) {
		if (a[i] < a[j]) {
			Tuan += a[j];
			a[j] = 0;
			j -= 1;
		}
		else if (a[i] > a[j]) {
			Tuan += a[i];
			a[i] = 0;
			i += 1;
		}
		else {
			Tuan += a[i];
			a[i] = 0;
			i += 1;
		}
		if (a[i] < a[j]) {
			Nam += a[j];
			a[j] = 0;
			j -= 1;
		}
		else if (a[i] > a[j]) {
			Nam += a[i];
			a[i] = 0;
			i += 1;
		}
		else {
			Nam += a[i];
			a[i] = 0;
			i += 1;
		}
	}
	printf("So diem cua Tuan: %d\nSo diem cua Nam: %d\n",Tuan,Nam);
	return 0;
}
