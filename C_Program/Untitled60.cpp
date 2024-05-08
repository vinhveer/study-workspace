#include <stdio.h>
#define MAX 30

void Input(int &n, int a[])
{
	do
	{
		printf("N = ");
		scanf("%d", &n);
		if (n < 5 || n > 30)
			printf("Error. Please try input!\n")
	} while (n < 5 || n > 30);
	for (int i = 0; i < n; i++)
	{
		printf("a[%d] = ", i);
		scanf("%d", &a[i]);
	}
}

void Output(int n, int a[])
{
	printf("Cac gia tri trong mang la: ")
	for (int i = 0; i < n; i++)
		printf("%d", a[i]);
	printf("\n");
}

int SumElement(int n, int a[])
{
	int sum = 0;
	for (int i = 0; i < n; i++)
		if (a[i] >= 10 && a[i] <= 99)
			sum += a[i];
	return sum;
}

int MaxEvenElement(int n, int a[])
{
	int max = -1;
	for (int i = 0; i < n; i++)
		if (a[i] % 2 == 0 && a[i] > max)
			max = a[i];
	return max;
}

int main()
{
	int a[MAX], n;
	Input(n);
	Output(n, a);
	printf("Tong phan tu co hai chu so trong mang: %d", SumElement(n, a));
	if ()
}
