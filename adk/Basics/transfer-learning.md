---
sidebar_position: 4
---

# Transfer Learning

Within every project, under the **Genie** tab, the **Agent** section provides access to a feature called **Model Details**. This feature allows users to explore and configure various aspects of the model being used in the optimization process. The page is organized into three sub-sections:

### 1. Details

This section presents basic information about the model:
- **Model Name** – The name assigned to the current model.
- **Model Description** – A brief explanation or summary of what the model is and its purpose.

### 2. Design Parameter Specification

In this section, users can:
- **Map Controllable Parameters** – Map specific controllable parameters to the [specifications](adk\API\Models\specifications.md) the model was trained on.  

Each controllable parameter is linked to a particular model, ensuring an accurate optimization setup.

### 3. Target Specifications

This section outlines the expected outputs and objectives of the model:
- **Observation Space Parameters** – Defines the output variables being monitored during the optimization.
- **List of Precisions** – Includes specific precision targets for the output parameters.
- **Map Target Expressions** – Users must also map each expression to the [target specification](adk\API\Models\target-specifications.md) defined by the model, similar to how it's done in the design parameter section.  

After reviewing or editing these settings, users can proceed by clicking the **Initiate model transfer** button to begin transferring the model to the current project environment for optimization.