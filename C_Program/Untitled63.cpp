#include <stdio.h>
int KiemTraSoAm(int n, int a[])
{
	int kq = 0, S = 0, i = 0;
	while (i < n)
	{
		if (a[i] < 0)
		{
			kq = 1;
			S = S + a[i];
		}
		i++;
	}
	return kq;
}
int main()
{
	int a[] = {1,2,3,-4,-5};
	int n = 5;
	printf("%d", KiemTraSoAm(n, a));
}
