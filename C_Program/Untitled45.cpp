#include <stdio.h>
int main()
{
	int a = 5, *p, *q = NULL;
	p = &a;
	p = q;
	printf("a = %d, p = %d",a,p);
}
