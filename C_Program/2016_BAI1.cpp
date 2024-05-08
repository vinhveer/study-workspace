#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

int main() {
	int n,i;
	printf("N = ");
	scanf("%d",&n);
	getchar();
	char a[n];
	gets(a);
	int dong = 0, mo = 0;
	getchar();
	for (i=0;i<=n;i++) {
		if (a[i] == '(') {
			mo += 1;	
		}
		else if (a[i] == ')') {
			dong += 1;
		}
	}
	printf("%d_%d\n",dong,mo);
	if (dong != mo) {
		printf("NO\n");
	}
	else if(a[0] == ')' || a[n] == '(') {
		printf("NO\n");	
	}
	else {
		printf("YES\n");
	}	
	return 0;
}
