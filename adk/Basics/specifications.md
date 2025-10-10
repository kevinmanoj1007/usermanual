---
sidebar_position: 6
---


# Specifications
## Explanation
A specification is a data structure containing all the data required for an agent-environment pair
to optimize a system. This includes the following information:
+ **Design Parameters / [World Controls](adk\API\Models\world-controls.md)**: Information regarding the controllable parameters of the system
and the restrictions placed on them that must be adhered to as it is optimized.

+ **Targets**: Information regarding the criteria that must be optimized for and the restrictions
within which the system is considered optimized.

+ **[Genie Model](adk\API\Models\genie-model.md)**: Information regarding the model that was selected for the optimization. This includes
the [hyper parameters](adk\API\Models\hyper-parameters.md), [metadata](adk\API\Models\metadata.md), [target specifications](adk\API\Models\target-specifications.md) and [world control](adk\API\Models\world-controls.md) specifications. See
[Models](models.md) for more info.

+ **Observe System (routine)**: Method regarding how the system's measurable parameters are to be
observed during optimization.

+ **Observe Features (routine)**: Method regarding how the system's internal features are to be observed
during optimization.

+ **Step System (routine)**: Method regarding how the system's controllable parameters are to be set
during optimization.

+ **Evaluate observation (routine)**: Method regarding how the measured parameters are to be
interpreted by the agent, and therefere, the environment during optimization. The raw, measured
observations from the system are not relevant to optimization without being evaluated first.

+ **Environment Parameters**: Information regarding the stochastic parameters of the system and the
restrictions placed on them that must be adhered to as it is optimized.