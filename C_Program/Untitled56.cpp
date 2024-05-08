#include <stdio.h>

#define MAX 100

void Input(int n, int a[])
{
	for (int i = 0; i < n; i++)
	{
		printf("a[%d] = ", i);
		scanf("%d",&a[i]);
	}
}

void Output(int n, int a[])
{
	printf("\nCac gia tri trong mang la: ");
	for (int i = 0; i < n; i++)
		printf("%d ",a[i]);
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

int ArrayPrime(int n, int &temp, int a[], int prime[])
{
	temp = 0;
	for (int i = 0; i < n; i++)
	{
		if (CheckPrime(a[i]) == 1)
		{
			prime[temp] = a[i];
			temp += 1;
		}
	}
}

int main()
{
	int n, a[MAX];
	int prime[MAX];
	printf("N = ");
	scanf("%d", &n);
	Input(n, a);
	Output(n, a);
	int temp = 0;
	ArrayPrime(n, temp, a, prime);
	Output(temp, prime);
}
