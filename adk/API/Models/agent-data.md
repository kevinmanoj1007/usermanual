---
title: AgentData
description: Data class representing the agent's optimization-related state
sidebar_position: 5
---

# AgentData

A data class representing the agent's optimization-related state.

## Definition

```python
class AgentData(BaseModel):
    optimization_data: OptimizationData

    model_config = ConfigDict(
        arbitrary_types_allowed=True
    )
```

## Members

### `optimization_data: OptimizationData`

Contains all optimization-related information for the agent. This includes the optimization state, parameters, intermediate results, and any data structures required for running or managing the optimization loop.