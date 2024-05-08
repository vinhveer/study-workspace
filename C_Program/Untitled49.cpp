#include <stdio.h>
#include <math.h>

int Max(int *n)
{
	int max = -1e9;
	while (*n)
	{
		int r = *n % 10;
		max = fmax(r, max);
		*n /= 10;
	}
	return max;
}
int Min(int *b)
{
	int min = 1e9;
	while (*b)
	{
		int r = *b % 10;
		min = fmin(min, r);
		*b /= 10;
	}
	return min;
}
int main()
{
	int n;
	scanf("%d ",&n);
	printf("%d ",Max(&n));
	printf("%d ",Min(&n));
}
