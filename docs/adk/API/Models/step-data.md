---
sidebar_position: 9
title: "StepData"
---

# class StepData
A lightweight class used to represent the action taken by the agent and the selected environment parameters at a particular time step.

## Definition
```py
class StepData:
    actions: NDArray
    selected_env_parameters: list
```

## Members
- ### `actions: NDArray`
    + **Description**: An NDArray representing the actions chosen by the agent for the current step.

&nbsp;

- ### `selected_env_parameters: list`
    + **Description**: A list of selected environment parameters applied during this step of the simulation or control cycle.

&nbsp;