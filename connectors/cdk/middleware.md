# Middleware

## cdk_settings.py

This module defines the configuration settings for the CDK (Connector Development Kit), including logic to load environment-specific settings and construct the base URL for communication with the Orchestrator.

### Classes

#### CDKSettings

Inherits from BaseSettings and encapsulates configurable parameters loaded from an environment file.

##### Attributes

- **secret** (str): Secret key used for authentication (default: "")
- **name** (str): Connector name identifier (default: "")
- **orc_host** (str): Host address of the Orchestrator service (default: "")
- **orc_port** (int): Port used to connect to the Orchestrator (default: 8080)
- **heartbeat_timeout** (int): Timeout (in seconds) for heartbeat communication (default: 20)
- **pool_size** (int): Connection pool size (default: 30)
- **data_dir** (str): Directory for storing connector-specific data (default: ".connector_data")
- **ssl_enabled** (int): Determines whether SSL is enabled (1 for true, 0 for false)

##### Methods

- **__init__(env_file: str)**: Initializes the settings from a given environment file.
- **base_url() -> str**: Constructs and returns the WebSocket base URL used for communication with the Orchestrator. Uses `wss` if SSL is enabled, otherwise `ws`.

### Global Configuration

- **cdk_settings**: An instance of CDKSettings, automatically initialized using `.env` or `.test.env` based on the `TEST_ENV` environment variable.

### Functions

#### update_settings(s: CDKSettings) -> None

Replaces the global `cdk_settings` instance with a new one, typically used in testing or reinitialization scenarios.

---

## middleware.py

Defines the abstract Middleware class used to wrap request handlers in the CDK. Supports pre- and post-processing logic around request execution.

### Classes

#### Middleware

Base class for implementing middleware behavior around request handling. Follows an async execution pattern.

##### Constructor

```python
__init__(app: Callable, dispatch: Optional[Callable] = None)
```

- **app**: The main application handler function.
- **dispatch**: Optional override for the default dispatch method. If not provided, uses `self.dispatch`.

##### Methods

- **__call__(request: Request) -> Any**: Entry point for middleware execution. Calls `dispatch_fn` with the current request and the `call_next` function, which invokes the next handler in the chain.
- **dispatch(request: Request, call_next: Callable) -> Any (abstract)**: Abstract method that must be implemented by subclasses to define custom middleware logic. Raises `NotImplementedError` if not overridden.