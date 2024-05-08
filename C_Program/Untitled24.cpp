#include <stdio.h>
#include <string.h>

int main() {
	char str[30];
	printf("str = ");
	fgets(str,sizeof(str),stdin);
	puts(str);
	printf(strrev(str));
	printf("\n");
	strrev(str);
	printf(strlwr(str));
	printf(strupr(str));
	return 0;
}
