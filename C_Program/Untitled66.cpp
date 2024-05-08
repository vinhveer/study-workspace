#include <stdio.h>
#include <stdlib.h>

void Input(int n, int *a)
{
    for (int i = 0; i < n; i++)
    {
        printf("a[%d] = ", i);
        scanf("%d", (a + i));
    }
}

void Output(int n, int *a)
{
    for (int i = 0; i < n; i++)
        printf("%d ", *(a + i));
    printf("\n");
}

int MaxNegative(int n, int *a)
{
    int max = -1;
    for (int i = 0; i < n; i++)
        if (*(a+i) < 0 && *(a+i) > max)
            max = *(a+i);
    return max;  
}

void Swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

void SortAscending(int n, int *a)
{
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (*(a+i) > *(a+j))
                Swap((a+i), (a+j));
}

void NegativeDescending(int n, int *a, int *pos)
{
    *pos = 0;
    
    for (int i = 0; i < n; i++)
        if (*(a+i) < 0)
            (*pos)++;
            
    for (int i = 0; i < *pos; i++)
        for (int j = i + 1; j < *pos; j++)
            if (*(a+i) < *(a+j))
                Swap((a+i), (a+j));
}

void SplitArray(int n, int *a, int pos, int *negative, int *positive)
{
    int i = 0;
    while (i < pos)
    {
        *(negative + i) = *(a + i);
        i++;
    }
    i = 0;
    while (pos < n)
    {
        *(positive + i) = *(a + pos);
        pos++;
        i++;
    }
}

int main()
{
    int *a, n;
    printf("N = ");
    scanf("%d", &n);
    a = (int*) malloc(n*sizeof(int));
    Input(n, a);
    Output(n, a);
    SortAscending(n, a);
    Output(n, a);
    int pos = 0;
    NegativeDescending(n, a, &pos);
    int *positive = (int*) malloc((n - pos)*sizeof(int));
    int *negative = (int*) malloc(pos*sizeof(int));
    SplitArray(n, a, pos, negative, positive);
    Output(pos, negative);
    Output(n - pos, positive);
    free(a);
    free(negative);
    free(positive);
    return 0;
}
