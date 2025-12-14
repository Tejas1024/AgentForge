import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentForge Dashboard',
  description: 'Real-time AI Agent Monitoring Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
