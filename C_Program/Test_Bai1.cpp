#include <stdio.h>

void Input(int &year)
{
	printf("Year = ");
	scanf("%d", &year);
}
void CheckLeapYear(int year)
{
	if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
		printf("Nam %d la nam nhuan", year);
	else
		printf("Nam %d khong phai la nam nhuan", year);
}
int main()
{
	int year;
	Input(year);
	CheckLeapYear(year);
	return 0;
}

