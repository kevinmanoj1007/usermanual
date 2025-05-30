---
sidebar_position: 3
title: "ClippedAdditiveActionEnv"
---


# class ClippedAdditiveActionEnv
A default environment implementation provided with the ADK. Used to iteratively add the provided
action to the world controls every step. Each episode either terminates or truncates after a maximum
number of steps OR after satisfying the provided targets.


## Import
```py
# The env is registered with Gymnasium in the ADK. No need to specially import.
import adk
import gymnasium

# Make env.
env = gymnasium.make("AI4EE-Clipped-Additive-Action-Env")
```


## Members
- ### `reward_scaling_factors: ArrayLike | None`:
    + **Description**: An array of scaling factors to multiply each sub-reward by for each evaluated
    observation.

&nbsp;

- ### `n_action_intervals: int`:
    + **Description**: The number of intervals to divide the world control space into. i.e. The right
    actions can go from any point in the action to any other point in the action space given that
    a minimum of `n_action_intervals` number of actions are taken.

&nbsp;

- ### `episode_maximum_steps: int`:
    + **Description**: The maximum number of steps that can be taken before the episode is terminated.
    It is highly recommended that this is always set to a value that is larger than or equal to
    the number of action intervals.

&nbsp;

- ### `episode_truncation_reward: float`
    + **Description**: The reward added to the total reward on the step that the maximum number of
    allowed steps within an episode is exceeded.

&nbsp;

- ### `failed_observation_evaluation_reward: float`
    + **Description**: The reward added to the total reward for a step when evaluating an observation
    fails on that step.

&nbsp;

- ### `all_targets_satisfied_reward: float`
    + **Description**: The reward added to the total reward for a step when all targets are satisfied
    on that step.

&nbsp;

- ### `target_generators: list[Callable[[float], list[float]]] | None`
    + **Description**: A list of functions parameterized by a `seed: float`, that return newly
    generated target values after every `reset()`.

&nbsp;

- ### `observation_space: gymnasium.spaces.Box`
    + **Description**: The observation space of the environment. Equivalent to the
    concatenation of the following in order:
    * `low: -world_observation_bounds_diff, high: +world_observation_bounds_diff`: The difference
    between the evaluated observations and equivalence targets. 
    * `world_control_bounds`: The world controls after adding and clipping the given action,
    which resulted in evaluating to the aforementioned observations.

&nbsp;

- ### `action_space: gymnasium.spaces.Box`
    + **Description**: The action space of the environment. Equivalent to the `world_control_space`
    divided by the number of action intervals.


## Methods
- ### step
    + **Description**: Takes a step in the environment with an additive action. The action is added
    to the world controls and the world controls are clipped to the bounds.
    + **Takes**:
        + `step_data: StepData`: The step data with which to run the system. The actions are additively
        computed with clipping, while the stochastic parameters are used directly as-is.
    + **Returns (as a tuple)**:
        + `observations: numpy.typing.NDArray[numpy.float32]`: The observations in the same form
        as described in the `observation_space`.
        + `reward: float`: The reward for the given action. Calculated as through:
            ```
            -1.0 * sum(
                (abs(Equivalence Targets - Evaluated observations) * Reward Scaling Factors) ^ 2
            ) + (
                All Targets Satisfied Reward (if applicable only) +
                Episode Truncation Reward (if applicable only) +
                Failed Observation Evaluation Reward (if applicable only)
            )
            ```
        + `terminated: bool`: Whether or not all the targets were **satisfied** by the computed world controls.
        + `truncated: bool`: Whether or not all the targets were **NOT satisfied** by the computed world controls.
        + `info: dict[str, typing.Any]`: No auxiliary information provided. Always an empty dictionary.

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
