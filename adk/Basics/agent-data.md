---
sidebar_position: 7
---

# Agent Data
## Explanation
Agent Data is a data structure containing all the data generally required for an agent to optimize
a system. Agent data contains the following information:
+ **Inference**: A boolean signifying if the agent is learning how to optimize the system or an already
learnt agent is being used to optimize the system.

+ **Genie Model**: Information regarding the model that was selected for the optimization. This includes
the hyper parameters, metadata, target specifications and world control specifications. See
[Models](models.md) for more info.
