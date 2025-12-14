#!/bin/bash

###############################################################################
# AgentForge Complete Project Setup Script
# This script creates ALL project files and directories
# Run this in your GitHub Codespace root directory
###############################################################################

set -e

echo "🚀 AgentForge Project Setup Starting..."
echo "========================================="
echo ""

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p cline-extensions/agent-feature
mkdir -p cline-extensions/agent-test
mkdir -p cline-extensions/bin
mkdir -p kestra-flows
mkdir -p oumi-agent
mkdir -p dashboard/app
mkdir -p data
mkdir -p .github/workflows

echo "✓ Directory structure created"
echo ""

###############################################################################
# Part 1: Root package.json
###############################################################################
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "agentforge",
  "version": "1.0.0",
  "description": "AI agents that write, review, test, and deploy code - while learning from your feedback",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "cline:setup": "cd cline-extensions && npm install && npm link",
    "kestra:start": "docker-compose up -d kestra",
    "kestra:stop": "docker-compose down",
    "oumi:train": "python oumi-agent/train.py",
    "oumi:inference": "python oumi-agent/inference.py",
    "vercel:deploy": "vercel --prod"
  },
  "keywords": [
    "ai",
    "agents",
    "code-generation",
    "reinforcement-learning",
    "automation",
    "devops",
    "cline",
    "kestra",
    "oumi",
    "vercel",
    "coderabbit"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.20.0",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1",
    "axios": "^1.6.5"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0"
  }
}
