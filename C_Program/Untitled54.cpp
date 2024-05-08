#include <stdio.h>

int main()
{
	int a[] = {2, 4, 6};
	printf("%d", sizeof(a)/sizeof(a[0]));
}
