#include <stdio.h>
#define MAX_ARR 10000
int i,j;
int Input(int a[][],int x, int y)
{
	for (i = 0; i < x; i++)
		for (j = 0; j < y; j++)
			scanf("%d",&a[i][j]);
}
int Output(int a[][], int x, int y)
{
	for (i = 0; i < x; i++)
		printf("\n");
		for (j = 0; j < y; j++)
			printf("%d ",a[i][j]);
}
int main()
{
	int x,y;
	int a[MAX_ARR][MAX_ARR];
	scanf("%d %d",&x,&y);
	Input(a,x,y);
	Output(a,x,y);
}
