#include <stdio.h>
#include <math.h>
// kiem tra 1 so co phai la so fibonacci ha ko
int check(long long n)
{
	if (n == 0)
		return 1;
	else if (n == 1)
		return 1;
	else
	{
		// tu so fibonacci thu 3
		long long fn1 = 0, fn2 = 1, fn = 0;
		for (int i = 2; i <= 92; i++)
		{
			fn = fn1 + fn2;
			if (fn == n)
			{
				return 1;
			}
			fn1 = fn2;
			fn2 = fn;
		}
	}
}
int main()
{
	int n;
	scanf("%d", &n);
	long long a[n];
	for (int i = 0; i < n; i++)
	{
		scanf("%d", &a[i]);
	}
	for (int i = 0; i < n; i++)
	{
		if (check(a[i]) == 1)
		{
			printf("%d %d", a[i], i);
		}
	}
}
