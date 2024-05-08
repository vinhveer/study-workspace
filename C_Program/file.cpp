#include <stdio.h>

int main() {
    int n = 5;
    int *arr[n]; 
    for (int i = 0; i < n; i++)
    {
    	printf("a[%d] = ", i);
    	scanf("%d", (arr + i));
    	printf("%d ", *arr[i]);
	}
    return 0;
}

