#include <stdio.h>
int n, a[100000000];
void Input()
{
	for (int i = 0; i < n; i++)
		scanf("%d",&a[i]);
}
int ConvertNumber(int a)
{
	if (a < 0)
		return a*(-1);
	else
		return a;
}
void SortAscending()
{
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			if (ConvertNumber(a[i]) < ConvertNumber(a[j]))
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
}
void Output() {
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
	return 0;
}
