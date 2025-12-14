import { NextResponse } from 'next/server';

interface TestScenario {
  id: string;
  name: string;
  severity: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration: number;
  description: string;
}

function generateScenarios(): TestScenario[] {
  const scenarios = [
    { id: '1', name: 'Auth Bypass', severity: 'HIGH', status: 'passed' as const, duration: 120, description: 'Test authentication bypass vulnerability' },
    { id: '2', name: 'Privilege Escalation', severity: 'CRITICAL', status: 'failed' as const, duration: 450, description: 'Test privilege escalation vulnerability' },
    { id: '3', name: 'Data Injection', severity: 'MEDIUM', status: 'passed' as const, duration: 230, description: 'Test data injection vulnerability' },
    { id: '4', name: 'Rate Limiting', severity: 'LOW', status: 'passed' as const, duration: 85, description: 'Test rate limiting controls' },
    { id: '5', name: 'API Rate Limit Abuse', severity: 'HIGH', status: 'failed' as const, duration: 320, description: 'Test API rate limiting bypass' },
    { id: '6', name: 'Regex DoS', severity: 'MEDIUM', status: 'passed' as const, duration: 210, description: 'Test regex denial of service' },
    { id: '7', name: 'Token Hijack', severity: 'CRITICAL', status: 'failed' as const, duration: 390, description: 'Test token hijacking vulnerability' },
    { id: '8', name: 'CORS Bypass', severity: 'HIGH', status: 'failed' as const, duration: 155, description: 'Test CORS bypass vulnerability' },
    { id: '9', name: 'Input Validation', severity: 'LOW', status: 'passed' as const, duration: 105, description: 'Test input validation' },
  ];
  return scenarios;
}

export async function GET() {
  const scenarios = generateScenarios();
  const summary = {
    total: scenarios.length,
    passed: scenarios.filter(s => s.status === 'passed').length,
    failed: scenarios.filter(s => s.status === 'failed').length,
    running: scenarios.filter(s => s.status === 'running').length,
    pending: scenarios.filter(s => s.status === 'pending').length,
  };

  return NextResponse.json({
    success: true,
    data: { scenarios, summary },
    timestamp: new Date().toISOString(),
  });
}
