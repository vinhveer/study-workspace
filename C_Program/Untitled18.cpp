#include <stdio.h>
#define input "input.txt"
#define output "output.txt"

int n;
FILE *fp;
void readfile() {
	fp = fopen(input,"r");
	if (fp == NULL) {
		printf("File not found!!!!");
	}
	else {
		fscanf(fp,"%d",&n);
		fclose(fp);
	}
}
/*void tinhtong() {
	int i,sum = 0;
	for (i=1;i<=n;i++) {
		S += i;
	}
	printf("Tong la %d", S);
}*/
void writefile() {
	fp = fopen(output,"w");
	int i,s = 0;
	for (i=1;i<=n;i++) {
		s += i;
	}
	fprintf(fp,"%d",s);
	fclose(fp);
}
int main() {
	readfile();
	//tinhtong();
	writefile();
	return 0;
}
