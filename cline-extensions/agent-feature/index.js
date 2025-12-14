const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

class AgentFeature {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async generateFeature(featureName, description) {
    console.log(`🤖 Generating feature: ${featureName}`);
    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Generate complete code for: ${featureName}\nDescription: ${description}`
      }]
    });
    return response.content[0].text;
  }

  async saveFile(filename, content) {
    fs.writeFileSync(filename, content);
    console.log(`✅ Created: ${filename}`);
  }
}

module.exports = AgentFeature;
