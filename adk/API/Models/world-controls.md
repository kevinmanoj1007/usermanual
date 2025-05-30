---
sidebar_position: 3
title: "World Controls"
---

# class WorldControlSpec
A dataclass that is helpful in defining the action space and mapping design parameters.


## Definition
```py
class WorldControlSpec(BaseModel):
    label: str
    description: str
    order: int
```


## Members
- ### `label: str`
    + **Description**: A unique identifier which can be used to map user defined world controls
    (on the web interface) to actual agent specifications.

&nbsp;

- ### `description: str`
    + **Description**: Human-readable description describing the purpose of this world control. For
    informal purposes only.

&nbsp;

- ### `order: int`
    + **Description**: Used to sort world controls before being provided to the agent, ensures data
    integrity.