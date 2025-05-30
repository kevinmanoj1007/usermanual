---
sidebar_position: 4
---

# Environments
## Explanation
An environment in the context of the ADK is broadly the same as most descriptions of a
reinforcement learning environment. There are however, minimal frameworks and APIs that the ADK
uses heavily. Such use is mostly limited to the [Gymnasium](https://gymnasium.farama.org/index.html)
framework in the ADK's default environments. Users are, however, free to use their own environment
framework of choice as use of Gymnasium is not enforced or required.

An environment is in charge of converting an optimization specification and abstracting it to an RL
specification. This includes handling reward computation logic, action logic, constructing the
observation space and handling interaction with the system itself.

## Creating an environment
A [Base Agent](../API/base-agent.md) provides a default `_make_env()` function to convert
optimization specifications into environment data (environment specifications) that can be used
to initialize a completely custom environment or one of the following default environment
implementations provided with the ADK alike:
1. `"Ai4EE-Direct-Action-Env"`: See [DirectActionEnv](../API/Environments/direct-action-env.md).
2. `"Ai4EE-Clipped-Additive-Action-Env"`: See [ClippedAdditiveActionEnv](../API/Environments/additive-action-env.md).

The default environments can be used as such:
```py
env_data = self.make_env(specification)
env: gymnasium.Env = gymnasium.make(<ENV name>, **kwargs)
```

An abstract environment [OptimizationEnv](../API/Environments/optimization-env.md) is also provided
with the ADK to ease development of custom environments if desired.