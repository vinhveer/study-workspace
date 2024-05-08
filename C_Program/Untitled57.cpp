#include <stdio.h>

#define MAX 100

void Input(int n, int a[]) 
{
	for (int i = 1; i < n; i++)
	{
	    printf("a[%d] = ", i);
	    scanf("%d", &a[i]);
	}
}

void Output(int n, int a[]) 
{
    printf("The sequence of values is: ");
    for (int i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\n");
}

int CheckAscending(int n, int a[])
{
	for (int i = 1; i < n; i++)
		if (a[i - 1] > a[i])
		{
			return 1;
			break;
		}
	return 0;
}

int main()
{
	int n, a[MAX];
	printf("N = ");
	scanf("%d", &n);
	Input(n, a);
	printf("%d\n", CheckAscending(n, a));
	Output(n, a);
}
