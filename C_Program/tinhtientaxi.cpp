#include <stdio.h>

int main() {
	int km;
	printf("Nhap vao so km: ");
	scanf("%d",&km);
	double sotien = 0;
	int kmcon;
	if (km <= 1) {
		printf("Tien taxi phai tra la: %d",15000);
	}
	else if (km >= 120) {
		sotien = 15000 + 4*13500 + (km - 5)*11000;
		printf("Tien taxi phai tra la: %8.0lf", sotien + sotien*0,1);
	}
	else if (km >=2 && km <=5) {
		printf("Tien taxi phai tra la: %d",15000 + (km - 1)*13500);
	}
	else if (km >= 6) {
		printf("Tien taxi phai tra la: %d",15000 + 4*13500 + (km - 5)*11000);
	}
	return 0;
}
