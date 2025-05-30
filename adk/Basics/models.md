---
sidebar_position: 3
---

# Models
## Explanation
A model is the ADK's approach to the **D**on't **R**epeat **Y**ourself principle. Models solve the
problem of having to develop / copy-paste the same agent across different directories for each
system being optimized. Instead, the agent can be implemented once and the system-specific details
can be part of the model.

This seperates the concerns between developing a generic algorithm / method to optimize systems
(for an agent), and tuning specific details to optimize a specific system (for a model).

## Creating a model
In the ADK's eyes, a model is a directory within an agent's `models/` directory with the following
contents:
+ `models/`: A directory containing agent specific model files (NN checkpoints, stats, etc.),
completely controlled by the developer.

+ `hyper_parameters.json`: A file containing the hyper-parameters for the agent's training / the
hyper-parameters the agent was trained with. See [Hyper Parameters](../API/Models/hyper-parameters.md)
for more info.

+ `metadata.json`: A file containing the model metadata. See [Metadata](../API/Models/metadata.md)
for more info.

+ `target_specifications.json`: A file containing the target specifications that can be defined
for the model. See [Target Specifications](../API/Models/target-specifications.md) for more info.

+ `world_control_specifications.json`: A file containing the world controls (**controllable parameters**
of the system) that the model can optimize for. See [World Controls](../API/Models/world-controls.md)
for more info.

Run `genie model add` in an agent directory and follow the instructions in order to conveniently
create a model for that agent.

:::note
The `adk` package has to be installed before it and its related tools such as `genie` can be used.
It is highly recommended that one uses a python venv for installing the ADK.
:::

## What next?
Once an agent with the above structure has been successfully created either manually or through
`genie model add`, one can register the model and run the respective model's **agent** and see
the model appear in the platform's model selection dialogue.

The `model` sub-command for `genie` provides a convenient interface for adding, listing,
registering and committing an agent's models, run `genie model` for more info.

[Transfer Learning](./transfer-learning.md) is a section under the Genie tab’s Agent area that allows users to configure model-specific settings through the Model Details page. It includes three sub-sections: Details (showing model name and description), Design Parameter Specification (where users map controllable parameters to model-trained specifications), and Target Specifications (defining output parameters, precision targets, and mapping expressions to model-defined targets). Once configured, users can initiate model transfer into the project environment.
