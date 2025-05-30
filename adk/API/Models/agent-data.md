---
sidebar_position: 6
title: "Agent Data"
---

# class AgentData
A data class representing the agent's operational mode and the associated Genie model.

## Definition
```py
class AgentData(BaseModel):
    inference: bool
    genie_model: GenieModel
```

## Members
- ### `inference: bool`
    + **Description**: A boolean indicating if the agent is running in inference mode (True) or not (False).

&nbsp;

- ### `genie_model: GenieModel`
    + **Description**: Holds the GenieModel instance that defines the model's hyperparameters, metadata, target specifications, and world control specifications used by the agent.

&nbsp;
