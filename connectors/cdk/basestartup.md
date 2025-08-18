# BaseStartup

This module provides a CLI-based startup routine for connector initialization, configuration management, and orchestrator [registration](register).

## Class Definition

```python
class BaseStartup:
```

A class that defines the bootstrapping logic for connector applications. It manages commands, environment validation, file-based state persistence, and connector [registration](register) with the orchestrator.

## Constructor

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

### Parameters

- **register_data** (dict): Data payload to be used during [registration](register).
- **helper_text** (dict[str, str]): A dictionary of help messages for CLI usage.
- **commands** (dict[str, Callable]): Mapping of command names to their execution logic.
- **connector_kind** (ConnectorKind): Enum indicating the type of connector.
- **connector_options** (dict[str, Option]): Dictionary of available CLI options for the connector.
- **post_register** (Callable | None, optional): Optional function to run after successful [registration](register).

### Initializes

- CLI command mapping and validation
- Help text system for user guidance
- Connector type and options configuration
- [Registration](register) callback handling

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `register_data` | dict | Data payload used during orchestrator [registration](register) |
| `helper_text` | dict[str, str] | Help messages for CLI commands |
| `commands` | dict[str, Callable] | Command name to execution logic mapping |
| `connector_kind` | ConnectorKind | Type classification of the connector |
| `connector_options` | dict[str, Option] | Available CLI configuration options |
| `post_register` | Callable \| None | Optional callback after successful [registration](register) |
| `storage_location` | Path | Full path to JSON persistence file |

## Public Methods

```python
def parse_args()
```

Parses CLI arguments passed via sys.argv and dispatches the appropriate command/option logic. Validates commands and handles errors gracefully.

```python
def error(message: str)
```

Prints a formatted error message with helpful guidance and exits the process.

```python
def print_help(command=None)
```

Displays help text for a specific command (if given) or prints all registered help sections.

```python
def routine()
```

Executes the registered subroutines in sequence. This is typically invoked during startup to ensure [registration](register), secret checks, or any additional routines run before the connector becomes active.

## Internal Methods

```python
def register(field, fields)
```

Registers the connector with the orchestrator if the REG field is not already marked True. Updates the persistent storage state on success.

```python
def check_secret(field, fields)
```

Verifies whether the stored secret matches the current configuration. If changed or absent, triggers re-[registration](register).

```python
def add_subroutine(name: str, field_default: Any, cb: Callable)
```

Registers a custom initialization subroutine to be run during routine() execution.

```python
def write_default()
```

Initializes the persistent storage file with default field values, if it does not already exist.

```python
def read_storage()
```

Reads and returns the current persisted fields from disk, validating expected keys.

```python
def update_storage(field_name, value)
```

Updates a field in the persistent storage file.

```python
def file_exists(file)
```

Checks if a file exists on disk.

```python
def is_empty()
```

Checks whether the persistent storage file exists and is empty.

## Storage Management

Persistent state is stored in a JSON file at:

```python
cdk_settings.data_dir/connector_storage
```

The storage system manages connector [registration](register) state, secrets, and custom field persistence across application restarts.

## Example Usage

```bash
python connector.py register --init
```

If called without arguments, the class performs only the state-checking routine (routine()).

## Dependencies

- [cdk.config.cdk_settings](cdksettings)
- cdk.constants.ConnectorKind
- cdk.constants.Option