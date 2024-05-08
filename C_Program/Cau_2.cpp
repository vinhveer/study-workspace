#include <stdio.h>

int main() {
	int a,b;
	scanf("%d %d",&a,&b);
	if (a > 0 && b > 0 && a > b) {
		printf("%d",a/b);
	}
	else {
		printf("%d",a+b);
	}
}
