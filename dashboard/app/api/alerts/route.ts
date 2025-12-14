import { NextResponse } from 'next/server';

interface Alert {
  id: string;
  type: 'security' | 'performance' | 'error';
  severity: string;
  message: string;
  timestamp: string;
}

export async function GET() {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'security',
      severity: 'CRITICAL',
      message: 'Privilege Escalation - Admin endpoint accessible via manipulated headers',
      timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    },
    {
      id: '2',
      type: 'performance',
      severity: 'HIGH',
      message: 'API Response Time Degradation - avg 850ms (threshold: 500ms)',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: '3',
      type: 'security',
      severity: 'HIGH',
      message: 'CORS Bypass Attempt - Request from unauthorized origin detected',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    },
  ];

  return NextResponse.json({
    success: true,
    data: {
      alerts,
      summary: {
        total: alerts.length,
        critical: alerts.filter(a => a.severity === 'CRITICAL').length,
        high: alerts.filter(a => a.severity === 'HIGH').length,
      },
    },
    timestamp: new Date().toISOString(),
  });
}
