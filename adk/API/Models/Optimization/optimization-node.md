---
title: OptimizationNodeSpec
description: Data class for defining optimization node specifications within computational graphs
sidebar_position: 2
---

# OptimizationNodeSpec

A data class that defines the full specification of an optimization node within a computational graph. It describes the parameters, targets, and graph associations required for an optimization task or subsystem.

## Definition

```python
class OptimizationNodeSpec(BaseModel):
    name: str = Field(min_length=1)

    static_parameters: dict[str, DesignParamSpec]
    optimized_parameters: dict[str, DesignParamSpec]
    randomized_parameters: dict[str, DesignParamSpec]

    targets: dict[str, TargetSpec]

    model_config = ConfigDict(arbitrary_types_allowed=True)
    graph: nx.Graph | None
```

## Members

### `name: str = Field(min_length=1)`

The unique identifier or name of the optimization node. Must be at least one character long.

### `static_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters with fixed values that remain constant throughout the optimization process. Each entry maps a parameter name to its corresponding `DesignParamSpec`.

### `optimized_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters that are subject to optimization. These parameters will be tuned or modified by the optimization algorithm to improve performance or meet objectives.

### `randomized_parameters: dict[str, DesignParamSpec]`

Dictionary of parameters that are assigned randomized values. Typically used for stochastic optimization or to introduce variability in simulation runs.

### `targets: dict[str, TargetSpec]`

Collection of optimization targets associated with the node. Each key corresponds to a target name, and each value defines a `TargetSpec` describing its objective function, expected output, and validation rules.

### `model_config = ConfigDict(arbitrary_types_allowed=True)`

Pydantic configuration allowing arbitrary object types such as `networkx.Graph` to be included as model fields without validation errors.

### `graph: nx.Graph | None`

Optional NetworkX graph object representing the connectivity or relationship of the node within the larger optimization graph. Used to define dependencies or system topology.