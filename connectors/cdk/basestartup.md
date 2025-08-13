# BaseStartup

This module provides a CLI-based startup routine for connector initialization, configuration management, and orchestrator registration.

## Class: BaseStartup

A class that defines the bootstrapping logic for connector applications. It manages commands, environment validation, file-based state persistence, and connector registration with the orchestrator.

### Constructor

```python
def __init__(
    register_data: dict,
    helper_text: dict[str, str],
    commands: dict[str, Callable],
    connector_kind: ConnectorKind,
    connector_options: dict[str, Option],
    post_register: Callable | None = None,
)
```

#### Parameters

- **register_data**: Data payload to be used during registration.
- **helper_text**: A dictionary of help messages for CLI usage.
- **commands**: Mapping of command names to their execution logic.
- **connector_kind**: Enum indicating the type of connector.
- **connector_options**: Dictionary of available CLI options for the connector.
- **post_register**: Optional function to run after successful registration.

## CLI Flow Methods

### parse_args()

Parses CLI arguments passed via sys.argv and dispatches the appropriate command/option logic. Validates commands and handles errors gracefully.

### error(message: str)

Prints a formatted error message with helpful guidance and exits the process.

### print_help(command=None)

Displays help text for a specific command (if given) or prints all registered help sections.

## Registration and Validation

### register(field, fields)

Registers the connector with the orchestrator if the REG field is not already marked True. Updates the persistent storage state on success.

### check_secret(field, fields)

Verifies whether the stored secret matches the current configuration. If changed or absent, triggers re-registration.

### add_subroutine(name: str, field_default: Any, cb: Callable)

Registers a custom initialization subroutine to be run during routine() execution.

## Storage Management

Persistent state is stored in a JSON file at:

```python
cdk_settings.data_dir/connector_storage
```

### write_default()

Initializes the persistent storage file with default field values, if it does not already exist.

### read_storage()

Reads and returns the current persisted fields from disk, validating expected keys.

### update_storage(field_name, value)

Updates a field in the persistent storage file.

### file_exists(file)

Checks if a file exists on disk.

### is_empty()

Checks whether the persistent storage file exists and is empty.

## Execution

### routine()

Executes the registered subroutines in sequence. This is typically invoked during startup to ensure registration, secret checks, or any additional routines run before the connector becomes active.

## Constants

### storage_location

Defines the full path of the JSON file used to persist connector state.

### help_text

Contains default usage and error prompts for CLI interface.

## Example Usage

```bash
python connector.py register --init
```

If called without arguments, the class performs only the state-checking routine (routine()).