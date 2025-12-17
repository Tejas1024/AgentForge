// Cline CLI Integration for AgentForge
// Autonomous coding agent with VS Code integration

const clineAgentConfig = {
  name: 'AgentForge Autonomous Agent',
  version: '1.0.0',
  description: 'VS Code extension for autonomous code generation and task execution',
  capabilities: [
    'code-generation',
    'file-creation',
    'code-execution',
    'error-fixing',
    'testing-automation'
  ],
  commands: [
    {
      command: 'agentForge.generateCode',
      title: 'Generate Code',
      category: 'AgentForge'
    },
    {
      command: 'agentForge.executeTask',
      title: 'Execute Task',
      category: 'AgentForge'
    },
    {
      command: 'agentForge.analyzeCode',
      title: 'Analyze Code',
      category: 'AgentForge'
    }
  ]
};

module.exports = clineAgentConfig;
