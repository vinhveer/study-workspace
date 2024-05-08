#include <stdio.h>
#include <math.h>
using namespace std;
int main() {
    int a, b, c, delta;
    double x1, x2;
    scanf("%d %d %d",&a, &b, &c);
    delta = pow(b,2) - 4*a*c;
    if(b==0&&c==0) { // Phuong trinh co vo so nghiem
        printf("INF");
    } else {
    if(a==0) { // Giai phuong trinh bac 1 (a==0)
    if(b==0 && c!=0) {
        printf("NO");
    } else {
    	printf("%0.2f",(double) -c/b);
    }        
    } 
	else { // Giai phuong trinh bac 2 (a!=0)
	if(delta<0) {
        printf("NO");
    } else if(delta==0) {
    	printf("%0.2f", (double) -b/2*a);
    } else {
        x1 = (-b - sqrt(delta)) / (2*a); 
        x2 = (-b + sqrt(delta)) / (2*a);
        printf("%0.2f %0.2f",x1,x2);
    }        
    }}
    return 0;
}
