#include <stdio.h>
#define input "input.txt"
#define output "output.txt"

FILE *fp;
void readfile(char &c) {
	fp = fopen(input,"r");
	if (fp == NULL) {
		printf("File not found !!!");
	}
	else {
		fscanf(fp,"%c",c);
		fclose(fp);
	}
}
char upper_or_lower(char c)
{
	if ((c >= 'a') && (c <= 'z'))
		return 't';
	else if ((c >= 'A') && (c <= 'Z'))
		return 'h';
	else if ((c >= '0') && (c <= '9'))
		return '1';
}
void writefile(char c) {
	fp = fopen(output,"w");
	fprintf(fp,"%c",upper_or_lower(c));
	fclose(fp);
}
int main()
{
	char c;
	readfile(c);
	writefile(c);
}
