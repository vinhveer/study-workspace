#include <stdio.h>
#define input "input.txt"
#define output "output.txt"
int i,j,n, a[1000];
void sort() {
	for (i=0;i<n;i++) 
	{
		for (j=0;j<n;j++) 
		{
			if (a[i] < a[j])
			{
				int num = a[i];
				a[i] = a[j];
				a[j] = num;
			}
		}
	}
	for (i=0;i<n;i++)
	{
		printf("%d ",a[i]);
	}
}
void max_min(int a[])
{
	int max = 0;
	int min = 0;
	for (i=0;i<4;i++)
	{
		if (max < a[i])
		{
			max = a[i];
		};
		if (min > a[i])
		{
			min = a[i];
		};
	}
	printf("max: %d - min: %d",max,min);
}
FILE *fp;
void readfile() {
	fp = fopen(input,"r");
	if (fp == NULL) {
		printf("File not found !!!");
	}
	else {
		fscanf(fp,"%d",&n);
		for (i = 0; i < n; i++) {
			fscanf(fp,"%d",&a[i]);	
		}
		fclose(fp);
	}
}
void writefile() {
	fp = fopen(output,"w");
	if (fp == NULL) {
		printf("File not found !!!");
	}
	else {
		for (i=0;i<n;i++) {
			fprintf(fp,"%d ",a[i]);
		}
	}
	fclose(fp);
}
int main() {
	readfile();
	sort();
	writefile();
}
