#include <stdio.h>
int i,j;
int main() {
	int n,m;
	scanf("%d",&n);
	if (n % 2 == 0) {
		printf("ERROR!");
	}
	else {
		m = (n - 1) / 2;
		printf("%d",m);
	}
	return 0;
}
		
	
