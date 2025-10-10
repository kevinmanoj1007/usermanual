---
sidebar_position: 3
title: "Target Specifications"
---

# class TargetSpec
A dataclass that captures all necessary data to represent a target that an agent can achieve.


## Definition
```py
class TargetSpec(BaseModel):
    label: str
    description: str

    fn: Literal["min" | "max" | "range" | "equals"]
    kind: Literal["scalar" | "vector" | "series" | "matrix"]
    points: int

    precisions: float | list[float] | list[list[float]]
    order: int
```


## Members
- ### `label: list`
    + **Description**: A unique identifier which can be used to map user defined expressions (on the
    web interface) to actual agent specifications. 

&nbsp;

- ### `description: str`
    + **Description**: Human-readable description describing the purpose of the target specification. For
    informal purposes only.

&nbsp;

- ### `fn: Literal["min" | "max" | "range" | "equals"]`
    + **Description**: Object function that should be used for the particular target.

&nbsp;

- ### `kind: Literal["scalar" | "vector" | "series" | "matrix"]`
    + **Description**: Declare the type of target used for type checking:
        * `scalar`: A single numerical value
        * `vector`: A one-dimensional array of values
        * `series`: A time-series or sequential data structure
        * `matrix`: A two-dimensional array of values

&nbsp;

- ### `points: int`
    + **Description**: Number of points that are required by the target. For `vector` and `series` targets,
    this represents the length. For `matrix` targets, this represents the total number of elements
    (rows × columns). Number of points is not checked when `kind` is `scalar`.

&nbsp;

- ### `precisions: float | list[float] | list[list[float]]`
    + **Description**: Specify the tolerance or precision to which an observation should be optimized to:
        * When `kind` is `scalar`: A single float value
        * When `kind` is `vector` or `series`: A list of float values (one per point)
        * When `kind` is `matrix`: A 2D list (nested list) of float values matching the matrix dimensions
    
    Only applicable for `range` and `equals` objective functions.

&nbsp;

- ### `order: int`
    + **Description**: Used to sort all observations before being provided to the agent, ensures
    data integrity.