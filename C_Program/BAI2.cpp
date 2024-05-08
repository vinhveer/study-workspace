#include <stdio.h>
#include <math.h>

int main() {
	int a,b,c;
	printf("Nhap cac canh tam giac: \n");
	printf("A = ");
	scanf("%d",&a);
	printf("B = ");
	scanf("%d",&b);
	printf("C = ");
	scanf("%d",&c);
	int p = (a + b + c) / 2;
	float s = sqrt(p * (p - a) * (p - b) * (p - c));
	printf("Chu vi tam giac la: %d\n",p*2);
	printf("Dien tich tam giac la: %lf",s);
	return 0;
}
