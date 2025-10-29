---
title: Domain and Optimization Classes
description: Data classes for domain items, optimization steps, nodes, and complete optimization runs
sidebar_position: 10
---

# DomainItem

Represents a single domain element within an optimization step. A DomainItem links a domain, its associated target, and any internal data required during optimization.

## Definition

```python
class DomainItem(BaseModel):
    id: str
    name: str
    domain: Domain
    target_id: str
    connector_key: str

    extract_features: bool

    data: Any
```

## Members

### `id: str`

Unique identifier of the domain item. Used internally to reference and track domain-specific data.

### `name: str`

Human-readable name of the domain item.

### `domain: Domain`

The domain associated with this item. Automatically converted using `Domain.into()` for compatibility with ADK's domain system.

### `target_id: str`

Identifier of the target linked to this domain item. Connects the item to its optimization objective.

### `connector_key: str`

Internal key used to map and reference the domain item during communication or graph traversal.

### `extract_features: bool`

Indicates whether feature extraction must be performed for this domain item during optimization.

### `data: Any`

Internal data stored for the domain item. May include domain-specific configuration, cached results, or metadata.

---

# Step

A data class representing a single optimization step request. It specifies the identifiers and domain items involved in the step.

## Definition

```python
class Step(BaseModel):
    project_id: str
    target_id: str
    optimization_id: str

    is_reset: bool

    domain_items: list[DomainItem]
```

## Members

### `project_id: str`

Identifier of the project that the step belongs to.

### `target_id: str`

Target identifier corresponding to the active optimization goal.

### `optimization_id: str`

Unique identifier of the optimization run.

### `is_reset: bool`

Determines whether this step should reset the environment or system state before execution.

### `domain_items: list[DomainItem]`

List of all domain items needed to execute the step. These contain the domain, target, and internal data required for evaluation.

---

# OptimizationNode

Represents a node in the optimization graph. Each node contains its action/observation spaces, evaluation expressions, and links to child nodes.

## Definition

```python
class OptimizationNode(BaseModel):
    action_space: list
    observation_space: list

    expressions: list[Target]

    graph: Any | None = None
    domain_data: DomainItem | None = None

    children: list["OptimizationNode"]
```

## Members

### `action_space: list`

Defines the action space for this node. Specifies which actions can be applied at this stage of optimization.

### `observation_space: list`

Defines the structure and shape of observations produced by this node.

### `expressions: list[Target]`

List of target expressions (`Target`) associated with this node. These expressions are evaluated to determine optimization quality.

### `graph: Any | None`

Optional graph object linking this node to the broader optimization structure.

### `domain_data: DomainItem | None`

Domain information associated with this node, if applicable.

### `children: list[OptimizationNode]`

List of child nodes in the optimization graph. Enables hierarchical and multi-stage optimization flows.

---

# ActionType

Enum representing the classification of a design parameter within optimization.

## Definition

```python
class ActionType(Enum):
    Static = 1
    Optimized = 2
    Randomized = 3
```

## Members

### `Static = 1`

Parameter remains constant throughout optimization.

### `Optimized = 2`

Parameter is tuned by the optimization algorithm.

### `Randomized = 3`

Parameter is randomly assigned values during optimization.

## Classmethod

### `into(value)`

Converts integers or strings into an `ActionType` enum.

Supports:
- `1`, `"static"` → `ActionType.Static`
- `2`, `"optimized"` → `ActionType.Optimized`
- `3`, `"randomized"` → `ActionType.Randomized`

Raises an error for invalid values.

---

# Optimization

Represents a complete optimization run, including identifiers, configuration, and the root optimization node.

## Definition

```python
class Optimization(BaseModel):
    optimization_id: str
    project_id: str
    target_id: str

    nodes: OptimizationNode

    inference: bool
    genie_model: str
```

## Members

### `optimization_id: str`

Unique ID assigned to the optimization process.

### `project_id: str`

Identifier for the project containing this optimization.

### `target_id: str`

Identifier for the primary target of the optimization.

### `nodes: OptimizationNode`

The root optimization node. Defines the structure, hierarchy, and flow of the entire optimization graph.

### `inference: bool`

Indicates whether the optimization is running in inference-only mode (`True`) or learning mode (`False`).

### `genie_model: str`

Name of the Genie model used for optimization. Determines the runtime model architecture and behavior.