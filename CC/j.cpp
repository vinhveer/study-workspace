#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const int MAXN = 100005;
const int LOG = 20;
vector<int> adj[MAXN];
int depth[MAXN];
int up[MAXN][LOG];

void dfs(int v, int p) {
    up[v][0] = p;
    for (int i = 1; i < LOG; ++i) {
        if (up[v][i - 1] != -1) {
            up[v][i] = up[up[v][i - 1]][i - 1];
        } else {
            up[v][i] = -1;
        }
    }
    for (int u : adj[v]) {
        if (u != p) {
            depth[u] = depth[v] + 1;
            dfs(u, v);
        }
    }
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    for (int i = LOG - 1; i >= 0; --i) {
        if (up[u][i] != -1 && depth[up[u][i]] >= depth[v]) {
            u = up[u][i];
        }
    }
    if (u == v) return u;
    for (int i = LOG - 1; i >= 0; --i) {
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    }
    return up[u][0];
}

bool is_simple_path(int x, int y, int z) {
    int lca_xy = lca(x, y);
    int lca_yz = lca(y, z);
    int lca_xz = lca(x, z);
    return (lca_xy == y && lca_yz == y) || (lca_xz == y && lca_yz == y) || (lca_xy == y && lca_xz == y);
}

int main() {
    int n, q;
    cin >> n >> q;
    for (int i = 0; i < n - 1; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    depth[1] = 0;
    fill(up[0], up[0] + MAXN * LOG, -1);
    dfs(1, -1);

    while (q--) {
        int x, y, z;
        cin >> x >> y >> z;
        if (is_simple_path(x, y, z)) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }

    return 0;
}
