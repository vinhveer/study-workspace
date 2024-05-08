#include <stdio.h>
int sum = 0;
int sum_of_digits(int n) {
    while (n > 0) {
        sum += n%10;
        n /= 10;
    }
    if (sum % 3 == 0)
    	return 1;
    else
    	return 0;
}
int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
    	if (sum_of_digits(i) == 1)
 			printf("%d", sum);
    	}
    return 0;
}
