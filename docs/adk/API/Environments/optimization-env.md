---
sidebar_position: 1
title: "OptimizationEnv"
---


# class OptimizationEnv
Abstract class to define an environment for interacting with optimizable systems. Highly recommended
for custom environments and heavily used in default environments alike.


## Import
```py
from adk.envs.optimization_env import OptimizationEnv
```


## Members
- ### `world_observation_bounds: gymnasium.spaces.Box`
    + **Description**: The bounds of the observable parameters of the system being optimized.

    :::warning
    The `world_observation_bounds` are not necessarily a 1:1 mapping to the `observation_space` /
    observation bounds constructed by an implementation environment.
    :::

&nbsp;

- ### `world_control_bounds: gymnasium.spaces.Box`
    + **Description**: The bounds of the controllable parameters of the system being optimized.

    :::warning
    The `world_control_bounds` are not necessarily a 1:1 mapping to the `action_space` /
    action bounds constructed by an implementation environment.
    :::

&nbsp;

- ### `default_raw_world_controls: models.actions.Actions`
    + **Description**: The default, raw, **unevaluated** world controls provided by the specification.

&nbsp;

- ### `default_world_controls: numpy.typing.NDArray[numpy.float32]`
    + **Description**: The default, **evaluated** world controls provided by the specification.

&nbsp;

- ### `targets: dict[str, models.optimization_model.Target]`
    + **Description**: The targets that are desired to be achieved provided by the specification.
    See `TODO: refer to Target` for more info.


## Methods
- ### evaluate_observations
    + **Description**: Evaluate raw observations. (Converts raw observations into a numpy array)
    + **Takes**:
        + `raw_world_observations: models.observations.Observations`: The raw observations to be
        evaluated, usually obtained from `step_world`.
    + **Returns**:
        + `evaluated_observations: numpy.typing.NDArray[numpy.float32]`: The evaluated observations
        in a numpy array.

&nbsp;

- ### evaluate_world_controls
    + **Description**: Evaluate raw world controls / actions. (Converts raw world controls into a numpy array)
    + **Takes**:
        + `raw_world_controls: models.actions.Actions`: The raw actions to be evaluated.
    + **Returns**:
        + `evaluated_actions: numpy.typing.NDArray[numpy.float32]`: The evaluated actions in a numpy array.

&nbsp;

- ### step_world
    + **Description**: Sets the stochastic and controllable parameters of the system to the provided
    stochastic parameters and world controls, then returns the raw observations obtained from those
    stochastic parameters and world controls.
    + **Takes**:
        + `step_data: StepData`: The stochastic parameters and world controls to be set before running
        the system and obtaining the raw observations.
    + **Returns**:
        + `raw_world_observations: models.observations.Observations`: The raw observations obtained
        from running the system with the given world controls.

&nbsp;

- ### satisfied_targets
    + **Description**: Evaluates evaluated observations to an array of booleans signifying the
    targets that are satisfied according to the `targets` member.
    + **Takes**:
        + `evaluated_observations: numpy.typing.NDArray[numpy.float32]`: The evaluated observations
        that will be evaluated against the targets.
    + **Returns**:
        + `targets_satisfied: numpy.typing.NDArray[numpy.bool_]`: An array of booleans signifying
        whether or not each evaluated observation met the respective, corresponding target specification.

&nbsp;

- ### construct_equivalence_targets
    + **Description**: Evaluates an array of "equivalence target"s from the `targets` member. Useful
    for calculating distances from different intended target types, i.e. (Range, Min, Max).
    + **Takes: Nothing**
    + **Returns**:
        + `equivalence_targets: numpy.typing.NDArray[numpy.float32]`: The equivalence targets constructed
        from the `targets` member.
