#include <stdio.h>
int n, a[1000];
void Input()
{
	for (int i = 0; i < n; i++)
		scanf("%d",&a[i]);
}
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
void SortAscending()
{
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			if (SumNumber(a[i]) < SumNumber(a[j]))
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
}
void Output() 
{
	for (int i = 0; i < n; i++)
		printf("%d ",a[i]);
	printf("\n");
}
int main() 
{
	scanf("%d",&n);
	Input();
	SortAscending();
	Output();
}
