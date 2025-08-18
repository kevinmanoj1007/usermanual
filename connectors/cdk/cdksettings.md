# CDKSettings

The [CDKSettings](cdksettings) class defines and loads configuration settings required to initialize and run a connector instance in the CDK (Connector Development Kit) environment. It provides both runtime environment selection (.env or .test.env) and a dynamic way to build the orchestrator's base URL.

## Class Definition

```python
class CDKSettings(BaseSettings):
```

**Inherits from:** BaseSettings  
**Defined in:** core.config

The [CDKSettings](cdksettings) class holds all essential configuration variables for a connector, such as orchestrator address, security credentials, heartbeat settings, and runtime flags.

## Constructor

```python
def __init__(self, env_file: str):
```

Initializes the configuration from the specified environment file using the shared BaseSettings class.

### Parameters

- **env_file** (str): The name of the environment file (.env, .test.env, etc.)

### Initializes

- Configuration loading from specified environment file
- Runtime environment selection and validation
- Base settings inheritance and validation

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `secret` | str | "" | Authentication token or client key used by the connector |
| `name` | str | "" | Optional name for the connector instance |
| `orc_host` | str | "" | Hostname or IP address of the orchestrator |
| `orc_port` | int | 8080 | Port used to connect to the orchestrator |
| `heartbeat_timeout` | int | 20 | Interval (in seconds) between heartbeat messages |
| `pool_size` | int | 30 | Size of the WebSocket connection pool |
| `data_dir` | str | .connector_data | Directory used to store connector-specific data |
| `ssl_enabled` | int | 1 | Whether to use WSS (1) or WS (0) for communication |

## Public Methods

```python
def base_url() -> str
```

Returns the full base URL used to establish a WebSocket connection with the orchestrator.

#### Logic

- Uses `wss://` if `ssl_enabled` is truthy.
- Constructs the URL as:

```ruby
<protocol>://<orc_host>:<orc_port>/orch
```

**Returns:** A string like `wss://localhost:8080/orch` or `ws://127.0.0.1:8080/orch`.

## Global Configuration

### cdk_settings

A singleton instance of [CDKSettings](cdksettings), initialized automatically at import time.

### Initialization Logic

```python
if "TEST_ENV" in os.environ:
    cdk_settings = CDKSettings(env_file=".test.env")
else:
    cdk_settings = CDKSettings(env_file=".env")
```

- If `TEST_ENV` is set in the environment, `.test.env` is used.
- Otherwise, the default `.env` file is loaded.

```python
def update_settings(s: CDKSettings) -> None
```

Updates the global `cdk_settings` instance with a new configuration.

#### Parameters

- **s** ([CDKSettings](cdksettings)): An instance of [CDKSettings](cdksettings) that will replace the global one.

## Dependencies

- **os**: For environment variable detection
- **logger**: Used to capture log messages during configuration loading
- **BaseSettings**: Common configuration loader shared across the system (core.config.BaseSettings)