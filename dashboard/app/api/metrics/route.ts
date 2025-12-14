import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Return mock metrics data
  const metrics = {
    totalTasks: Math.floor(Math.random() * 2000) + 1000,
    completedTasks: Math.floor(Math.random() * 1800) + 1000,
    failedTasks: Math.floor(Math.random() * 100),
    activeAgents: 3,
    clineMetrics: {
      status: 'active',
      successRate: 95.2 + Math.random() * 4,
      responseTime: 1240 + Math.random() * 200,
      tasksCompleted: 156,
    },
    kestraMetrics: {
      status: 'active',
      successRate: 92.8 + Math.random() * 5,
      responseTime: 2150 + Math.random() * 300,
      workflowsRun: 42,
    },
    oumiMetrics: {
      status: 'training',
      successRate: 87.5 + Math.random() * 6,
      responseTime: 3400 + Math.random() * 500,
      epoch: 7,
    },
  };

  return NextResponse.json(metrics, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
