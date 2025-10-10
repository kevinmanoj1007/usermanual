---
sidebar_position: 5
---

# Preprocessing

Preprocessing is an optional but important component of the [Genie model](adk\API\Models\genie-model.md). It allows users to intercept and transform data exchanged between the agent and the environment at various points in the optimization loop.

Preprocessing is defined by a **preprocessor class**, which must inherit from BasePreprocessor. This class can override methods to modify [agent data](adk\API\Models\agent-data.md), specifications, observations, [step data](adk\API\Models\step-data.md), or environment outputs before they are consumed or stored by the agent.

# Location of the Preprocessor

Each [Genie model](adk\API\Models\genie-model.md) may optionally include its own preprocessor file, located at:
```
models/<model_name>/preprocessor.py
```

If this file is present, it will be loaded automatically by the platform when the [Genie model](adk\API\Models\genie-model.md) is initialized.

If no preprocessor file is found, a default identity preprocessor (which performs no modifications) is used instead.