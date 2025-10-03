---
sidebar_position: 7
title: "Specification"
---

# class Specification
A comprehensive data class that bundles all design, environment, and model parameters along with observation and evaluation callables required for an agent's operation in a given environment.

## Definition
```py
class Specification(BaseModel):
    design_parameters: Actions
    targets: dict[str, Target]
    genie_model: GenieModel
    env_parameters: EnvParameters
    graphs: list[networkx.Graph]
    raw_representations: list[Any] 

    observe_world: Callable[[], dict]
    observe_features: Callable[[], dict]
    step_world: StepWorldCb
    evaluate_expression: Callable[[Target, Observations], RuntimeValue]
```

## Members
- ### `design_parameters: Actions`
    + **Description**: Contains the set of design actions or parameters that define how the system can be manipulated or controlled.

&nbsp;

- ### `targets: dict[str, Target]`
    + **Description**: A dictionary mapping target names to Target objects, specifying what objectives or metrics the agent aims to optimize or achieve.

&nbsp;

- ### `genie_model: GenieModel`
    + **Description**: The GenieModel instance containing the model's hyperparameters, metadata, and specification details relevant to the agent.

&nbsp;

- ### `env_parameters: EnvParameters`
    + **Description**: Parameters describing the environment in which the agent operates, such as configuration or constraints.

&nbsp;

- ### `graphs: list[Graph]`
    + **Description**: A list of Graph objects representing data flows, dependencies, or system architecture relevant to the optimization problem.

&nbsp;

- ### `raw_representations: list[Any]`
    + **Description**: A list of raw data representations or auxiliary information needed internally; the structure and use are context-dependent.

&nbsp;

- ### `observe_world: Callable[[], dict]`
    + **Description**: A callable function that, when invoked, returns a dictionary capturing the current observable state of the world/environment.

&nbsp;

- ### `observe_features: Callable[[], dict]`
    + **Description**: A callable function returning a dictionary of extracted features from the environment or system for agent use. Every element in the dictionary corresponds to a single node in the networkx graph (`specifications.graph`).

&nbsp;

- ### `step_world: StepWorldCb`
    + **Description**: A callback function to advance the state of the environment/world by one step, typically accepting actions or control signals.

&nbsp;

- ### `evaluate_expression: Callable[[Target, Observations], RuntimeValue]`
    + **Description**: A callable function that evaluates a given target against observations and returns a runtime value indicating performance or reward.

&nbsp;