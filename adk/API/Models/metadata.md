---
sidebar_position: 2
title: "Metadata"
---

# class ModelMetadata

A data class that is used to define and manage key information of a [Genie Model](adk\API\Models\genie-model.md).

## Definition

```py
class ModelMetadata(BaseModel):
    name: str
    description: str
    specifics: dict[str, Any]
    
    nn_arch: dict[str, Any]
    
    is_public: bool = False
    is_global: bool = False
    is_graph_instrumented: bool = False
    state: Literal["learning" | "learnt"]
    
    bypass: bool = False
```

## Members

* ### `name: str`
   * **Description**: Name of the model. Completely user controlled.

&nbsp;

* ### `description: str`
   * **Description**: Human-readable description describing the purpose of the model. For informal purposes only.

&nbsp;

* ### `specifics: dict[str, Any]`
   * **Description**: Developer defined data that is loaded and provided by ADK. There are no restrictions on how this object can be structured, and it is the developer's responsibility to interpret and handle the structure accordingly.

&nbsp;

* ### `nn_arch: dict[str, Any]`
   * **Description**: The Neural Network architecture. This is used to contruct the neural network at runtime dynamically (as opposed to hardcoding it in the code). As of now there are no restrictions on how this object can be structured, and it is the developer's responsibility to interpret and handle the structure accordingly.

&nbsp;

* ### `is_public: bool = False`
   * **Description**: Declares whether the model should be visible to users other than the user that the model's agent was registered through. See [registering a model](adk\what-to-do-next.md) for more information.

&nbsp;

* ### `is_global: bool = False`
   * **Description**: Declares whether the model is used in a global optimization (Needs access to more than one optimizable system in the same optimization run).

&nbsp;

* ### `is_graph_instrumented: bool = False`
   * **Description**: Declares whether the optimization loop should produce and support extracting internal system features at the beginning, and during the optimization of a system.

&nbsp;

* ### `state: Literal["learning" | "learnt"]`
   * **Description**: Indicates whether the model is training of inferencing.

&nbsp;

* ### `bypass: bool = False`
   * **Description**: When set to `True`, bypasses all type checking, validations, and safeguards implemented by the ADK. This mode disables:
     * World control specifications mapping and validation
     * Target specifications mapping and validation
     * Input/output type checking
     * Data structure validations
     * Safety constraints
   
   This is useful for advanced use cases such as data collection, testing, benchmarking, or when you need full control over the optimization process without framework restrictions. Use with caution as it removes protective measures that ensure correct model behavior.