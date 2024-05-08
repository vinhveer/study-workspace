#include <stdio.h>

void TbMonHoc()
{
	float toan, ly, hoa, anh;
	printf("Toan = ");
	scanf("%f", &toan);
	printf("Ly = ");
	scanf("%f", &ly);
	printf("Hoa = ");
	scanf("%f", &hoa);
	printf("Anh = ");
	scanf("%f", &anh);
	printf("%0.2f",((toan + ly + hoa + anh) / 4));
	if (toan >= 5)
		printf("Toan ");
	else if (ly >= 5)
		printf("Ly ");
	else if (hoa >= 5)
		printf("Hoa ");
	else if (anh >= 5)
		printf("Anh");
	printf("\n");
}
void Temperature()
{
	float mon, tue, wed, thu, fri, sat, sun, avgtemp, count;
	printf("Mon: ");
	scanf("%f", &mon);
	printf("Tue: ");
	scanf("%f", &tue);
	printf("Wed: ");
	scanf("%f", &wed);
	printf("Thu: ");
	scanf("%f", &thu);
	printf("Fri: ");
	scanf("%f", &fri);
	printf("Sat: ");
	scanf("%f", &sat);
	printf("Sun: ");
	scanf("%f", &sun);
	avgtemp = (mon + tue + wed + thu + fri + sat + sun) / 7;
	if (mon > avgtemp)
		count += 1;
	if (tue > avgtemp)
		count += 1;
	if (wed > avgtemp)
		count += 1;
	if (thu > avgtemp)
		count += 1;
	if (fri > avgtemp)
		count += 1;
	if (sat > avgtemp)
		count += 1;
	if (sun > avgtemp)
		count += 1;
	printf("TB Nhiet do la: %0.2f ; So cac ngay co nhiet do tren TB la: %0.2f", avgtemp, count);
}
int main()
{
	TbMonHoc();
	Temperature();
	return 0;
}
