#include <bits/stdc++.h>
using namespace std;
const int p = 5;
const int r = 3;
int need[p][r];
int idx=0;
// p la hang r la cot
void calculatedNeed(int max[p][r], int all[p][r])
{
	for (int i = 0; i < p; i++)
	{
		for (int j = 0; j < r; j++)
		{
			need[i][j] = max[i][j] - all[i][j];
		}
	}
}

bool check(int max[p][r], int all[p][r], int av[r])
{
	// day la input dau vao
	// tao 1 cai mang fn de xem cac phan tu da duoc duyet ha chua
	
	calculatedNeed(max, all);
	cout<<"Content Need Matrix"<<endl;
	cout<<"   Need"<<endl<<"   A "<<"B "<<"C"<<endl;
	// p hang voi r cot
	for(int i=0;i<p;i++){
		cout<<"P"<<i<<" ";
		for(int j=0;j<r;j++){
			cout<<need[i][j]<<" ";
		}
		cout<<endl;
	}
	cout<<"Content Allocation Matrix"<<endl;
	cout<<"   Allocation"<<endl<<"   A "<<"B "<<"C"<<endl;
	// p hang voi r cot
	for(int i=0;i<p;i++){
		cout<<"P"<<i<<" ";
		for(int j=0;j<r;j++){
			cout<<all[i][j]<<" ";
		}
		cout<<endl;
	}
	cout<<"Content Work Table"<<endl;
	cout<<"   Work"<<endl<<"   A "<<"B "<<"C";
	bool finished[p] = {0};
	int safe[p] = {0}, cnt = 0, work[r] = {0};
	for (int i = 0; i < r; i++)
	{
		work[i] = av[i];
	}
	while (cnt < p)
	{
		bool check1 = false;
		for (int i = 0; i < p; i++)
		{
			if (finished[i] == 0)
			{
				// tuc la tien trinh i no chua duoc tham
				int j;
				for (j = 0; j < r; j++)
				{
					if (need[i][j] > work[j])
						break;
				}
				if (j == r)
				{
					cout<<endl;
					cout<<"P"<<idx<<" ";
					for (int k = 0; k < r; k++){
						work[k] += all[i][k];
						cout<<work[k]<<" ";
					}
					idx++;
					finished[i] = true; // danh dau la da gap roi
					safe[cnt++] = i;	// de luu tien trinh
					check1 = true;
				}
			}
		}
		if (check1 == false)
		{
			cout << "The System is not safe";
			return false;
		}
	}
	// no ma chay ra duoc toi day thi he thong an toan
	cout<<endl;
	cout << "The system is safe"<<endl<<"The system allocation sequence is:";
	for (int i = 0; i < p; i++)
	{
		cout<<"P"<< safe[i] << " ";
	}
	return true;
}
int main()
{
	int av[] = {3, 3, 2};

	int max[][r] = {{7, 5, 3},
					{3, 2, 2},
					{9, 0, 2},
					{2, 2, 2},
					{4, 3, 3}};

	int all[][r] = {{0, 1, 0},
					{2, 0, 0},
					{3, 0, 2},
					{2, 1, 1},
					{0, 0, 2}};
	check(max, all, av);
}
