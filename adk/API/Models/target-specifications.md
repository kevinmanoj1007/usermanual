---
sidebar_position: 5
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
    kind: Literal["scalar" | "vector"]
    points: int

    precisions: float | list[float]
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

- ### `kind: Literal["scalar" | "vector"]`
    + **Description**: Declare the type of target either 'scalar' or 'vector' used for type checking.

&nbsp;

- ### `points: int`
    + **Description**: Number of points that are required by a 'vector' target. Number of points is
    not checked when `kind` is scalar.

&nbsp;

- ### `precisions: float | list[float]`
    + **Description**: Specify the tolerance or precision to which an observation should be optimized to. When
    `kind` is 'vector', expect a list of precisions otherwise a singular number is expected. Only
    applicable for 'range' and 'equals'.

&nbsp;

- ### `order: int`
    + **Description**: Used to sort all observations before being provided to the agent, ensures
    data integrity.
