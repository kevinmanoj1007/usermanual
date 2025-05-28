---
sidebar_position: 7
---

# Genie

The **Genie** section allows you to optimize your circuit design using AI agents. You can select an AI agent to perform optimization tasks based on your circuit's specifications and parameters.

---

## Optimization with AI Agents

- **Select AI Agent**: Choose from a range of AI agents available to optimize your circuit's performance. The AI agent will automatically adjust variables and parameters to improve the circuit's efficiency, stability, or performance based on predefined criteria.

---

## Available Actions

- **View Log File**: Access the detailed log of the optimization process. This log contains valuable insights into how the AI agent performed the optimization and any changes made to the circuit.
- **Download Netlist**: Download the netlist generated after the optimization process. This netlist reflects the changes made by the AI agent.
- **Import from File**: Import a previously saved Genie configuration or parameters to continue optimization or modify settings.
- **Export to File**: Save the current Genie settings and optimization results to a file for future use or sharing.

---

## Scalar Measurements and Expressions

You can also use the scalar measurements taken earlier in the **Design Parameters** section and combine them with symbols to create expressions for further optimization. This allows for dynamic adjustments based on real-time data and simulation results.

---

This section enables advanced optimization features using AI and enhances the flexibility of your circuit design process.

## Transfer Learning

Within every project, under the **Genie** tab, the **Agent** section provides access to a feature called **Model Details**. This feature allows users to explore and configure various aspects of the model being used in the optimization process. The page is organized into three sub-sections:

### 1. Details

This section presents basic information about the model:
- **Model Name** – The name assigned to the current model.
- **Model Description** – A brief explanation or summary of what the model is and its purpose.

### 2. Design Parameter Specification

In this section, users can:
- **Map Controllable Parameters** – Map specific controllable parameters to the specifications the model was trained on.  

Each controllable parameter is linked to a particular model, ensuring an accurate optimization setup.

### 3. Target Specifications

This section outlines the expected outputs and objectives of the model:
- **Observation Space Parameters** – Defines the output variables being monitored during the optimization.
- **List of Precisions** – Includes specific precision targets for the output parameters.
- **Map Target Expressions** – Users must also map each expression to the target specification defined by the model, similar to how it's done in the design parameter section.  

After reviewing or editing these settings, users can proceed by clicking the **Initiate model transfer** button to begin transferring the model to the current project environment for optimization.
