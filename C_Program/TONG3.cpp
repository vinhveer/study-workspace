#include <stdio.h>

int main() {
	int n,i;
	int S = 0;
	scanf("%d",&n);
	for (i = 1; i <= (3*n+1) ; i++) {
		printf("%d ",i);
		if (i/2 == 0) {
			S -= i;
			printf("even %d\n",S);
		}
		if (i/2 != 0) {
			S += i;
			printf("odd %d\n",S);
		}
	}
	printf("%d",S);
	return 0;
}	
