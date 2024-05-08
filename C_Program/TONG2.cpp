#include <stdio.h>
#include <stdlib.h>

int main() {
	int n;
	double i,tong = 0;
	scanf("%d",&n);
	if (n<2) {
		printf("ERROR");
		exit(0);
	}
	else {
		for (i=2;i<=n;i++) {
			tong += 1/i	;
		}
		printf("%0.4f",tong);
	}
	return 0;
}	
