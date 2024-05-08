#include<stdio.h>
#include<math.h>
int main(){
int a, b;
scanf("%d%d", &a, &b);
if (abs(a) <= 1000 && abs(b) <= 1000){
	if (a == 0 && b == 0) {
		printf("INF");
	}
	else if (a == 0 && b != 0) {
		printf("NO");
	}
	else { 
	float x = (double)-b/a;
	printf("%0.2f", x);
	}
	return 0;
	}
}
