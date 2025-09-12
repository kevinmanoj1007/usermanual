---
sidebar_position: 2
---

# Preprocessing

## Preprocessing

Preprocessing is an optional but important component of the Genie model. It allows users to intercept and transform data exchanged between the agent and the environment at various points in the optimization loop.

Preprocessing is defined by a **preprocessor class**, which must inherit from BasePreprocessor. This class can override methods to modify agent data, specifications, observations, step data, or environment outputs before they are consumed or stored by the agent.