#include <stdio.h>
#include <stdlib.h>

int i,j,k,l;
void draw(int n, int m) {
	for (k=1;k<=n;k++) {
		if (k <= (m+1)) {
			l = k;
		}
		else {
			l = n - k + 1;
		}
		int x = m - (l - 2);
		int y = m + l;
		if (l == 1) {
			for (i=1;i<=m;i++) {
				printf(".");
			}
			printf("*");
			for (i=1;i<=m;i++) {
				printf(".");
			}
			printf("\n");
		}
		if (l != 1) {
			for (i=1;i<=n;i++) {
				if (i == x) {
					printf("*");
				}
				else if (i == y) {
					printf("*");
				}
				else {
					printf(".");
				}
			}
			printf("\n");	
		}
	}
}

int main() {
	int n;
	scanf("%d",&n);
	if (n % 2 == 0) {
		printf("ERROR!");
		}
	else {
		int m = (n - 1)/2;
		draw(n,m);
		}
	return 0;
}
