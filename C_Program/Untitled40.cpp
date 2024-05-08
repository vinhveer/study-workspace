#include <stdio.h>
#include <math.h>
int ktra(int n)
{
	int max1=-1e9-1,max2=-1e9-1;
	if(n > max1)
	{
		max2 = max1;
		max1 = n;
    }
    else if(n > max2)
    	max2 = n;
    return max1, max2;
}
int main(){
	int n;
	scanf("%d",&n);
	int a[100];
	for(int i = 0; i < n; i++){
		scanf("%d", &a[i]);
	}
	for(int i=0; i < n;i++){
    	printf("%d %d",ktra(a[i]));
	}
}
