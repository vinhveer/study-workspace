#include <stdio.h>
#include <math.h>

int KiemTraNT(int *n)
{
	if (*n < 2)
		return 0;
	for (int i = 2; i <= sqrt(*n); i++)
		if (*n % i == 0)
			return 0;
	return 1;
}
int TinhTongNT(int *n)
{
	int sum = 0;
	for (int i = 2; i <= *n; i++)
		if (KiemTraNT(&i))
			sum += i;
	return sum;
}
int main()
{
	int n;
	do
	{
		printf("N = ");
		scanf("%d",&n);
	}
	while (n < 5 || n > 30);
/*	for (int i = 2; i <= n; i++)
		if (KiemTraNT(&i))
			printf("%d ",i);
	printf("\n");*/
	printf("%d", TinhTongNT(&n));
}
