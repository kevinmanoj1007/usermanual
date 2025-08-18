# BaseDomain

The [BaseDomain](basedomain) class provides a foundational interface and shared utilities for all connector domain implementations. It is responsible for managing WebSocket communication with clients and handling message dispatching, including both success and error responses.

## Class Definition

```python
class BaseDomain(ABC):
```

**Inherits from:** ABC (Abstract Base Class)  
**Defined in:** `cdk/base_domain.py`

## Constructor

```python
def __init__(
    self,
    connection_pool: WebsocketPool,
    thread_pool: ThreadPoolExecutor
) -> None
```

### Parameters

- **connection_pool** (WebsocketPool): A pool that manages reusable WebSocket connections.
- **thread_pool** (ThreadPoolExecutor): A thread pool executor for handling blocking or concurrent tasks.

### Initializes

- WebSocket connection pool management
- Thread pool for concurrent task execution

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `connection_pool` | WebsocketPool | A pool that manages reusable WebSocket connections |
| `thread_pool` | ThreadPoolExecutor | A thread pool executor for handling blocking or concurrent tasks |

## Public Methods

```python
async def send_message(request: str, request_id: str, body: Any)
```

Sends a structured JSON message over an available WebSocket connection from the pool.

#### Parameters

- **request** (str): Identifier for the type of request being handled.
- **request_id** (str): Unique ID to correlate requests and responses.
- **body** (Any): The actual content of the response message.

#### Example Payload

```json
{
  "status": "success",
  "request": "example.request",
  "request_id": "abc123",
  "body": {
    "key": "value"
  }
}
```

```python
async def send_error(request: str, request_id: str, code: int, message: str, extra: dict[str, Any] | None = None)
```

Sends a structured error message in response to a failed request.

#### Parameters

- **request** (str): Identifier for the original request.
- **request_id** (str): The same ID as the one received in the request to maintain traceability.
- **code** (int): Application-defined error code.
- **message** (str): A human-readable description of the error.
- **extra** (dict[str, Any] | None, optional): Additional contextual error information.

#### Example Payload

```json
{
  "status": "error",
  "request": "example.request",
  "request_id": "abc123",
  "code": 400,
  "message": "Invalid input data",
  "extra": {
    "field": "username"
  }
}
```

## Required Subclass Implementation

Any subclass of [BaseDomain](basedomain) must implement:

```python
@abstractmethod
async def call(data: Any, strategy: ConnectorSpec):
    ...
```

Defines the contract for processing an incoming request based on the provided connector strategy.

#### Parameters

- **data** (Any): Input data payload from the client.
- **strategy** (ConnectorSpec): Specification object that defines how the connector should behave.