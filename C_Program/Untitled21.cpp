#include <stdio.h>
int check(int n) 
{
	int f,f1,f2;
    f=f1=f2=1;
    while (f >= n)
    {
       f=f1+f2;
       f1=f2;
       f2=f;
    }
    if (f = n) 
		return 1;
    else 
		return 0;
}
int main(){
    int n;
    printf("Nhap n: ");
    scanf("%d",&n);
	printf("%d",check(n));
    return 0;
}
