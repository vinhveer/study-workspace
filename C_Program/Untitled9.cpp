#include <stdio.h>
#include <math.h>

int main() {
    int a, b, c, delta;
    scanf("%d%d%d",&a,&b,&c);
 	delta = pow(b,2) - 4*a*c;
    if (delta < 0) {
        printf("NO");
    }
    else if (delta < 0 && a != 0) {
    	printf("INF");    
    }
    else if (delta == 0) {
        printf("%0.2f",-b/(2*a));
    }
    else if (delta > 0) {
    	double x1 = (-b+sqrt(delta))/(2*a);
    	double x2 = (-b-sqrt(delta))/(2*a);
        printf("%0.2f",x1);
        printf("%0.2f",x2);
    }
    return 0;
}
