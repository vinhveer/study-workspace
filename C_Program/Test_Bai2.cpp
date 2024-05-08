#include <stdio.h>
#include <math.h>

void Input(int &n)
{
	printf("N = ");
	scanf("%d", &n);
}
float TotalExpression(int n)
{
	int sumodd = 0;
	float sum = 0;
	for (int i = 1; i <= n; i = i + 2)
	{
		sumodd += i;
		sum += (float) 1/(sqrt(sumodd));
	}
	return sum;
}
int main()
{
	int n;
	Input(n);
	printf("Sum = %0.2f", TotalExpression(n));
}
