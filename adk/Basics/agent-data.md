---
sidebar_position: 9
---

# Agent Data
## Explanation
Agent Data is a data structure containing all the data generally required for an agent to optimize
a system. Agent data contains the following information:
+ **Inference**: A boolean signifying if the agent is learning how to optimize the system or an already
learnt agent is being used to optimize the system.

+ **Genie Model**: Information regarding the model that was selected for the optimization. This includes
the [hyper parameters](adk\API\Models\hyper-parameters.md), [metadata](adk\API\Models\metadata.md), [target specifications](adk\API\Models\target-specifications.md) and [world control](adk\API\Models\world-controls.md) specifications. See
[Models](models.md) for more info.