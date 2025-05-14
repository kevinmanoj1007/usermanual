---
sidebar_position: 4
---

# Environment Parameters

The **Environment Parameters** section allows you to define external simulation conditions such as process corners, temperature variations, and sweep parameters to test your circuit under different environments and edge cases.

---

## 1. Process Corners

Configure different **process corners** to simulate variations in device behavior. These corners can be applied to **NMOS, PMOS**, or any other models used in your circuit.

- **Corner Name** (e.g., Corner_1)
- **Model Name**: Specify a model name that corresponds to a selected model file.
  > _Note: Model name is required for the corner._
- **Select Model File**: Attach the relevant model file for the selected corner.
- **Add Corner**: You can add multiple corners to evaluate circuit performance under different fabrication scenarios.

---

## 2. Temperature & Others

Specify the ambient temperatures at which your circuit will be simulated.

- **TEMPERATURE**: Base temperature value (e.g., 27°C)
- **Samples**: Provide a comma-separated list of temperature points to simulate, such as `10, 27, 54`.

This is useful for testing circuit behavior under varying thermal conditions.

---

## 3. Sweep Parameters

Define one or more parameters whose values will be swept across different simulations.

- **Name**: Name of the parameter to be swept.
- **Default Value**: The default value of the parameter.
- **Samples**: Comma-separated list of values to sweep through (e.g., `10, 27, 54`).

This enables multi-variable simulation and helps in analyzing how circuit performance changes across a range of values.
