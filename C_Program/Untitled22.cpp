#include <stdio.h>
#define input "input.txt"
#define output "output.txt"

FILE *fp;
int n,i, a[100];
void readfile() {
	fp = fopen(input,"r");
	if (fp == NULL) {
		printf("File not found!!!");
	}
	else {
		fscanf(fp,"%d",&n);
		for (i=0;i<n;i++) {
			fscanf(fp,"%d",&a[i]);
		}
		fclose(fp);
	}
}
int main() {
	readfile();
	for (i=0;i<n;i++) {
		printf("%d",a[i]);
	}
	return 0;
}
