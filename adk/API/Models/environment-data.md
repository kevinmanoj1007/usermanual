---
title: EnvData
description: Data class encapsulating environment configuration and agent-environment interaction parameters
sidebar_position: 6
---

# EnvData

A data class encapsulating environment configuration, control spaces, default control values, observation spaces, target spaces, and other parameters necessary for agent–environment interaction.

## Definition

```python
class EnvData(BaseModel):
    static_world_controls_space: gym.spaces.Dict
    optimized_world_controls_space: gym.spaces.Dict
    randomized_world_controls_space: gym.spaces.Dict

    default_static_world_controls: dict[str, DesignParamValue]
    default_optimized_world_controls: dict[str, DesignParamValue]
    default_randomized_world_controls: dict[str, DesignParamValue]

    world_observations_space: gym.spaces.Dict
    default_world_observations: dict[str, ObservationValue]

    targets_space: gym.spaces.Dict

    step_world: StepWorldCB

    optimization_data: OptimizationData

    extra: dict[str, Any]

    model_config = ConfigDict(
        arbitrary_types_allowed=True
    )
```

## Members

### `static_world_controls_space: gym.spaces.Dict`

Defines the space of static world controls — parameters that remain fixed during execution unless explicitly changed.

### `optimized_world_controls_space: gym.spaces.Dict`

Defines the space of optimized world controls — parameters that the optimization loop is allowed to modify in order to improve performance or meet targets.

### `randomized_world_controls_space: gym.spaces.Dict`

Defines the space of randomized world controls — parameters that are sampled randomly for variability or stochasticity during environment runs.

### `default_static_world_controls: dict[str, DesignParamValue]`

Default values for static world controls used when no explicit static control values are provided.

### `default_optimized_world_controls: dict[str, DesignParamValue]`

Default values for optimized world controls before any optimization process modifies them.

### `default_randomized_world_controls: dict[str, DesignParamValue]`

Default values for randomized world controls, used as baseline values before random sampling is applied.

### `world_observations_space: gym.spaces.Dict`

Defines the dictionary-based observation space specifying which world variables can be observed and their valid ranges or types.

### `default_world_observations: dict[str, ObservationValue]`

A dictionary containing default observation values, used as an initial or fallback representation of the world's observable state.

### `targets_space: gym.spaces.Dict`

Defines the space of target variables or metrics that the environment or optimization process aims to evaluate.

### `step_world: StepWorldCB`

A callback function responsible for advancing the environment by one step, updating world state and observations.

### `optimization_data: OptimizationData`

Contains optimization-related information such as current optimization state, parameters, intermediate results, and metadata used by the optimization loop.

### `extra: dict[str, Any]`

A dictionary for storing additional model-specific or environment-specific metadata, extensions, or configuration parameters.