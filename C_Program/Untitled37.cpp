#include <stdio.h>
int SumNumber(int a)
{
	int temp, sum;
	while (n != 0)
	{
		temp = n % 10;
		n = n / 10;
		sum += temp;
	}
	return sum;
}
int main() 
{
	int n;
	scanf("%d",&n);
	SumNumber(n);
}
