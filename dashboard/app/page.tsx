'use client';

import { useState, useEffect } from 'react';

interface AgentStatus {
  status: 'active' | 'idle' | 'training';
  successRate: number;
  avgResponseTime: number;
}

const mockAgents = {
  cline: { status: 'active', successRate: 95.2, avgResponseTime: 1240 },
  kestra: { status: 'active', successRate: 92.8, avgResponseTime: 2150 },
  oumi: { status: 'training', successRate: 87.5, avgResponseTime: 3400 },
};

export default function Dashboard() {
  const [agents, setAgents] = useState(mockAgents);
  const [metrics, setMetrics] = useState({
    totalTasks: 1523,
    completedTasks: 1448,
    failedTasks: 45,
    activeAgents: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 10),
        completedTasks: prev.completedTasks + Math.floor(Math.random() * 9),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">AgentForge Dashboard</h1>
          <p className="text-slate-400">Real-time AI Agent Monitoring & Control Center</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Tasks" value={metrics.totalTasks} />
          <MetricCard title="Completed" value={metrics.completedTasks} />
          <MetricCard title="Failed" value={metrics.failedTasks} />
          <MetricCard title="Active Agents" value={metrics.activeAgents} />
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AgentCard name="Cline CLI Agent" data={agents.cline} />
          <AgentCard name="Kestra Workflow" data={agents.kestra} />
          <AgentCard name="Oumi RL Training" data={agents.oumi} />
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem text="Cline agent completed 156 code generation tasks" time="2 mins ago" />
            <ActivityItem text="Kestra workflow executed deployment pipeline" time="5 mins ago" />
            <ActivityItem text="Oumi RL training epoch 7/10 completed" time="8 mins ago" />
            <ActivityItem text="Dashboard metrics updated" time="30 secs ago" />
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur hover:border-slate-600 transition">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}

function AgentCard({ name, data }: { name: string; data: AgentStatus }) {
  const statusColor = data.status === 'active' ? 'bg-green-500/20 text-green-300' : data.status === 'training' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-500/20 text-gray-300';
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {data.status}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-slate-400 text-sm">Success Rate</p>
          <div className="flex items-center mt-1">
            <div className="flex-1 bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.successRate}%` }}></div>
            </div>
            <span className="text-white ml-2 text-sm font-medium">{data.successRate}%</span>
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Avg Response Time</p>
          <p className="text-white font-semibold mt-1">{data.avgResponseTime}ms</p>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-between items-start pb-3 border-b border-slate-700/50 last:border-0">
      <p className="text-slate-300">{text}</p>
      <p className="text-slate-500 text-sm whitespace-nowrap ml-4">{time}</p>
    </div>
  );
}
