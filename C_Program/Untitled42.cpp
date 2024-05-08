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
/*void SortDescending(char *a)
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
}*/
int MaxCountValue(char *a)
{
    int count = 1;
    int max;
    for (int i = 0; i <= strlen(a) - 1; i++)
    {
        if (a[i] == a[i+1])
            count += 1;
        else
			if (count > max)
				max = count;
    }
	return max;
}

int main()
{
	char a[MAX_LEN];
    fgets(a, MAX_LEN, stdin);
    SortAscending(a);
    printf("%d", MaxCountValue(a));
    
    return 0;
}

