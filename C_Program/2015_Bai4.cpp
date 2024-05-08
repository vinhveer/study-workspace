#include <stdio.h>
#include <stdlib.h>

int main() {
	int n,i,j,temp;
	int max = 0;
	int a[100];
	scanf("%d",&n);
	for (i=1;i<=n;i++) {
		printf("a[%d] = ",i);
		scanf("%d",&a[i]);
	}
	for (i=1;i<=n;i++) {
		for (j=1;j<=n;j++) {
			if (a[i] > a[j]) {
				temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
		}
	}
	max = a[1] + 1;
	
	int min = a[1] + 1;
	for (i=max;i>1;i--) {
		if ((a[i] + i) <= min) {
			min = a[i] + i;
		}
	}
	printf("%d",min);	
	return 0;
}
