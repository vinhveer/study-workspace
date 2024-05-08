#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
char c[10000];
int main(){
	gets(c);
	int cnt=1;
	printf("%d",strlen(c));
	for(int i=0;i<strlen(c)-1;i++){
		for(int j=i+1;j<strlen(c)-1;j++){
			if(c[j]==c[i]){
				printf("%c",c[j]);
				cnt=0;
				// danh dau la da co r
				break;
			}
		}
	}
	if(cnt){
		printf("NONE");
	}
}
