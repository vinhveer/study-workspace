#include <stdio.h>
#define MAX 100

void OutputArray(int n, int a[]);
void InputArray(int &n, int a[]);
void OutputArray(int n, int a[]);
int MaxNegativeInteger(int n, int a[]);
int SortArray(int n, int a[]);

int main()
{
	int n, a[MAX];
	InputArray(n, a);
	printf("Array: ");
	OutputArray(n, a);
	printf("Max Negative Integer: %d\n", MaxNegativeInteger(n, a));
	SortArray(n, a);
	printf("Array after sort: ");
	OutputArray(n, a);
	return 0;
}

void InputArray(int &n, int a[])
{
	do
	{
		printf("N = ");
		scanf("%d", &n);
	} while (n < 3 || n > 100);
	
	for (int i = 0; i < n; i++)
	{
		printf("a[%d] = ", i);
		scanf("%d", &a[i]);
	}
}

void OutputArray(int n, int a[])
{
	for (int i = 0; i < n; i++)
		printf("%d ", a[i]);
	printf("\n");
}

int MaxNegativeInteger(int n, int a[])
{
	int max_negative = a[0];
	for (int i = 0; i < n; i++)
		if (a[i] < 0)
			if (a[i] > max_negative)
				max_negative = a[i];
	return max_negative;
}

int SortArray(int n, int a[])
{
	int intersection = -1;
	//Sort array in ascending order.
	for (int i = 0; i < n; i++)
		for (int j = i + 1; j < n; j++)
			//Swap a[i] & a[j].
			if (a[i] > a[j])
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
	OutputArray(n, a);
	//Find the intersection of positive and negative integers.
	for (int i = 1; i < n; i++)
		if (a[i - 1] < 0 && a[i] >= 0)
			intersection = i;
	//Sort negative integers in ascending order.
	for (int i = 0; i < intersection; i++)
		for (int j = i + 1; j < intersection; j++)
		//Swap a[i] & a[j].
			if (a[i] > a[j])
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
	//Sort positive integers in Descending order.
	for (int i = intersection; i < n; i++)
		for (int j = i + 1; j < n; j++)
		//Swap a[i] & a[j]
			if (a[i] < a[j])
			{
				int temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
}

