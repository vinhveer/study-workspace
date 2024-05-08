#include <stdio.h>
int main()
{
	int n,S,ksc,t;
	for (t = 1; t <= 1000; t++)
	{
		S=0;
		n=t;
	while(n!=0)
	{
		ksc=n%10;
		S+=ksc;
		n=n/10;
	}
	if(S%3==0)
		printf("%d ", t);
	}
	return 1;
}
