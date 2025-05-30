---
sidebar_position: 1
title: "Genie Model"
---


# class GenieModel
A high-level data class that structures all necessary information required by an agent for
optimizing a particular system.


## Definition
```py
class GenieModel(BaseModel):
    hyperparameters: dict[str, Any]
    model_metadata: ModelMetadata
    target_specifications: list[TargetSpec]
    world_control_specifications: list[WorldControlSpec]
```

## Members
- ### `hyperparameters: dict[str, Any]`
    + **Description**: A key-value pair of all user defined hyperparameters that are local to a
    particular model. For more information check [Hyper Parameters](/docs/API/Models/hyper-parameters).

&nbsp;

- ### `model_metadata: ModelMetadata`
    + **Description**: Stores user defined information that is used on the platform and at agent
    initialization. For more information check [Metadata](/docs/API/Models/metadata)

&nbsp;

- ### `target_specifications: list[TargetSpec]`
    + **Description**: Specifications that clearly define what kind of targets an agent was trained
    for/is capable of achieving. Also defines the observation space that is expected by the agent.
    For more information check [Target Specifications](/docs/API/Models/target-specifications).

&nbsp;

- ### `world_control_specifications: list[WorldControlSpec]`
    + **Description**: Specifications that define the action space for an agent. The `order` members
    of each element in the list must be unique across the list for ordering purposes. For more
    information check [World controls](/docs/API/Models/world-controls).