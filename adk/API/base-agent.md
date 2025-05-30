---
sidebar_position: 2
title: "BaseAgent"
---


# class BaseAgent
Abstract class to define interacting with a combined `AgentInterface` and Gymnasium Env at the same
time. This class extends [AgentInterface](agent-interface.md) and
[gymnasium.Env](https://gymnasium.farama.org/api/env/#env).


## Import
```py
from adk.base_agent import BaseAgent
```


## Members

- ### `env: gymnasium.Env | None`
    + **Description**: The internal reference to the Gymnasium Env the `AgentInterface` interacts
    with. May be a custom environment or an instance of a default one provided with the ADK. May
    also be left empty if a completely custom internally handled env is desired. The only
    requirement is that 

    :::warning
    An implementation of `BaseAgent` must still implement the abstract `gymnasium.Env` interface even if
    a completely internal, non-Gymnasium env is used. i.e. `observation_space`, `action_space`,
    `reset()`, `step()`, etc. must all still be implemented even if this `env` member is left as a `None`.
    :::

&nbsp;

- ### `env_data: models.agent.EnvData | None`
    + **Description**: Information relevant to constructing the internal `env` member or other such
    internal environment interface. See (`TODO`: Refer to `Specification` and `make_env` once
    documentation is written) for more info.

&nbsp;

- ### `agent_data: models.agent.AgentData`
    + **Description**: Information relevant to constructing the internal agent interface. See
    (`TODO`: Refer to `AgentData` once documentation is written) for more info.

&nbsp;

- ### `specification: models.agent.Specification`
    + **Description**: Raw target specification for the system being optimized. See (`TODO`: Refer
    to `Specification` once documentation is written) for more info.

## Methods

- ### __init__
    + **Description**: Initialize the agent with the given data and specification.
    + **Takes**:
        + `agent_data: AgentData`: The agent-specific data used for initialization.
        + `specification: Specification`: The environment and behavior specification for the agent.
    + **Returns: Nothing**

&nbsp;

- ### make_env
    + **Description**: Construct a basic env data from a specification. Saves implementations the
    work of having to write a custom function to make an env data from a specification themselves.
    + **Takes**:
        + `specification: models.agent.Specification`: The specification to be "translated" into a
        relevant env data.
    + **Returns**:
        + `env_data: models.agent.EnvData`: The env data constructed from the specification.

&nbsp;

- ### load_sensitivities
    + **Description**: Load the sensitivity calculator's internal state from the specified path on
    the filesystem.
    + **Takes**:
        + `load_from: Path`: The filesystem path from which the state is to be loaded.
    + **Returns: Nothing**

&nbsp;

- ### save_sensitivities
    + **Description**: Save the sensitivity calculator's internal state to the specified path on
    the filesystem.
    + **Takes**:
        + `save_to: Path`: The filesystem path to which the state is to be saved.
    + **Returns: Nothing**

&nbsp;

- ### calculate_sensitivities
    + **Description**: Calculate the world controls - world observation sensitivities.
    + **Takes: Nothing**
    + **Returns**:
        + `sensitivities:`: Calculated sensitivities.

&nbsp;

- ### sample_env_parameters
    + **Description**: Default override for [`sample_env_parameters`](agent-interface.md#sample_env_parameters).
    + **Takes: Nothing**
    + **Returns**:
        + `env_parameters: list`: Randomly sampled stochastic parameters.
