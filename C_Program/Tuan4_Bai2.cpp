#include <stdio.h>

#define MAX 100

void Input(int n, float a[]) 
{
    for (int i = 0; i < n; i++) 
	{
        do 
		{
            printf("a[%d] = ", i);
            scanf("%f", &a[i]);
            if (a[i] < 5 || a[i] > 20)
                printf("The limit value is within the range of 5 between 20. Please try again!\n");
        } while (a[i] < 5 || a[i] > 20);
    }
}

void Output(int n, float a[]) 
{
    printf("The sequence of values is: ");
    for (int i = 0; i < n; i++)
        printf("%.1f ", a[i]);
    printf("\n");
}

void MaxElement(int n, float a[]) 
{
    int posmax = 0;
    float max = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] >= max) 
		{
            max = a[i];
            posmax = i;
        }
    printf("Max = %0.2f; Position = %d\n", max, posmax);
}

float AvgArr(int n, float a[]) 
{
    float sum = 0;
    for (int i = 0; i < n; i++)
        sum += a[i];
    return (sum / ((float)n));
}

int main() 
{
    int n;
    float a[MAX];
    do 
	{
        printf("N = ");
        scanf("%d", &n);
        if (n < 3 || n > MAX)
            printf("The limit value is within the range of 3 >= n <= %d. Please try again!\n", MAX);
    } while (n < 3 || n > MAX);

    Input(n, a);
    Output(n, a);
    MaxElement(n, a);
    printf("Average: %.2f\n", AvgArr(n, a));
    return 0;
}
