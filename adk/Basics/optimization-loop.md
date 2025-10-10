---
sidebar_position: 8
---


# Optimization Loop

## What is the optimization loop?

The optimization loop is a loop that is continuously run until:
1. An agent is finished learning.
2. A learnt agent is finished optimizing a system.
3. Optimization / training is manually stopped midway through optimization / training with "Stop Optimization".

The optimization loop is always started with "Start Optimization" on the web interface's "Genie" in a project.

## Key Components

The optimization loop involves two primary components:

- **`agent`**: The reinforcement learning agent that learns to optimize the system. It has methods like:
  - `agent.step(observation, info)`: Computes the action based on current state
  - `agent.sample_env_parameters()`: Samples environment parameters
  - `agent.add_experiences(...)`: Stores transition data for learning
  - `agent.learn()`: Updates the agent's policy based on experiences
  - `agent.save_models()`: Saves the current model weights
  - `agent.load_models()`: Loads previously saved model weights

- **`agent.env`**: The environment representing the system being optimized. It has methods like:
  - `agent.env.reset()`: Resets the environment to initial state, returns `observation` and `info`
  - `agent.env.step(step_data)`: Executes an action in the environment, returns `next_observation`, `reward`, `terminated`, `truncated`, and `next_info`

## Optimization Loop Flow

The optimization loop broadly follows this sequence in the ADK's executor routine:

```python
# 1. Setup phase
specification = get_optimization_specification_from_platform()
specification = process_specification(specification)  # Preprocess specifications

agent = initialize_agent(specification)
env = agent.env

# 2. Environment initialization
observation, info = env.reset()
observation, info = process_env_reset(observation, info)  # Preprocess initial state

# 3. Load models if running in inference mode
if specification.mode == "inference":
    agent.load_models()

# 4. Main optimization loop
best_episode_reward = -float('inf')
episode_reward = 0

while optimizing:
    # Compute action from agent
    action = agent.step(observation, info)
    
    # Sample environment parameters
    env_parameters = agent.sample_env_parameters()
    
    # Construct and preprocess step data
    step_data = construct_step_data(action, env_parameters)
    step_data = process_agent_step_data(step_data)  # Preprocess step data
    
    # Execute step in environment
    next_observation, reward, terminated, truncated, next_info = env.step(step_data)
    
    # Preprocess environment response
    next_observation, reward, terminated, truncated, next_info = process_env_step(
        next_observation, reward, terminated, truncated, next_info
    )
    
    # Store experience for learning (training mode only)
    if specification.mode == "training":
        agent.add_experiences(
            observation, action, reward, next_observation, 
            terminated, truncated, info, next_info
        )
        
        # Learn from experiences
        agent.learn()
    
    # Accumulate episode reward
    episode_reward += reward
    
    # Update current state
    observation = next_observation
    info = next_info
    
    # Handle episode termination
    if terminated or truncated:
        # In inference mode, stop after first episode completion
        if specification.mode == "inference" and terminated:
            break
        
        # In training mode, save models if this episode is the best so far
        if specification.mode == "training" and episode_reward > best_episode_reward:
            agent.save_models()
            best_episode_reward = episode_reward
        
        # Reset environment for next episode
        observation, info = env.reset()
        observation, info = process_env_reset(observation, info)  # Preprocess reset state
        episode_reward = 0

# 5. Cleanup
finalize_optimization()
```

## Preprocessing Integration

Preprocessing is integrated throughout the optimization loop to ensure data consistency and proper formatting:

1. **Specification preprocessing** (`process_specification`)
   - Applied once at the start to validate and transform optimization specifications

2. **Environment reset preprocessing** (`process_env_reset`)
   - Applied after each `env.reset()` call
   - Transforms initial observations and info before agent processes them

3. **Step data preprocessing** (`process_agent_step_data`)
   - Applied before each `env.step()` call
   - Ensures action and environment parameters are properly formatted

4. **Environment step preprocessing** (`process_env_step`)
   - Applied after each `env.step()` call
   - Transforms observations, rewards, and info before they're used by the agent

## Model Persistence

Models are loaded and saved at specific points in the optimization loop:

- **Loading**: Models are loaded once at the beginning if running in inference mode
- **Saving**: Models are saved during training whenever an episode achieves a new best reward, ensuring that only improved versions are persisted