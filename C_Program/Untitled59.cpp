#include <stdio.h>
{
	int a,b;
	printf("a = ");
	scanf("%d", &a);
	printf("b = ");
	scanf("%d", &b);
	printf("%d %% %d = %d",a , b, a%b);
	return 0;
}
