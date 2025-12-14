import { NextResponse } from 'next/server';

export async function GET() {
  const risks = [
    { id: '1', name: 'SQL Injection', severity: 'critical', score: 9.5, status: 'active' },
    { id: '2', name: 'XSS Vulnerability', severity: 'high', score: 8.2, status: 'active' },
    { id: '3', name: 'CSRF Protection Missing', severity: 'high', score: 7.8, status: 'pending' },
    { id: '4', name: 'Weak Password Policy', severity: 'medium', score: 6.5, status: 'inactive' },
    { id: '5', name: 'Outdated Dependencies', severity: 'medium', score: 6.1, status: 'active' },
  ];

  const totalScore = risks.reduce((sum, risk) => sum + risk.score, 0);
  const avgScore = totalScore / risks.length;

  const summary = {
    overall_risk_score: Number(avgScore.toFixed(1)),
    total_risks: risks.length,
    critical: risks.filter(r => r.severity === 'critical').length,
    high: risks.filter(r => r.severity === 'high').length,
    medium: risks.filter(r => r.severity === 'medium').length,
    low: risks.filter(r => r.severity === 'low').length,
    risk_level: avgScore > 7 ? 'high' : avgScore > 5 ? 'medium' : 'low',
  };

  return NextResponse.json({
    success: true,
    data: { risks, summary },
    timestamp: new Date().toISOString(),
  });
}
