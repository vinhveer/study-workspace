#include <iostream>
#include <vector>

using namespace std;

int main() {
    int count;
    vector<long long int> array;
    cin >> count;

    for (int i = 0; i < count; i++) {
        long long int num;
        cin >> num;
        array.push_back(num);
    }

    int count_pairs = 0;

    for (int i = 0; i < count; i++) {
        for (int j = i; j < count; j++) {
            long long int sum = array[i] + array[j];
            if (sum % 2 == 0) {
                count_pairs++;
            }
        }
    }

    cout << count_pairs << endl;

    return 0;
}

