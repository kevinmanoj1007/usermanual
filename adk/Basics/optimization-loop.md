---
sidebar_position: 8
---


# Optimization loop
## What is the optimization loop?
The optimization loop is a loop that is continuously run until:
1. An agent is finished learning.
2. A learnt agent is finished optimizing a system.
3. Optimization / training is manually stopped midway through optimization / training with "Stop Optimization".

The optimization loop is always started with "Start Optimization" on the web interface's "Genie"
in a project.

The optimization loop broadly follows the following sequence in the ADK's executor routine:
+ Get the **optimization specification** from the platform.
+ Initialize the **agent / environment pair**.
+ Reset the **environment**, obtaining an `observation` and some `info`.
+ If the **optimization specification** specifies the agent to run in inference: **load the agent models**.
+ While `optimizing`:
    + Compute `action` from the **agent** based on the `observation` and `info`.
    + Sample `env_parameters` from the **agent**.
    + Construct `step_data` from the `action` and `env_parameters`.
    + Run `step_data` in the **environment**, obtaining a `next_observation`, `reward`, `terminated`, `truncated` and a `next_info`.
    + Add the `observation`, `action`, `reward`, `next_observation`, `terminated`, `truncated`, `info` and `next_info`
    to the agent's experiences.
    + Call the agent's **learn** routine.
    + Assign `next_observation` to `observation`.
    + Assign `next_info` to `info`.
    + If run in inference and `terminated` is true, stop optimization.
    + If `terminated` or `truncated`, reset the **environment**, obtaining an `observation` and some `info`.
    Also **save the agent models** if optimization was not run in inference, and the total reward over the
    episode was higher than any of the previous episodes.
    + Repeat until optimization stops.

## Preprocessing in the Optimization Loop

Preprocessing happens both **at the beginning** of optimization and **continuously** during optimization. The executor integrates preprocessing as follows:

1. **Environment reset**
   * The initial observation and info are passed through process_env_reset.
2. **Before agent/environment interaction**
   * Agent data is passed through process_agent_data.
   * Specifications are passed through process_specification.
   * Step data is passed through process_agent_step_data.
3. **After environment step**
   * The observation, reward, termination flags, and info are passed through process_env_step.

This ensures that preprocessing is consistently applied whenever the agent interacts with the environment.