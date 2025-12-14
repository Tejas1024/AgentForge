import { NextResponse } from 'next/server';

// In-memory storage for metrics (simulates database)
let metricsStore = {
  tasksCompleted: 0,
  successRate: 95.0,
  avgResponseTime: 350,
  activeAgents: 3,
  queuedTasks: 8,
  deployments: 23,
  lastUpdate: new Date().toISOString(),
};

// Simulate real-time changes
function updateMetrics() {
  metricsStore.tasksCompleted += Math.floor(Math.random() * 3);
  metricsStore.successRate = Math.max(90, Math.min(100, 
    metricsStore.successRate + (Math.random() - 0.5) * 2));
  metricsStore.avgResponseTime = Math.max(200, Math.min(600,
    metricsStore.avgResponseTime + (Math.random() - 0.5) * 50));
  metricsStore.activeAgents = Math.max(1, Math.min(10,
    metricsStore.activeAgents + Math.floor(Math.random() * 3) - 1));
  metricsStore.queuedTasks = Math.max(0, Math.min(50,
    metricsStore.queuedTasks + Math.floor(Math.random() * 5) - 2));
  metricsStore.lastUpdate = new Date().toISOString();
}

export async function GET() {
  // Update metrics to simulate real-time changes
  updateMetrics();

  return NextResponse.json({
    success: true,
    data: {
      agentStatus: metricsStore.activeAgents > 0 ? 'Running' : 'Idle',
      tasksCompleted: metricsStore.tasksCompleted,
      successRate: Number(metricsStore.successRate.toFixed(1)),
      avgResponseTime: metricsStore.avgResponseTime,
      activeAgents: metricsStore.activeAgents,
      queuedTasks: metricsStore.queuedTasks,
      deployments: metricsStore.deployments,
      lastUpdate: metricsStore.lastUpdate,
    },
    timestamp: new Date().toISOString(),
  });
}
