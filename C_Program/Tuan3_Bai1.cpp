#include <stdio.h>
#define MAX 50

void Input(int n, int a[])
{
	for (int i = 0; i < n; i++)
	{
		printf("a[%d] = ", i + 1);
		scanf("%d",&a[i]);
	}
}
void Output(int n, int a[])
{
	printf("\nCac phan tu trong day so: ");
	for (int i = 0; i < n; i++)
		printf("%d ",a[i]);
	printf("\n");
}
void OutputInt(int n, int a[])
{
	printf("\nCac phan tu so nguyen duong trong day so: ");
	for (int i = 0; i < n; i++)
		if (a[i] >= 0)
			printf("%d ",a[i]);
	printf("\n");
}
int CountEven(int n, int a[])
{
	int count = 0;
	for (int i = 0; i < n; i++)
		if (a[i] % 2 == 0)
			count += 1;
	return count;
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
int SumPrime(int n, int a[])
{
	int sum = 0;
	for (int i = 0; i < n; i++)
		if (CheckPrime(a[i]) == 1)
			sum += a[i];
	return sum;
}
int main()
{
	int n, a[MAX];
	do
	{
		printf("Nhap so phan tu mang: ");
		scanf("%d",&n);
		if (n < 3 || n > 50)
			printf("Vui long nhap lai. (3 >= n <= 50)!\n");
	} while (n < 3 || n > 50);
	Input(n,a);
	Output(n,a);
	OutputInt(n,a);
	printf("So luong cac phan tu chan la: %d\n", CountEven(n,a));
	printf("Tong cac phan tu la so nguyen to la: %d\n", SumPrime(n,a));
	return 0;
}
