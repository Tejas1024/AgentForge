# AgentForge - AI Agents Assemble Hackathon

## Project Overview
AgentForge is a complete AI agent automation platform leveraging 5 sponsor technologies for intelligent code generation, workflow automation, and continuous learning.

## Sponsor Technologies

1. **Cline CLI** ($5,000) - Autonomous code generation agent
2. **Kestra Workflows** ($4,000) - AI-powered workflow orchestration
3. **Oumi RL Training** ($3,000) - Reinforcement learning fine-tuning
4. **Next.js Dashboard** ($2,000) - Real-time monitoring dashboard
5. **CodeRabbit** ($1,000) - Automated PR code reviews

**Total Potential Awards: $15,000**

## Quick Start
npm install && pip install -r requirements.txt

## Files
- cline-extensions/agent-feature/index.js - Code generation
- kestra-flows/deployment-decision.yml - Workflow automation
- oumi-agent/train.py - RL training
- app/page.tsx - Dashboard

## Live Deployments

- **Next.js Dashboard**: https://agentforge-dashboard.vercel.app
  - Status: ✅ LIVE - Real-time Dashboard Operational
  - Development: https://fantastic-orbit-q77pj9p36669-3000.app.github.dev/ (GitHub Codespaces)
- Features: Real-time metrics polling (5s), Live API integration, Alert system, Multi-agent monitoring
  - Real-time metrics monitoring for AI agents

## Deployment Links

- Dashboard: [agentforge-dashboard.vercel.app](https://agentforge-dashboard.vercel.app)
- GitHub Repository: [Tejas1024/AgentForge](https://github.com/Tejas1024/AgentForge)

## Dashboard Fixes Applied

✅ **Real-time Metrics Implementation**
- Created `dashboard/.env.local` with API configuration
- Implemented React useEffect hooks for automatic API polling (5-second intervals)
- Added real-time state management for metrics and alerts
- Integrated Live/Demo mode indicator for API connection status

✅ **Fixed Issues:**
- Removed static mock data - now fetches live data from API
- Added automatic refresh mechanism (setInterval for metrics and alerts)
- Implemented proper error handling with fallback states
- Added environment variable configuration for API endpoints
- Fixed missing useEffect dependencies for continuous updates

✅ **Testing & Deployment:**
- Built successfully with Next.js 14.2.35 (`npm run build`)
- Dev server running with real-time updates (`npm run dev`)
- GitHub Codespaces deployment verified
- All API endpoints responding with 200 status codes

