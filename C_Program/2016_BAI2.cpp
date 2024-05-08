#include <stdio.h>

int main() {
	printf("N = ");
	int n;
	scanf("%d",&n);
	int i,j;
	int temp1 = 1,temp2 = 1;
	if (n >= 1 && n <= 50) {
		for (i=1;i<=(n*3);i++) {
			temp2 = 1;
			for (j=1;j<=(n*3);j++) {
				if (temp1 % 2 == temp2 % 2) {
					printf("W");
				}
				else {
					printf("B");
				}
				if (j%3 == 0) {
					temp2 += 1;
				}
			}
			if (i%3 == 0) {
				temp1 += 1;
			}			
			printf("\n");
		}
	}
	else {
		printf("ERROR!");
	}
}
