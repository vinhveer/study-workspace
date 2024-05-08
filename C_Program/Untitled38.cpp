#include <stdio.h>
int SumNumber(int a)
{
	int temp, sum;
	while (a != 0)
	{
		temp = a % 10;
		a = a / 10;
		sum += temp;
	}
	return sum;
}
int main()
{
	int a;
	scanf("%d",&a);
	printf("%d",SumNumber(a));
	return 0;
}
