import os
from oumi import RL
from torch import nn

class AgentTrainer:
    def __init__(self):
        self.rl = RL(model='gpt2', learning_rate=0.0001)
        self.reward_model = nn.Sequential(
            nn.Linear(768, 256),
            nn.ReLU(),
            nn.Linear(256, 1)
        )
    
    def train_with_ppo(self, data, epochs=10):
        print("Training Oumi agent with PPO...")
        for epoch in range(epochs):
            loss = self.rl.fit(
                data=data,
                reward_model=self.reward_model,
                algorithm='ppo',
                batch_size=32
            )
            print(f"Epoch {epoch}: Loss={loss:.4f}")
        return self.rl.model
    
    def evaluate(self, test_data):
        print("Evaluating trained model...")
        metrics = self.rl.evaluate(test_data)
        return metrics

if __name__ == '__main__':
    trainer = AgentTrainer()
    data = []  # Load your training data
    model = trainer.train_with_ppo(data)
    metrics = trainer.evaluate([])
    print(f"Training complete. Metrics: {metrics}")
