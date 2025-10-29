---
title: OptimizationSpec
description: Data class for defining the overall optimization process configuration and structure
sidebar_position: 3
---

# OptimizationSpec

A data class that defines the overall configuration and structure of an optimization process. It encapsulates all optimization nodes, parameters, targets, and the callable functions responsible for executing optimization steps.

## Definition

```python
class OptimizationSpec(BaseModel):
    inference: bool
    genie_model: str

    optimization_nodes: dict[str, OptimizationNodeSpec]

    static_parameters: dict[str, DesignParamSpec]
    optimized_parameters: dict[str, DesignParamSpec]
    randomized_parameters: dict[str, DesignParamSpec]

    targets: dict[str, TargetSpec]

    step_system: BatchedStepWorldCB
```

## Members

### `inference: bool`

Indicates whether the optimization process is running in inference mode. When `True`, the system performs evaluation without learning or modifying parameters.

### `genie_model: str`

Identifier or name of the Genie model used in the optimization process. Defines the model architecture or behavior under optimization.

### `optimization_nodes: dict[str, OptimizationNodeSpec]`

Dictionary containing the specification of all optimization nodes involved in the process. Each key is a node name, and each value is an `OptimizationNodeSpec` describing that node's configuration, parameters, and targets.

### `static_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters with fixed values that remain constant during optimization. Typically represent system constants or non-tunable configurations.

### `optimized_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters that are actively optimized by the system to achieve the defined objectives.

### `randomized_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters that are randomly varied to introduce diversity or stochastic behavior in the optimization process.

### `targets: dict[str, TargetSpec]`

Dictionary defining the optimization targets. Each entry specifies an objective or goal through a `TargetSpec` that includes its function, type, and expected values.

### `step_system: BatchedStepWorldCB`

A callable function that executes one batched optimization step in the system. It takes as input:

- A dictionary mapping node and parameter names to their respective values (`dict[str, dict[str, DesignParamValue]]`).
- Two boolean flags controlling step behavior (e.g., inference and reset conditions).

It returns a tuple containing:

1. A dictionary of system observations.
2. A dictionary of measured outcomes.
3. A dictionary of additional metadata or runtime outputs.

## Related Type Definitions

### `DesignParamValue = float | str`

Represents a single design parameter value, which can be either numeric or string-based.

### `ObservationValue = float | list[float] | list[list[float]]`

Represents the observed value from the system, supporting scalar, vector, and matrix-like data.

### `StepWorldCB`

A callable for performing a single (non-batched) world step, handling one set of parameters at a time.

### `BatchedStepWorldCB`

A callable for performing a batched world step, processing multiple parameter sets or optimization nodes simultaneously. Returns structured observation, measurement, and metadata dictionaries.