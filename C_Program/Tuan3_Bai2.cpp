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
int OddNum(int n, int a[])
{
	int odd = 0;
	for (int i = 0; i < n; i++)
		if (a[i] % 2 != 0)
			odd = a[i];
	return odd;
}
int Min(int n, int a[])
{
	int min = a[0];
	for (int i = 1; i < n; i++)
		if (min > a[i])
			min = a[i];
	return min;
}
int CountMin(int n, int a[], int min)
{
	int count = 0;
	for (int i = 0; i < n; i++)
		if (a[i] == min)
			count += 1;
	return count;	
}
int main()
{
	int n, a[MAX];
	do
	{
		printf("Nhap so phan tu mang: ");
		scanf("%d",&n);
		if (n < 5 || n > 100)
			printf("Vui long nhap lai. (3 >= n <= 100)!\n");
	} while (n < 3 || n > 100);
	Input(n,a);
	Output(n,a);
	printf("So le cuoi cung trong day la: %d\n",OddNum(n,a));
	int min = Min(n,a);
	printf("Gia tri nho nhat trong day so la: %d\n",min);
	printf("So gia tri nho nhat trong day so la: %d\n",CountMin(n,a,min));
}
