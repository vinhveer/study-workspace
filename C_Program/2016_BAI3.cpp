#include<stdio.h>
 
#define MAX 7
/***** Hàm duy?t du?ng chéo ph? *****/
void diagonale(int a[MAX][MAX],int *i,int *j,int k,int *n)
{
        /***** L?y v? trí di?m k? ti?p ******/
    int i_tmp=*i+k;
    int j_tmp=*j-k;
        /***************************/
        /*** n?u v? trí v?n n?m trong ma tr?n thì ch?y d?c thêm du?ng chéo
              và gán k?t qu?*****(vòng l?p)*/
    while ((    i_tmp>=0) && (j_tmp>=0)
            && (i_tmp<MAX) && (j_tmp<MAX))
    {  
        *n+=1;
        a[i_tmp][j_tmp]=*n;
        i_tmp+=k;
        j_tmp-=k;
    }
        /**** L?y l?i v? trí cu?i c?a quá trình duy?t*******/
    *i=i_tmp-k;
    *j=j_tmp+k;
}
 
int main(void)
{
    int a[MAX][MAX];
   
    int n=2;
    int k=1;  /*  k chi nhan 2 gia tri 1 hay -1 */
    int key=1*(k+1);
    int limit=MAX*MAX;
   
    int i=0;
    int j=1;
   
    a[0][0]=1;
   
    if(k>0)
        a[i][j]=n;
    else{
        a[j][i]=n;
        i^=j^=i^=j;
    }
   
    while (n<=limit) {
        diagonale(a,&i,&j,k,&n);
        k*=-1;
        if (key!=0) {
            if ((i+1)<MAX) {
                i++;
                key=0;
            }
            else {
                j++;
                key=1;
            }
        }
        else {
            if ((j+1)<MAX) {
                j++;
                key=1;
            }
            else {
                i++;
                key=0;
            }
 
        }
        n++;
        a[i][j]=n;
    }
    /*******In k?t qu? *************/
    for (i=0; i<MAX; i++) {
        for (j=0; j<MAX; j++) {
            printf("%d\t",a[i][j]);
        }
        printf("\n");
    }
    printf("\n");
    /*****************************/
    return 0;
}
