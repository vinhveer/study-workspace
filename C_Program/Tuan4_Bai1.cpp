#include <stdio.h>
#include <math.h>
#define MAX 50

void Input(int n, int a[])
{
	printf("a[0] = ");
	scanf("%d", &a[0]);
	for (int i = 1; i < n; i++)
		do
		{
			printf("a[%d] = ", i);
			scanf("%d",&a[i]);
			if (a[i] == a[i - 1])
				printf("ERROR, PLEASE INPUT!\n");
		} while (a[i] == a[i - 1]);	
}
void Output(int n, int a[])
{
	for (int i = 0; i < n; i++)
		printf("%d ", a[i]);
	printf("\n");	
}
int CheckPrime(int num)
{
	if (num < 2)
		return 0;
	else if (num == 2)
		return 1;
	else
	{ 
		for (int i = 2; i < num; i++)
		{
			if (num % i == 0)
			{
				return 0;
				break;
			}
		}
		return 1;
	}
}
int SecondPrime(int n, int a[])
{
	for (int i = 1; i < n; i++)
	{
		if (CheckPrime(a[i]) == 1)
		{
			for (int j = i + 1; j < n; j++)
				if (CheckPrime(a[j]) == 1)
				{
					return a[j];
					break;
				}
			return a[i];
			break;
		}
	}
	return -1;
}
void SortAscending(int n, int a[])
{
	for (int i = 0; i < n; i++)
		for (int j = i + 1; j < n; j++)
			if (a[i] > a[j])
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
}
int main()
{
	int n, a[MAX];
	printf("N = ");
	scanf("%d", &n);
	Input(n,a);
	Output(n,a);
	printf("So nguyen to xuat hien thu 2 trong day: %d \n", SecondPrime(n,a));
	SortAscending(n,a);
	Output(n,a);
	return 0;
}
