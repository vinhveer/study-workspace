#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int laSoNguyenTo(int n) {
    if (n < 2) return 0;
    for (int i = 2; i <= sqrt(n); i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

void nhapMang(int *a, int *n) {
    do {
        printf("Nhap so phan tu cua mang (2 <= n <= 50): ");
        scanf("%d", n);
    } while (*n < 2 || *n > 50);

    for (int i = 0; i < *n; i++) {
        printf("Nhap phan tu thu %d: ", i+1);
        scanf("%d", (a+i));
    }
}

void xuatMang(int *a, int n) {
    printf("Mang: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", *(a+i));
    }
    printf("\n");
}

void chenPhanTu(int *a, int *n, int x, int y) {
    if (y < 0 || y > *n) {
        printf("Vi tri chen khong hop le!\n");
        return;
    }
    for (int i = *n; i > y; i--) {
        *(a+i) = *(a+i-1);
    }
    *(a+y) = x;
    (*n)++;
}

void chenPhanTuSapXep(int *a, int *n, int x) {
    int i = *n-1;
    while (i >= 0 && *(a+i) > x) {
        *(a+i+1) = *(a+i);
        i--;
    }
    *(a+i+1) = x;
    (*n)++;
}

void xoaPhanTu(int *a, int *n, int y) {
    if (y < 0 || y >= *n) {
        printf("Vi tri xoa khong hop le!\n");
        return;
    }
    for (int i = y; i < *n-1; i++) {
        *(a+i) = *(a+i+1);
    }
    (*n)--;
}

void xoaCacSoNguyenTo(int *a, int *n) {
    for(int i = 0; i < *n; i++) {
        if(laSoNguyenTo(*(a+i))) {
            xoaPhanTu(a, n, i);
            i--;
        }
    }
}

int main() {
    int a[50];
    int n;

    nhapMang(a, &n);
    xuatMang(a, n);

    int x, y;
    printf("Nhap gia tri can chen: ");
    scanf("%d", &x);
    printf("Nhap vi tri can chen: ");
    scanf("%d", &y);
    chenPhanTu(a, &n, x, y);
    xuatMang(a, n);

    printf("Nhap gia tri can chen: ");
    scanf("%d", &x);
    printf("Nhap vi tri can chen: ");
    scanf("%d", &y);
    chenPhanTuSapXep(a, &n, x);
	xuatMang(a, n);

	printf("Nhap vi tri can xoa: ");
	scanf("%d", &y);
	xoaPhanTu(a, &n, y);
	xuatMang(a, n);

	xoaCacSoNguyenTo(a, &n);
	xuatMang(a, n);

	return 0;
}
