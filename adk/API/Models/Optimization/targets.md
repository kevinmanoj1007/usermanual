---
title: TargetSpec
description: Data classes for defining target specifications in optimization processes
sidebar_position: 4
---

# TargetSpec

A base data class that defines the common structure for all target specifications in an optimization process. It provides the target's name and associated objective function used for evaluation.

## Definition

```python
class TargetSpec(BaseModel):
    name: str = Field(min_length=1)
    fn: Fn
```

## Members

### `name: str = Field(min_length=1)`

The unique identifier or name of the target. Must contain at least one character.

### `fn: Fn`

The objective function associated with the target. Defines how the optimization process measures and evaluates success or deviation from desired outcomes.

---

# ValueBounds

Defines the lower and upper numeric limits for a single scalar value used in a target specification.

## Definition

```python
class ValueBounds(BaseModel):
    min: float
    max: float
```

## Members

### `min: float`

Minimum allowable value for the target or observed data.

### `max: float`

Maximum allowable value for the target or observed data.

---

# ScalarTargetSpec

Extends `TargetSpec` to represent a scalar target specification, including bounds for both target and observation values.

## Definition

```python
class ScalarTargetSpec(TargetSpec):
    target_values: ValueBounds
    observation_bounds: ValueBounds
```

## Members

### `target_values: ValueBounds`

The desired target value range that the optimization aims to achieve.

### `observation_bounds: ValueBounds`

The permissible range of observed values during optimization for validation and constraint checking.

---

# VectorTargetSpec

Extends `TargetSpec` to define vector-based targets, supporting multiple elements each with their own bounds.

## Definition

```python
class VectorTargetSpec(TargetSpec):
    target_values: list[ValueBounds]
    observation_bounds: list[ValueBounds]
```

## Members

### `target_values: list[ValueBounds]`

List of value bounds representing the desired range for each element in the target vector.

### `observation_bounds: list[ValueBounds]`

List of value bounds defining acceptable observed ranges for each vector element during optimization.

---

# MatrixTargetSpec

Extends `TargetSpec` to define matrix-based targets for multidimensional optimization objectives.

## Definition

```python
class MatrixTargetSpec(TargetSpec):
    target_values: list[list[ValueBounds]]
    observation_bounds: list[list[ValueBounds]]
```

## Members

### `target_values: list[list[ValueBounds]]`

Nested list of `ValueBounds` defining the target value range for each cell in the matrix target.

### `observation_bounds: list[list[ValueBounds]]`

Nested list of `ValueBounds` defining the acceptable observed range for each matrix element during optimization.