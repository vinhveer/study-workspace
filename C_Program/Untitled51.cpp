#include <stdio.h>
int main()
{
	int a;
	int *p;
	printf("&a = %d",&a);
	scanf("%d",&a);
	printf("\n a = %d",a);
	p = &a;
	printf("\n *p = %d",*p);
	printf("\n &p = %d",&p);
}
