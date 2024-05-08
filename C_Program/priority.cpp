#include <bits/stdc++.h>
using namespace std;

struct Process
{
    int id;
    float arrival_time;
    float burst_time;
    int priority;
    float turnaround_time;
    float waiting_time;
    float completion_time;
};

bool compare(Process a, Process b)
{
    if (a.arrival_time != b.arrival_time)
        return a.arrival_time < b.arrival_time;
    return a.priority < b.priority;
}

typedef struct Process Process;

int main()
{
    Process processes[] = {{1, 0, 6, 3}, {2, 1, 8, 1}, {3, 0, 4, 2}, {4, 3, 2, 4}};
    int num_processes = sizeof processes / sizeof processes[0];
    int cnt = 1, idx = 0;
    float total_waiting_time = 0, total_turnaround_time = 0;
    set<float> unique_priorities;
    vector<Process> scheduled_processes;
    bool finished[num_processes] = {0};
    sort(processes, processes + num_processes, compare);
    for (int i = 1; i < num_processes; i++)
        unique_priorities.insert(processes[i].priority);
    processes[0].completion_time = 0;
    processes[0].turnaround_time = processes[0].burst_time + processes[0].arrival_time;
    processes[0].waiting_time = processes[0].turnaround_time - processes[0].burst_time;
    total_turnaround_time = processes[0].turnaround_time;
    scheduled_processes.push_back(processes[0]);
    while (cnt < num_processes)
    {
        for (int i = 1; i <= num_processes - 1; i++)
        {
            if (finished[i] == false && processes[i].priority == *unique_priorities.begin())
            {
                idx++;
                float tmp = *unique_priorities.begin();
                scheduled_processes.push_back(processes[i]);
                if (scheduled_processes[idx].arrival_time < scheduled_processes[idx - 1].turnaround_time)
                {
                    scheduled_processes[idx].waiting_time = scheduled_processes[idx - 1].turnaround_time - scheduled_processes[idx].arrival_time;
                    scheduled_processes[idx].completion_time = scheduled_processes[idx - 1].turnaround_time + scheduled_processes[idx].burst_time;
                    scheduled_processes[idx].turnaround_time = scheduled_processes[idx].completion_time - scheduled_processes[idx].arrival_time;
                    total_waiting_time += scheduled_processes[idx].waiting_time;
                    total_turnaround_time += scheduled_processes[idx].turnaround_time;
                }
                else
                {
                    scheduled_processes[idx].waiting_time = 0;
                    scheduled_processes[idx].completion_time = scheduled_processes[idx].arrival_time + scheduled_processes[idx].burst_time;
                    scheduled_processes[idx].turnaround_time = scheduled_processes[idx].completion_time - scheduled_processes[idx].arrival_time;
                    total_waiting_time += scheduled_processes[idx].waiting_time;
                    total_turnaround_time += scheduled_processes[idx].turnaround_time;
                }
                cnt++;
                finished[i] = true;
                unique_priorities.erase(tmp);
            }
        }
    }
    cout << "\nProcess\t\tBurst Time\tWaiting Time\tTurnaround Time";
    for (int i = 0; i < scheduled_processes.size(); i++)
    {
        cout << "\nP" << scheduled_processes[i].id << fixed << setprecision(2) << "\t\t" << scheduled_processes[i].burst_time << fixed << setprecision(2) << "\t\t" << scheduled_processes[i].waiting_time << fixed << setprecision(2) << "\t\t" << scheduled_processes[i].turnaround_time;
    }
    cout << fixed << setprecision(2) << "\n\nAverage Waiting Time:" << total_waiting_time / num_processes << endl
         << fixed << setprecision(2) << "\nAverage Turnaround Time:" << total_turnaround_time / num_processes << endl;
}