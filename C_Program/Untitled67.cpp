#include <iostream>
#include <omp.h>

using namespace std;

void bubble_sort(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (arr[i] > arr[j])
            {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

void selection_sort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min_idx])
            {
                min_idx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}

int main()
{
    int n = 10;
    int arr[n] = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
    double start_time = omp_get_wtime();

#pragma omp parallel num_threads(2)
    {
#pragma omp sections
        {
#pragma omp section
            {
                bubble_sort(arr, n);
            }
#pragma omp section
            {
                selection_sort(arr, n);
            }
        }
    }

    double end_time = omp_get_wtime();
    cout << "Time taken: " << end_time - start_time << " seconds" << endl;

    cout << "Sorted array: ";
    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}

