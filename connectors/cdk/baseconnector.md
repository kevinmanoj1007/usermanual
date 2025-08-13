# BaseConnector

The BaseConnector class is an abstract base class for building WebSocket-based connectors. It defines the lifecycle, connection handling, callback management, task orchestration, and communication protocols between the client and the backend system.

## Class Definition

```python
class BaseConnector(ABC): pass
```

**Inherits from:** ABC (Abstract Base Class)

## Constructor

```python
def __init__(
    *,
    logger,
    secret: str,
    options: dict,
    throw_errors=False,
    startup: BaseStartup,
    hb_timeout: int = 20,
    connection: AsyncInterface,
) -> None
```

### Parameters

- **logger**: Logging utility used for reporting connector status and errors.
- **secret** (str): Client-specific secret key for authentication.
- **options** (dict): Runtime configuration options.
- **throw_errors** (bool): If True, exceptions will be re-raised. Defaults to False.
- **startup** (BaseStartup): Component defining startup logic to be executed before connection.
- **hb_timeout** (int): Heartbeat interval in seconds. Defaults to 20.
- **connection** (AsyncInterface): Asynchronous WebSocket client interface.

### Initializes

- Callback registry
- WebSocket and connection pool
- Thread pool for background execution
- Heartbeat timeout and internal task list

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `_logger` | Logger | Logging utility |
| `_ws` | AsyncInterface | WebSocket connection handler |
| `_secret` | str | Client key for authorization |
| `startup` | BaseStartup | Startup routine handler |
| `_options` | dict | Runtime feature flags |
| `_hb_timeout` | int | Heartbeat interval |
| `_throw_errors` | bool | Flag for error propagation |
| `_headers` | dict | HTTP headers for connection |
| `callbacks` | dict[Callbacks, Callable \| None] | Registered lifecycle callbacks |
| `thread_pool` | ThreadPoolExecutor | Thread pool for blocking or CPU-bound tasks |
| `connection_pool` | WebsocketPool | Pool of WebSocket client connections |

## Public Methods

```python
def start(self)
```

Executes the startup routine, triggers the ON_STARTUP callback, and begins the connector's event loop using asyncio.run.

```python
def register_callback(self, kind: Callbacks, cb: Callable)
```

Registers a user-defined callback function for a given lifecycle event type (Callbacks).

```python
@abstractmethod
async def receiver(self)
```

Subclasses must implement this method. It should define how the connector receives and processes incoming messages.

## Internal Methods

```python
async def _start(self)
```

Establishes WebSocket connection and begins processing loop:
- Starts receiver and _heartbeat tasks.
- Restarts on failure, unless cancelled.

**Handles:**
- Heartbeats
- Task cancellation
- Reconnection on ConnectionClosed

```python
def _add_task(self, handle, name)
```

Creates and tracks an asynchronous task.

```python
def _cleanup_tasks(self)
```

Cancels all tracked async tasks.

```python
def call_cb(self, id: Callbacks)
```

Invokes the callback associated with the provided event type, if defined.

```python
async def restart_connections(self, error: Exception)
```

Handles unexpected connection closures. If throw_errors is enabled, re-raises the exception. Otherwise:
- Logs the error
- Waits briefly
- Re-establishes WebSocket and connection pool

```python
async def cleanup()
```

Cleans up all active tasks, closes WebSocket and connection pool.

```python
async def _heartbeat()
```

Sends a periodic heartbeat message to maintain the connection.

```python
async def send_message(self, request, request_id, body)
```

Sends a structured success response over the WebSocket.

**Message structure:**
```json
{
  "status": "success",
  "request": "<request>",
  "request_id": "<request_id>",
  "body": { ... }
}
```

```python
async def send_error(self, request, request_id, code, message)
```

Sends a structured error message over the WebSocket.

**Message structure:**
```json
{
  "status": "error",
  "request": "<request>",
  "request_id": "<request_id>",
  "code": <status_code>,
  "message": "<description>"
}
```

## Required Subclass Implementation

Any subclass of BaseConnector must implement:

```python
async def receiver(self):
    ...
```

This method is responsible for consuming and acting upon incoming messages from the WebSocket stream.

## Lifecycle Callbacks

Callbacks can be registered and invoked at key lifecycle stages using the Callbacks enum:

| Callback Type | Description |
|---------------|-------------|
| ON_STARTUP | After startup routine is executed |
| ON_CONNECT | Upon successful WebSocket connection |
| ON_STOP | When the connector is gracefully stopped |

## Dependencies

- cdk.base_domain.BaseDomain
- cdk.connection_pool.WebsocketPool
- cdk.services.startup.BaseStartup
- cdk.constants.Callbacks
- core.websocket.asyncio.interface.AsyncInterface
- cdk.config.cdk_settings
