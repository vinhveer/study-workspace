#include <bits/stdc++.h>
using namespace std;
struct ps
{
    int id;
    float tgv;
    float tgcpu;
    float trt;
    float tgkt;
    float tgc;
};
typedef struct ps ps;
bool cmp(ps a, ps b)
{
    if (a.tgv != b.tgv)
        return a.tgv < b.tgv;
    return a.tgcpu < b.tgcpu;
}
int main()
{
    ps pc[] = {{1, 0, 6}, {2, 1, 8}, {3, 0, 4}, {4, 3, 2}};
    int n = sizeof pc / sizeof pc[0], cnt = 1, idx = 0;
    float res = 0, res1 = 0;
    //	cout<<n;
    set<float> s;
    vector<ps> v;
    bool finished[n] = {0}; // de danh dau xem cac phan tu da duoc duyet qua chua
    sort(pc, pc + n, cmp);
    for (int i = 1; i < n; i++)
        s.insert(pc[i].tgcpu);
    pc[0].tgc = 0;
    pc[0].tgkt = pc[0].tgv + pc[0].tgcpu;
    pc[0].trt = pc[0].tgkt - pc[0].tgv;
    res1 = pc[0].trt;
    v.push_back(pc[0]);
    while (cnt < n)
    {
        for (int i = 1; i <= n - 1; i++)
        {
            if (finished[i] == false && pc[i].tgcpu == *s.begin())
            {
                idx++;
                float tmp = *s.begin();
                // tien hanh tinh toan
                v.push_back(pc[i]);
                if (v[idx].tgv < v[idx - 1].tgkt)
                {
                    v[idx].tgc = v[idx - 1].tgkt - v[idx].tgv;
                    v[idx].tgkt = v[idx - 1].tgkt + v[idx].tgcpu;
                    v[idx].trt = v[idx].tgkt - v[idx].tgv;
                    res += v[idx].tgc;
                    res1 += v[idx].trt;
                }
                else
                {
                    v[idx].tgc = 0;
                    v[idx].tgkt = v[idx].tgv + v[idx].tgcpu;
                    v[idx].trt = v[idx].tgkt - v[idx].tgv;
                    res += v[idx].tgc;
                    res1 += v[idx].trt;
                }
                cnt++;
                finished[i] = true;
                s.erase(tmp);
            }
        }
    }
    cout << "\nProcess\t\tBurst Time\tWaiting Time\tTurnaround Time";
    for (int i = 0; i < v.size(); i++)
    {
        cout << "\nP" << v[i].id << fixed << setprecision(2) << "\t\t" << v[i].tgcpu << fixed << setprecision(2) << "\t\t" << v[i].tgc << fixed << setprecision(2) << "\t\t" << v[i].trt;
    }
    cout << fixed << setprecision(2) << "\n\nAverage Waiting Time:" << res / n << endl
         << fixed << setprecision(2) << "\nAverage Turnaround Time:" << res1 / n << endl;
}
