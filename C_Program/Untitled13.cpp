#include <stdio.h>
#include <math.h>
int main (){
	int n, t=1,S=0;
	printf("Nhap n: ");
	scanf("%d",&n);
	for(int i=1;i<=n;i++){
		for(int j=1;j<=i;j++){
			t=t*j;
			printf("%d, %d , %d \n",i,j,t);
		}
		S+=t/i;
		printf("S= %d\n",S);
	}
	return 0;
}
