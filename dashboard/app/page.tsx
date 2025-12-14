'use client';

import { useState, useEffect } from 'react';

interface Metrics {
  agentStatus: string;
  tasksCompleted: number;
  successRate: number;
  avgResponseTime: number;
  activeAgents: number;
  queuedTasks: number;
  deployments: number;
  lastUpdate: string;
}

interface AgentStatus {
  status: 'active' | 'idle' | 'training';
  successRate: number;
  avgResponseTime: number;
}

interface Alert {
  id: string;
  type: 'security' | 'performance' | 'error';
  severity: string;
  message: string;
  timestamp: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    agentStatus: 'Loading...',
    tasksCompleted: 0,
    successRate: 0,
    avgResponseTime: 0,
    activeAgents: 0,
    queuedTasks: 0,
    deployments: 0,
    lastUpdate: new Date().toISOString(),
  });

  const [agents, setAgents] = useState<Record<string, AgentStatus>>({
    cline: { status: 'idle', successRate: 0, avgResponseTime: 0 },
    kestra: { status: 'idle', successRate: 0, avgResponseTime: 0 },
    oumi: { status: 'idle', successRate: 0, avgResponseTime: 0 },
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics from API
  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      
      const result = await response.json();
      if (result.success && result.data) {
        setMetrics(result.data);
        
        // Update agent statuses based on metrics
        setAgents({
          cline: {
            status: result.data.activeAgents > 0 ? 'active' : 'idle',
            successRate: result.data.successRate,
            avgResponseTime: result.data.avgResponseTime,
          },
          kestra: {
            status: result.data.activeAgents > 1 ? 'active' : 'idle',
            successRate: Math.max(85, result.data.successRate - 5),
            avgResponseTime: result.data.avgResponseTime + 500,
          },
          oumi: {
            status: result.data.activeAgents > 2 ? 'training' : 'idle',
            successRate: Math.max(80, result.data.successRate - 10),
            avgResponseTime: result.data.avgResponseTime + 1000,
          },
        });
        
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to load metrics. Using demo mode.');
      setIsLoading(false);
    }
  };

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      if (!response.ok) throw new Error('Failed to fetch alerts');
      
      const result = await response.json();
      if (result.success && result.data.alerts) {
        setAlerts(result.data.alerts.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    fetchMetrics();
    fetchAlerts();

    // Poll every 5 seconds for real-time updates
    const metricsInterval = setInterval(fetchMetrics, 5000);
    const alertsInterval = setInterval(fetchAlerts, 10000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(alertsInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                AgentForge Dashboard
              </h1>
              <p className="text-slate-400">
                Real-time AI Agent Monitoring & Control Center
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${error ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                <span className="text-sm text-slate-300">
                  {error ? 'Demo Mode' : 'Live'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Last update: {new Date(metrics.lastUpdate).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-300 text-sm">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Agent Status"
            value={metrics.agentStatus}
            isLoading={isLoading}
          />
          <MetricCard
            title="Tasks Completed"
            value={metrics.tasksCompleted}
            isLoading={isLoading}
          />
          <MetricCard
            title="Success Rate"
            value={`${metrics.successRate.toFixed(1)}%`}
            isLoading={isLoading}
          />
          <MetricCard
            title="Active Agents"
            value={metrics.activeAgents}
            isLoading={isLoading}
          />
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AgentCard name="Cline CLI Agent" data={agents.cline} />
          <AgentCard name="Kestra Workflow" data={agents.kestra} />
          <AgentCard name="Oumi RL Training" data={agents.oumi} />
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Activity Feed */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white mb-4">
            System Activity
          </h2>
          <div className="space-y-3">
            <ActivityItem
              text={`Dashboard metrics updated - ${metrics.tasksCompleted} tasks completed`}
              time="Just now"
            />
            <ActivityItem
              text={`Success rate: ${metrics.successRate.toFixed(1)}% (${metrics.activeAgents} agents active)`}
              time="30 secs ago"
            />
            <ActivityItem
              text="Kestra workflow executing deployment pipeline"
              time="2 mins ago"
            />
            <ActivityItem
              text="Oumi RL training epoch in progress"
              time="5 mins ago"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ title, value, isLoading }: { title: string; value: string | number; isLoading: boolean }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur hover:border-slate-600 transition">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      {isLoading ? (
        <div className="h-9 bg-slate-700 animate-pulse rounded mt-2"></div>
      ) : (
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      )}
    </div>
  );
}

function AgentCard({ name, data }: { name: string; data: AgentStatus }) {
  const statusColor =
    data.status === 'active'
      ? 'bg-green-500/20 text-green-300'
      : data.status === 'training'
      ? 'bg-yellow-500/20 text-yellow-300'
      : 'bg-gray-500/20 text-gray-300';

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur hover:border-slate-600 transition">
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
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${data.successRate}%` }}
              ></div>
            </div>
            <span className="text-white ml-2 text-sm font-medium">
              {data.successRate.toFixed(1)}%
            </span>
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

function AlertItem({ alert }: { alert: Alert }) {
  const severityColor =
    alert.severity === 'CRITICAL'
      ? 'text-red-400 bg-red-500/10'
      : alert.severity === 'HIGH'
      ? 'text-orange-400 bg-orange-500/10'
      : 'text-yellow-400 bg-yellow-500/10';

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition">
      <span className={`px-2 py-1 rounded text-xs font-medium ${severityColor}`}>
        {alert.severity}
      </span>
      <div className="flex-1">
        <p className="text-slate-300 text-sm">{alert.message}</p>
        <p className="text-slate-500 text-xs mt-1">
          {new Date(alert.timestamp).toLocaleString()}
        </p>
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