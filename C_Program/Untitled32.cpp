#include <stdio.h>
/*
Cách 2:
int temp = a;
a = b;
b = temp
*/
int HoanVi(int &a, int &b)
{
	a = a + b;
	b = a - b;
	a = a - b;
}
int main()
{
	int a,b,c,d;
	if (a > b)
		HoanVi(a,b);
	if (a > c)
		HoanVi(a,c);
	if (a > d)
		HoanVi(a,d);
	if (b > c)
		HoanVi(b,c);
	if (b > d)
		HoanVi(b,d);
	if (c > d)
		HoanVi(c,d);
	printf("%d %d %d %d",a,b,c,d);
}

