#include <stdio.h>
#include <math.h>

int nhap(int a[][100], int n, int m) {
    for(int i = 0; i < n; i++) {
        for( int j = 0; j < m; j++) {
            printf("Nhap gia tri cua phan tu o hang %d cot %d: ",i+1 , j+1);
            scanf("%d",&a[i][j]);
        }
    }
}

int in(int a[][100], int n, int m) {
    for(int i = 0; i < n; i++) {
        for( int j = 0; j < m; j++) {
            printf(" %d ",a[i][j]);
        }
        printf("\n");
    }
}

int max(int a[][100], int n, int m) {
    int cp=-1;
    for(int i = 0; i < n; i++) {
        for( int j = 0; j < m; j++) {
            if( cp < a[i][j]) {
                cp = a[i][j];
            }
        }
    }
    return cp;
}

int ktra(int a) {
    if (a < 2) return 0;
    for(int i = 2 ; i <= sqrt(a) ; i++) {
        if (a % i == 0) return 0;
    }
    return 1;
}

int main() {
    int n,m;
    scanf("%d %d",&n,&m);
    int a[&n][&m];
    nhap(a,n,m);
    in(a,n,m);
    printf("Gia tri lon nhat trong mang: %d\n", max(a, n, m)); 
    int count=0;
    for(int i = 0; i < n; i++) {
        for( int j = 0; j < m; j++) {
            if (ktra(a[i][j]) == 1) {
                count++;
            }
        }
    }
    printf("Mang co %d nguyen to", count);
    return 0;
}

