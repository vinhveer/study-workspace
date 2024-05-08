#include <stdio.h>
#define MAX 50
void Input(int &n, int a[])
{
	do
	{
		printf("Nhap so luong phan tu: ");
		scanf("%d", &n);
	} while (n <= 2 && n >= MAX);
	
	for (int i = 0; i < n; i++)
	{
		printf("a[%d] = ", i);
		scanf("%d", &a[i]);
	}
}

int Output(int n, int a[])
{
	for (int i = 0; i < n; i++)
		printf("%d ", a[i]);
}

int main()
{
	int a[MAX];
	int n;
	Input(n, a);
	Output(n, a);
}
