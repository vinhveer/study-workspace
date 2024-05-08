#include <stdio.h>
int n, a[1000];
void Input()
{
	for (int i = 0; i < n; i++)
		scanf("%d",&a[i]);
}
void SortAscending()
{
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			if (a[i] < a[j])
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
}
void SortDescending()
{
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			if (a[i] > a[j])
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
	SortDescending();
	Output();
	return 0;
}
