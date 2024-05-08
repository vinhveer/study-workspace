#include<stdio.h>
void echo(int a[], int n){
	for(int i = 0; i < n; i++){
		printf("%d  ",a[i]);
	}
}
void swap(int &a, int &b){
	int tam = a;
	a = b;
	b = tam;
}
void sort(int a[], int n){
	for(int i = 0;i < n-1; i++){
		for(int j = i + 1;j < n; j++){
			if(a[i] > a[j]){
				swap(a[i],a[j]);
			}
		}
	}
}

void uniq(int a[], int n){
	int i = 0;
	int dem = 1;
	int count[n];
	int bk[n];
	int t = 0;
	int j;
	while(i < n){
		for(j = i+1;j < n; j++){
			if(a[i] == a[j]){
				dem++;	
			}
			else{//a[i]!=a[j]
				break;
			}
		}
		bk[t] = a[i];
		count[t] = dem;
		t++;
		dem = 1;
		i = j;
	}
	//in ra mang count va bk
	printf("\nMang cac so khong trung lap: ");
	echo(bk,t);
	printf("\nMang tan suat xuat hien: ");
	echo(count,t);
//	printf("So xuat hien nhieu nhat trong mang: %d voi & lan", bk[max])
	int countmax = 0, valuemax = 0;
	for (i = 0; i < t; i++)
	{
		printf("\ncount: %d; value: %d",count[i],bk[i]);
		if (countmax < count[i])
		{
			countmax = count[i];
			valuemax = bk[i];
		}	
	}
	printf("\nSo xuat hien nhieu nhat trong mang: %d, voi %d lan", valuemax, countmax);
}
int main(){
	int a[]={1,2,3,1,1,5,3,6,3,5,2};
	int n=sizeof(a)/sizeof(a[0]);	
	printf("Mang a: ");
	echo(a,n);
	printf("\nMang sau khi sap xep:");
	sort(a,n);
	echo(a,n);
	uniq(a,n);
}
