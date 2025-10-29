---
title: DesignParamSpec
description: Data classes for defining design parameter specifications, bounds, and configurations
sidebar_position: 1
---

# DesignParamSpec

A data class that defines the complete specification of a design parameter, including its default value and allowable bounds. It supports both continuous and discrete parameter types for flexible optimization setup.

## Definition

```python
class DesignParamSpec(BaseModel):
    bounds: DesignParamBounds
    default: SpecifiedDesignParam
```

## Members

### `bounds: DesignParamBounds`

Defines the valid range or set of values the parameter can take. Can be either continuous (`ContinuousDesignParamBounds`) or discrete (`DiscreteDesignParamBounds`).

### `default: SpecifiedDesignParam`

Specifies the default configuration of the parameter, including its name, location, and initial value.

---

# SpecifiedDesignParam

Defines a single design parameter with a name, internal location, and assigned value. Used to represent the default or user-specified state of a design parameter.

## Definition

```python
class SpecifiedDesignParam(BaseModel):
    name: str = Field(min_length=1)
    location: str
    value: float | str
```

## Members

### `name: str = Field(min_length=1)`

The identifier for the design parameter. Must be at least one character long.

### `location: str`

Internal mapping location for the parameter. Used for inverse mapping or backend referencing within the optimization framework.

### `value: float | str`

The current or default value assigned to the parameter. Can be numeric or string-based, depending on parameter type.

---

# DesignParamBounds

An abstract base class representing a generic boundary definition for design parameters. It serves as a parent class for specific bound types (continuous or discrete).

## Definition

```python
class DesignParamBounds(BaseModel): 
    pass
```

## Members

(No direct members — this class provides a shared interface for bound subclasses.)

---

# ContinuousDesignParamBounds

Defines the lower and upper numeric limits for a continuous design parameter.

## Definition

```python
class ContinuousDesignParamBounds(DesignParamBounds):
    min: float
    max: float
```

## Members

### `min: float`

Minimum allowable numeric value for the parameter.

### `max: float`

Maximum allowable numeric value for the parameter.

---

# DiscreteDesignParamBounds

Defines a finite set of discrete permissible values for a design parameter.

## Definition

```python
class DiscreteDesignParamBounds(DesignParamBounds):
    possibilities: list[float | str]
```

## Members

### `possibilities: list[float | str]`

A list of valid discrete values the parameter can take. Each element can be a float or string, depending on the parameter's nature.