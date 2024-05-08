#include <stdio.h>
int i,j;
void sort(int a[]) 
{
	for (i=0;i<4;i++)
	{
		for (j=0;j<4;j++)
		{
			if (a[i] < a[j])
			{
				int num = a[i];
				a[i] = a[j];
				a[j] = num;
			}
		}
	}
	for (i=0;i<4;i++)
	{
		printf("%d ",a[i]);
	}
}
void max_min(int a[])
{
	int max = 0;
	int min = 0;
	for (i=0;i<4;i++)
	{
		if (max < a[i])
		{
			max = a[i];
		};
		if (min > a[i])
		{
			min = a[i];
		};
	}
	printf("max: %d - min: %d",max,min);
}
int main() 
{
	int array[4] = {2,4,6,8};
	sort(array);
	max_min(array);
}
