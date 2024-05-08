#include <stdio.h>

void add_element(int y[], int x, int n) {
    // T?o m?t m?ng m?i c� k�ch thu?c n+1
    int new_y[n+1];
    
    // Sao ch�p gi� tr? c?a m?ng y sang m?ng m?i
    for (int i = 0; i < n; i++) {
        new_y[i] = y[i];
    }
    
    // Th�m gi� tr? x v�o cu?i m?ng m?i
    new_y[n] = x;
    
    // Sao ch�p gi� tr? c?a m?ng m?i sang m?ng y
    for (int i = 0; i <= n; i++) {
        y[i] = new_y[i];
    }
}

int main() {
    int y[] = {1, 2, 3, 4, 5};
    int x = 2;
    int n = 5;
    
    add_element(y, x, n);
    
    // In m?ng y sau khi th�m ph?n t?
    for (int i = 0; i <= n; i++) {
        printf("%d ", y[i]);
    }
    
    return 0;
}

