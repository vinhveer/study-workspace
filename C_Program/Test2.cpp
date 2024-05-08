#include <stdio.h>
#include <stdlib.h>
int main() {
	FILE *fptr;
	fptr = fopen("D:\program.txt","w");
	if (fptr = NULL) {
		printf("ERROR!");
		exit(1);
	}
	int num;
	scanf("%d",num);
	fprintf(fptr,"%d",num);
	fclose(fptr);
	return 0;
}
