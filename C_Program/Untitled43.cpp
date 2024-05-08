#include <stdio.h>
#include <string.h>

#define MAX_LEN 100000
void SortStr(char *s)
{
	for (int i = 0; i < len(*s) - 1; i++)
		for (int j = 1; j < len(*s) - 1; j++)
			if (s[i] > s[j])
			{
				int temp = s[i];
				s[i] = s[j];
				s[j] = temp;
			}
}
int CheckStrValue(char *s1, *s2)
{
	int count = 0;
	char value = '';
	int max = 0;
	for (i = 0; i < n; i++)
		if (a[i] = a[i+1])
			count += 1;
		else
		{
			if (count > max)
				max = count;
				value = a[i];
			count = 0;			
		}
	return value;	
}

