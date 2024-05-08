#include <stdio.h>
#include <math.h>
float giaithua(int a) {
	int gt = 1;
	int i;
	for (i=1; i<=a; i++) {
		gt *= i;
	}
	return gt;
}
int main() {
	int n,x,i;
	float mu = 1, g_thua = 1, sum = 1;
	printf("X = ");
	scanf("%d",&x);
	printf("N = ");
	scanf("%d",&n);
	for (i=0; i<=n; i++) {
		mu = pow(x,(2*i+1));
		g_thua = giaithua(2*i+1);
		sum += mu/g_thua;
	}
	printf("Ket qua: %0.2f",sum);
}
