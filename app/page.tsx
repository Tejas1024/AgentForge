'use client';

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    agentStatus: 'Running',
    tasksCompleted: 0,
    successRate: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    // Fetch metrics from API
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">AgentForge Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-600 p-6 rounded-lg">
          <h2>Agent Status</h2>
          <p className="text-2xl font-bold">{metrics.agentStatus}</p>
        </div>
        <div className="bg-green-600 p-6 rounded-lg">
          <h2>Tasks Completed</h2>
          <p className="text-2xl font-bold">{metrics.tasksCompleted}</p>
        </div>
        <div className="bg-purple-600 p-6 rounded-lg">
          <h2>Success Rate</h2>
          <p className="text-2xl font-bold">{metrics.successRate}%</p>
        </div>
        <div className="bg-orange-600 p-6 rounded-lg">
          <h2>Avg Response Time</h2>
          <p className="text-2xl font-bold">{metrics.avgResponseTime}ms</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
