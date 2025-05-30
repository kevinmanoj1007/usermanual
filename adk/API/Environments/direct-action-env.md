---
sidebar_position: 2
title: "DirectActionEnv"
---


# class DirectActionEnv
A default environment implementation provided with the ADK. Directly sets the world controls to the
provided action every step. Each episode either terminates or truncates on the first step.


## Import
```py
# The env is registered with Gymnasium in the ADK. No need to specially import.
import adk
import gymnasium

# Make env.
env = gymnasium.make("AI4EE-Direct-Action-Env")
```


## Members
- ### `reward_scaling_factors: ArrayLike | None`:
    + **Description**: An array of scaling factors to multiply each sub-reward by for each evaluated
    observation.

&nbsp;

- ### `all_targets_not_satisfied_reward: float`
    + **Description**: The reward added to the total reward for a step when all the targets are
    not satisfied on that step.

&nbsp;

- ### `failed_observation_evaluation_reward: float`
    + **Description**: The reward added to the total reward for a step when evaluating an observation
    fails on that step.

&nbsp;

- ### `all_targets_satisfied_reward: float`
    + **Description**: The reward added to the total reward for a step when all targets are satisfied
    on that step.

&nbsp;

- ### `observation_space: gymnasium.spaces.Box`
    + **Description**: The observation space of the environment. Equivalent to the
    concatenation of the following in order:  
    * `world_observation_bounds`: The evaluated observations after taking a given action.  
    * `world_control_bounds`: The given action evaluating to the aforementioned observations.  
    * `world_observation_bounds`: The equivalence targets corresponding to each evaluated observation.

&nbsp;

- ### `action_space: gymnasium.spaces.Box`
    + **Description**: The action space of the environment. Equivalent to the `world_control_space`.


## Methods
- ### step
    + **Description**: Takes a step in the environment with a direct action and stochastic parameters.
    The world controls and stochastic parameters are directly set to the provided action and parameters,
    then the system is run.
    + **Takes**:
        + `step_data: StepData`: The step data with which to run the system.
    + **Returns (as a tuple)**:
        + `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form
        as described in the `observation_space`.
        + `reward: float`: The reward for the given action. Calculated as through:
            ```
            -1.0 * sum(
                (abs(Equivalence Targets - Evaluated observations) * Reward Scaling Factors) ^ 2
            ) + (
                All Targets Satisfied Reward (if applicable only) +
                All Targets Not Satisfied Reward (if applicable only)
            )
            ```
            in the case that observation evaluation fails, it is calculated using:
            ```
            (
                All Targets Not Satisfied Reward +
                Failed Observation Evaluation Reward
            )
            ```
        + `terminated: bool`: Whether or not all the targets were **satisfied** by the given action.
        + `truncated: bool`: Whether or not all the targets were **NOT satisfied** by the given action.
        Necessarily **true** if `terminated` is **false**.
        + `info: dict[str, typing.Any]`: No auxiliary information provided. Always an empty dictionary.

        :::note
        Since `truncated` is guaranteed to be true whenever `terminated` is false, this indeed
        means each episode is only 1 step. This is intended as being able to directly set the world
        controls means there are no future consequences to bad actions, therefore, not requiring
        iterative optimization over multiple steps.
        :::

&nbsp;

- ### reset
    + **Description**: Resets the env. Initially uses randomly sampled world controls.
    + **Takes**:
        + `seed: int | None`: The seed for random sampling. Ignored even if provided.
        + `options: dict[str, typing.Any] | None`: Additional information for reset. Ignored even
        if provided.
    + **Returns (as a tuple)**:
        + `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form
        as described in the `observation_space`. Constructed with random world controls.
        + `info: dict[str, typing.Any]`: No auxiliary information provided. Always an empty dictionary.

&nbsp;

- ### render
    + **Description**: Render the environment state. Currently unsupported. All calls to this method
    are ignored.
    + **Takes: Nothing**
    + **Returns**:
        + `rendered_frame: None`: Just a `None`.
