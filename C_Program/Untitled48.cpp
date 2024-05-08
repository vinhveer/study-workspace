#include <stdio.h>
#include <math.h>

void MaxMin(int a, int b, int c, int d, int *max, int *min)
{
	*max = a;
	if (b > *max)
		*max = b;
	if (c > *max)
		*max = c;
	if (d > *max)
		*max = d;
	*min = a;
	if (b < *min)
		*min = b;
	if (c < *min)
		*min = c;
	if (d < *min)
		*min = d;
}
int main()
{
	int a, b, c, d;
	int max, min;
	scanf("%d %d %d %d", &a, &b, &c, &d);
	MaxMin(a, b, c, d, &max, &min);
	printf("%d %d",max,min);
}
