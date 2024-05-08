#include <stdio.h>
int ThayThe(int a)
{
	a = -20;
	return a;
}
int main()
{
	int a[5] = {9, -3, 0, 1, 6};
	int S = 0;
	for (int i = 0; i < 5; i++)
		if (a[i]>0 && a[i]%2 == 1)
		{
			S += a[i];
		}
	printf("%d", S);
}
