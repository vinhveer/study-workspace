#include <stdio.h>
int a[100];	
int main()
{
	int n;
	scanf("%d",&n);
	int temp, count;
	for (int i = 0; i < n; i++) 
		scanf("%d",&a[i]);
	temp = a[0];
	for (int i = 1; i < n; i++)
	{
		if (a[i] != temp)
			count += 1;
		temp = a[i];
	}
	printf("%d", count);
}
