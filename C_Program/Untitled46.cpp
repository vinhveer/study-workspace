#include <stdio.h>

void swap(int *a, int *b)
{
	int temp = *a;
	*a = *b;
	*b = temp;
}
void SortDescending(int *a, int *b, int*c, int *d, int *e)
{
	if (*a < *b)
		swap(a, b);
	if (*a < *c)
		swap(a, c);
	if (*a < *d)
		swap(a, d);
	if (*a < *e)
		swap(a, e);
	if (*b < *c)
		swap(b, c);
	if (*b < *d)
		swap(b, d);
	if (*b < *e)
		swap(b, e);
	if (*c < *d)
		swap(c, d);
	if (*d < *e)
		swap(d, e);
}
int main()
{
	int a, b, c, d, e;
	scanf("%d %d %d %d %d", &a, &b, &c, &d, &e);
	SortDescending(&a, &b, &c, &d, &e);
	printf("%d %d %d %d %d", a, b, c, d, e);
}
