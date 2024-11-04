#include <iostream>
#include <vector>
#include <map>
#include <cstdint>
using namespace std;

int max_value(int N, int W, int H, vector<pair<int, int>>& items) {
    map<int, int64_t> dp;
    dp[0] = 0;

    for (int i = 0; i < N; ++i) {
        int w = items[i].first;
        int c = items[i].second;
        auto current_dp = dp;

        for (const auto& [curr_w, curr_c] : current_dp) {
            if (curr_w + w <= W) {
                dp[curr_w + w] = max(dp[curr_w + w], curr_c + c);
            }
        }
    }

    int64_t max_val = 0;
    for (const auto& [weight, value] : dp) {
        max_val = max(max_val, value);
        for (const auto& item : items) {
            if (weight + item.first <= W && item.first <= H) {
                max_val = max(max_val, value + item.second);
            }
        }
    }

    return static_cast<int>(max_val);
}

int main() {
    int N, W, H;
    cin >> N >> W >> H;
    vector<pair<int, int>> items(N);

    for (int i = 0; i < N; i++) {
        cin >> items[i].first >> items[i].second;
    }

    cout << max_value(N, W, H, items) << endl;
    return 0;
}
