---
sidebar_position: 1
---


# Getting Started
Let's get started with the **ADK in less than 10 minutes**.


## What you'll need
- An [AsterQuanta](https://www.asterquanta.com/) account.
- [Python](https://www.python.org/) version 3.11 or 3.12 **only** (will be less restrictive in future versions).


## Quick start
### Setup development environment
Make a new **development environment** with the following:
1. Create and navigate to your agent directory:
    ```sh
    mkdir MyAgent/
    cd MyAgent/
    ```

2. Create and enter new **venv** for your agent (Recommended):
    ```sh
    python -m venv .venv            # Create venv
    source ./.venv/bin/activate     # Activate venv
    ```

3. Install the **ADK**:
    ```sh
    pip install --trusted-host pypi.asterquanta.com --index-url https://pypi.asterquanta.com/simple/ adk
    ```

    Now, you should be able to run `genie -h` and see the following:
    ```sh
    $ genie -h
    usage: genie [-h] {setup,model} ...

    Official AsterQuanta Genie ADK wizard.

    options:
    -h, --help     show this help message and exit

    commands:
    {setup,model}
        setup        Sets up the project, in a ready for development state.
        model        Sub command tree for model related operations.

    ```


### Create a new agent
Create a new **agent** with the following:

1. In your agent directory, run the following, and follow the instructions:
    ```sh
    genie setup -a <BASE_URL>
    ```

    Replace `<BASE_URL>` with either:
    - Production: https://genie.asterquanta.com
    - Staging / development: https://photon.asterquanta.com

    You should now have the following directory structure created by `genie`:
    ```
    MyAgent/
    ├── agent.sh
    ├── logging.conf
    ├── requirements.txt
    ├── settings.json
    ├── src
    │   ├── agent.py
    │   ├── __init__.py
    │   └── main.py
    └── venv.sh
    ```


### Create a new model
This is the last step before a fully functional agent appears on the platform!
A model is an abstraction that prevents developers from having to create a new agent for every circuit or
system they build an agent for. It enables developers to implement one agent, once, and load it with
different models depending on the task at hand. 🌟 [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) 🌟 in full effect.

Create a new **model** with the following:

1. In your agent directory, run the following:
    ```sh
    genie model add MyAgent-model
    ```

    You should now see a new `models/` directory with the following structure created by `genie`:

    ```
    models/
    └── MyAgent-model
        ├── hyper_parameters.json
        ├── metadata.json
        ├── models
        ├── target_specifications.json
        └── world_control_specifications.json
    ```

2. Modify `models/MyAgent-model/metadata.json` to be:
    ```json
    {
        "description": "",
        "state": "learnt",
        "nn_arch": {},
        "is_global": false,
        "is_public": false,
        "bypass": true,
        "specifics": {},
        "name": "MyAgent-model"
    }
    ```

3. Now, register your model with:
    ```sh
    genie model register MyAgent-model
    ```

4. **🚀 You're all set to launch!!! 🚀**


### 🚀🚀🚀 Start your agent 🚀🚀🚀
**You're ready to go!!! Just start your agent with:**
    ```sh
    python src/main.py
    ```
