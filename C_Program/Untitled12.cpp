#include <stdio.h>
int i,x;
float giaithua(int a) {
	int gt = 1;
	for (i=1; i<=a; i++) {
		gt *= i;
	}
	return gt;
}
float so_mu(int a, int b) {
	int mu = 1;
	for (i=1; i<=a; i++) {
		mu = mu * b;
	}
	return mu;
}
int main() {
	int n;
	printf("N = ");
	scanf("%d",&n);
	printf("X = ");
	scanf("%d",&x);
	float S = 1;
	for (int j = 0; j <= n; j++) {
		float tu = so_mu(2*j+1,x);
		float mau = giaithua(2*j+1);
		S += tu/mau;
	}
	printf("%0.2f",S);
	return 0;
}
