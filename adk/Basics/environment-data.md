---
sidebar_position: 6
---

# Environment Data
## Explanation
Environment Data is a data structure containing all the data generally required for most environment
implementations to optimize a system. It is a data structure that is a special excerpt of a
[Specification](specifications.md). Environment data contains the following information:
+ **World Control Space**: The space of the controllable parameters of the system.

+ **Targets**: The actual targets that are to be optimized for.

+ **Environment Variable Spaces**: The sampling spaces of the stochastic parameters of the system.

+ **World Observation Space**: The space of all observable **evaluated** observations.

+ **Environment Parameters**: Raw stochastic parameter information. Rarely used.

+ **Default World Controls**: The default starting state of the optimizable parameters.

+ **Default Selected Environment Parameters**: The default starting state of the stochastic
parameters.

+ **Target Specifications**: The target specifications of the model selected to optimize the system.


+ **Step System (routine)**: Method regarding how the system's controllable parameters are to be set
during optimization.

+ **Observe System (routine)**: Method regarding how the system's measurable parameters are to be
observed during optimization.

+ **Observe Features (routine)**: Method regarding how the system's internal features are to be observed
during optimization.

+ **Evaluate observation (routine)**: Method regarding how the measured parameters are to be
interpreted by the agent, and therefere, the environment during optimization. The raw, measured
observations from the system are not relevant to optimization without being evaluated first.

## Obtaining environment data
A default implementation to construct environment data is provided in BaseAgent's
[`make_env`](../API/base-agent.md#make_env). This environment can be used with the default
environments and may also be used in custom environments if desired.
