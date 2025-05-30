---
sidebar_position: 8
title: "Environment Data"
---

# class EnvData
A data class encapsulating environment configuration, control spaces, observation and evaluation callables, and other parameters necessary for agent-environment interaction.

## Definition
```py
class EnvData(BaseModel):
    world_control_space: Box
    targets: dict[str, Target]
    env_var_sampling_spaces: list[Discrete]
    world_observation_space: Box
    env_parameters: EnvParameters
    default_world_controls: Actions
    default_selected_env_parameters: list
    target_specifications: list[TargetSpec]

    step_world: StepWorldCb
    observe_world: Callable[[], dict]
    observe_features: Callable[[], dict]
    evaluate_expression: Callable[[Target, Observations], RuntimeValue]

    specifics: dict[str, Any]
```

## Members
- ### `world_control_space: Box`
    + **Description**: Defines the continuous action space available for world control, represented by a Box.

&nbsp;

- ### `targets: dict[str, Target]`
    + **Description**: A dictionary mapping target names to Target objects specifying optimization or achievement goals.

&nbsp;

- ### `env_var_sampling_spaces: list[Discrete]`
    + **Description**: A list of discrete spaces representing sampling spaces for environment variables.

&nbsp;

- ### `world_observation_space: Box`
    + **Description**: Defines the continuous observation space representing what the agent can observe from the world.

&nbsp;

- ### `env_parameters: EnvParameters`
    + **Description**: Contains environment-specific parameters necessary for simulation or modeling.

&nbsp;

- ### `default_world_controls: Actions`
    + **Description**: Default set of actions or controls applied to the world when no other input is provided.

&nbsp;

- ### `default_selected_env_parameters: list`
    + **Description**: A list representing default selected environment parameters.

&nbsp;

- ### `target_specifications: list[TargetSpec]`
    + **Description**: A list of target specifications detailing what the agent aims to achieve or optimize.

&nbsp;

- ### `step_world: StepWorldCb`
    + **Description**: A callback function to advance the environment state by one step.

&nbsp;

- ### `observe_world: Callable[[], dict]`
    + **Description**: A callable function that, when invoked, returns a dictionary capturing the current observable state of the world/environment.

&nbsp;

- ### `observe_features: Callable[[], dict]`
    + **Description**: A callable function returning a dictionary of extracted features from the environment or system for agent use.

&nbsp;

- ### `evaluate_expression: Callable[[Target, Observations], RuntimeValue]`
    + **Description**: A callable function that evaluates a given target against observations and returns a runtime value indicating performance or reward.

&nbsp;

- ### `specifics: dict[str, Any]`
    + **Description**: A dictionary containing specifics loaded from a Genie-model, providing additional model-dependent data.

&nbsp;