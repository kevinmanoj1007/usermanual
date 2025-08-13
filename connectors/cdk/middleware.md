# Middleware

This module defines the configuration settings for the CDK (Connector Development Kit) and the abstract Middleware class used to wrap request handlers, including logic to load environment-specific settings and construct the base URL for communication with the Orchestrator.

## Class Definition: CDKSettings

```python
class CDKSettings(BaseSettings):
```

**Inherits from:** BaseSettings  
**Defined in:** `cdk_settings.py`

Encapsulates configurable parameters loaded from an environment file.

## Constructor: CDKSettings

```python
def __init__(self, env_file: str):
```

### Parameters

- **env_file** (str): The environment file to load settings from.

### Initializes

- Configuration loading from specified environment file
- Environment-specific parameter validation
- Base settings inheritance

## Attributes: CDKSettings

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `secret` | str | "" | Secret key used for authentication |
| `name` | str | "" | Connector name identifier |
| `orc_host` | str | "" | Host address of the Orchestrator service |
| `orc_port` | int | 8080 | Port used to connect to the Orchestrator |
| `heartbeat_timeout` | int | 20 | Timeout (in seconds) for heartbeat communication |
| `pool_size` | int | 30 | Connection pool size |
| `data_dir` | str | ".connector_data" | Directory for storing connector-specific data |
| `ssl_enabled` | int | 1 | Determines whether SSL is enabled (1 for true, 0 for false) |

## Public Methods: CDKSettings

### base_url() -> str

Constructs and returns the WebSocket base URL used for communication with the Orchestrator. Uses `wss` if SSL is enabled, otherwise `ws`.

## Global Configuration

### cdk_settings

An instance of CDKSettings, automatically initialized using `.env` or `.test.env` based on the `TEST_ENV` environment variable.

### update_settings(s: CDKSettings) -> None

Replaces the global `cdk_settings` instance with a new one, typically used in testing or reinitialization scenarios.

## Class Definition: Middleware

```python
class Middleware(ABC):
```

**Inherits from:** ABC (Abstract Base Class)  
**Defined in:** `middleware.py`

Base class for implementing middleware behavior around request handling. Follows an async execution pattern and supports pre- and post-processing logic around request execution.

## Constructor: Middleware

```python
def __init__(self, app: Callable, dispatch: Optional[Callable] = None):
```

### Parameters

- **app** (Callable): The main application handler function.
- **dispatch** (Optional[Callable]): Optional override for the default dispatch method. If not provided, uses `self.dispatch`.

### Initializes

- Application handler registration
- Dispatch method configuration
- Middleware chain setup

## Attributes: Middleware

| Attribute | Type | Description |
|-----------|------|-------------|
| `app` | Callable | The main application handler function |
| `dispatch_fn` | Callable | The dispatch method used for request processing |

## Public Methods: Middleware

### __call__(request: Request) -> Any

Entry point for middleware execution. Calls `dispatch_fn` with the current request and the `call_next` function, which invokes the next handler in the chain.

## Required Subclass Implementation: Middleware

Any subclass of Middleware must implement:

```python
@abstractmethod
async def dispatch(request: Request, call_next: Callable) -> Any:
    ...
```

Abstract method that must be implemented by subclasses to define custom middleware logic. Raises `NotImplementedError` if not overridden.

## Dependencies

- **BaseSettings**: Configuration base class from core settings
- **ABC**: Abstract base class functionality
- **Request**: Request object type for middleware processing
- **Callable**: Type annotation for function parameters