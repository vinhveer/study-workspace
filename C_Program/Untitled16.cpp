#include <stdio.h>
char upper_or_lower(char c)
{
	if ((c >= 'a') && (c <= 'z'))
		return 't';
	else if ((c >= 'A') && (c <= 'Z'))
		return 'h';
	else if ((c >= '0') && (c <= '9'))
		return '1';
}
int main()
{
	char c;
	scanf("%c",&c);
	printf("%c",upper_or_lower(c));
}
