#include <stdio.h>
#include <string.h>

#define MAX_LEN 100000

void SortAscending(char *a)
{
    for (int i = 0; i < strlen(a); i++)
        for (int j = 0; j < strlen(a); j++)
        {
            if (a[i] < a[j])
            {
                char temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
}
void SortDescending(char *a)
{
    for (int i = 0; i < strlen(a); i++)
        for (int j = 0; j < strlen(a); j++)
        {
            if (a[i] > a[j])
            {
                char temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
}
void CountValue(char *a)
{
    int count = 1;
    for (int i = 0; i <= strlen(a) - 1; i++)
    {
        if (a[i] == a[i+1])
            count += 1;
        else
        {
            printf("%c %d\n", a[i], count);
            count = 1;
        }
    }
    printf("\n");
}

int main()
{
	char a[MAX_LEN];
    fgets(a, MAX_LEN, stdin);
    SortAscending(a);
    CountValue(a);
    SortDescending(a);
    CountValue(a);
    return 0;
}

