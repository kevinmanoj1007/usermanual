---
sidebar_position: 2
---


# Agents
## Explanation
An agent is a program or system built to optimize a given system given a target to achieve for that
system. An agent may be anything, including: artifical neural networks, heuristic based optimizers,
domain-specific logical optimizers, etc.


## Creating an agent
In the ADK's eyes, an agent is any directory with the following contents:
+ `src/`: A directory containing the source code for the agent. The source code decides the nature
of the agent and is entirely controlled by the developer. Although putting all the source code in
this directory is not enforced by the ADK, it is highly recommended.

+ `models/`: A directory containing the **models** associated with the agent. **Required only if models are used.**

+ `.env`: A file containing the API key to the AsterQuanta platform, among other configuration. **Mandatorily required.**

:::note
On Unix-based operating systems (Linux, macOS), `.env` files are hidden by default and may not be visible in file explorers without enabling the display of hidden files.
:::

+ `logging.conf`: Logging configuration for the ADK. **Mandatorily required.**

Run `genie setup` in an empty directory and follow the instructions in order to conveniently create
an agent in that directory.

:::note
The `adk` package has to be installed before it and its related tools such as `genie` can be used.
It is highly recommended that one uses a python venv for installing the ADK.
:::


## What next?
Once an agent with the above structure has been successfully created either manually or through `genie setup`,
one can create a **model** and interact with the platform in order to actually start optimizing systems
based on targets.