---
sidebar_position: 2
---

# What To Do Next

Now that you have your agent set up and running, let's go beyond the basics and explore advanced development features. You'll learn how to add, modify, reload, and delete models — as well as how to update your agent's source code and restart it.

## Adding a model

To add a new model to your agent:

1. In your agent directory, run the following:
    ```sh
    genie model add MyNewModel
    ```

    You should now see a new `models/` directory with the following structure created by `genie`:

    ```
    models/
    └── MyNewModel
        ├── hyper_parameters.json
        ├── metadata.json
        ├── models
        ├── target_specifications.json
        └── world_control_specifications.json
    ```

2. Modify `models/MyNewModel/metadata.json` to be:
    ```json
    {
        "description": "My new model for testing advanced workflows",
        "state": "learnt",
        "nn_arch": {},
        "is_global": false,
        "is_public": false,
        "bypass": true,
        "specifics": {},
        "name": "MyNewModel"
    }
    ```

3. Now, register your model with:
    ```sh
    genie model register MyNewModel
    ```

    Your model is now available for use by your agent and visible on the AsterQuanta platform.

See [Models](adk\Basics\models.md) for more information about model structure and configuration.

## Changing a model, committing it, and reloading it on the client/UI

When you want to modify an existing model — for example, to update parameters, architecture, or target specifications — do the following:

1. Make your desired changes to the model files (for example, edit `hyper_parameters.json` or update `metadata.json`).

2. Once done, commit the changes:
    ```sh
    git add models/MyNewModel/
    git commit -m "Updated MyNewModel parameters"
    ```

3. To make the updated model active without restarting the agent, reload it using:
    ```sh
    genie model reload MyNewModel
    ```

    The client/UI will automatically reflect the latest version of the model after reloading.

## Deleting a model

To delete a model from your agent, run:

```sh
genie model delete MyOldModel
```

This command will:

1. Unregister the model from your local agent configuration.
2. Remove the corresponding directory under `models/` after confirmation.

To verify that the model was removed successfully, use:

```sh
genie model list
```

You should no longer see the deleted model in the output.

## Changing the agent source code and restarting the agent

Your agent's logic resides under the `src/` directory. Typical structure:

```
src/
├── agent.py
├── __init__.py
└── main.py
```

1. Make your desired changes to any of these files — for example, adjusting your control logic or updating communication handlers.

2. Once your edits are complete, commit them:
    ```sh
    git add src/
    git commit -m "Updated agent logic"
    ```

3. Restart the agent to apply the changes:
    ```sh
    genie agent restart
    ```

    Alternatively, you can manually stop and restart the agent by running:

    ```sh
    python src/main.py
    ```

4. To confirm that the updated agent is running correctly, use:
    ```sh
    genie agent status
    ```

    If everything is configured properly, your agent should now be live with the new code and updated models.