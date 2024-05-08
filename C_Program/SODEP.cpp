#include <stdio.h>

int main() {
	int donvi,chuc,tram,nghin,chucnghin,tramnghin,trieu;
	long n;
	printf("Nhap gia tri n: ");
	scanf("%ld",&n);
	if (n < 1000000) {
		if (n < 10) {
			printf("YES\n");
		}
		else if (n < 100) {
			chuc = n / 10;
			donvi = n % 10;
			if (donvi >= chuc) {
				printf("YES");
			}
			else {
				printf("NO");
			}
		}
		else if (n < 1000) {
			tram = n/100;
			chuc = (n/10) % 10;
			donvi = (n % 10);
			if (donvi >= chuc && chuc >= tram) {
				printf("YES");	
			}
			else {
				printf("NO");
			}
		}
		else if (n < 10000) {
			nghin = n/1000;
			tram = (n/100) % 10;
			chuc = (n%100) / 10;
			donvi = n % 10;
			if (donvi >= chuc && chuc >= tram && tram >= nghin) {
				printf("YES");
			}
			else {
				printf("NO");
			}
		}
		else if (n < 100000) {
			chucnghin = n/10000;
			nghin = (n/1000) % 10;
			tram = (n/100) % 10;
			chuc = (n/10) % 10;
			donvi = n % 10;
			if (donvi >= chuc && chuc >= tram && tram >= nghin && nghin >= chucnghin) {
				printf("YES");
			}
			else {
				printf("NO");
			}
		}
		else if (n < 1000000) {
			tramnghin = n/100000;
			chucnghin = (n/10000) % 10;
			nghin = (n/1000) % 10;
			tram = (n/100) % 10;
			chuc = (n/10) % 10;
			donvi = n % 10;
			if (donvi >= chuc && chuc >= tram && tram >= nghin && nghin >= chucnghin && chucnghin >= tramnghin) {
				printf("YES");
			}
			else {
				printf("NO");
			}	
		}
	}	
	return 0;
}
