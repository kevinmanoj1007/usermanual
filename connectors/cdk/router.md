# Router

The Router class manages endpoint registration and request dispatching for CDK-based connectors. It supports route-based handling for methods (GET, SET, DELETE), typed argument validation via introspection, and middleware chaining.

## Class Definition

```python
class Router:
```

**Defined in:** `router.py`

Central component that routes requests to appropriate handlers and integrates middleware into the execution flow.

## Constructor

```python
def __init__(self):
```

### Parameters

No parameters required for initialization.

### Initializes

- Handler dictionary for method-endpoint mapping
- Middleware list and stack management
- Strategy instance registration
- Request processing infrastructure

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `handlers` | dict | A nested dictionary that maps request methods (GET, SET, DELETE) to their respective endpoint handlers |
| `strategy` | ConnectorSpec | Instance of the active ConnectorSpec, passed automatically to handler functions |
| `middleware` | list | A list of middleware callables added to the router |
| `middleware_stack` | Callable | The composed middleware execution stack (built lazily on first request) |

## Public Methods

```python
def route(endpoint: str, method: Literal["GET", "SET", "DELETE"]) -> Callable
```

Decorator to register a function to a specific endpoint and method.

- Overwrites existing handler if the same endpoint is registered again.
- Logs a warning on overwrite.

```python
def get(endpoint: str) -> Callable
```

Shortcut for `route(..., method="GET")`.

```python
def set(endpoint: str) -> Callable
```

Shortcut for `route(..., method="SET")`.

```python
def delete(endpoint: str) -> Callable
```

Shortcut for `route(..., method="DELETE")`.

```python
def add_middleware(middleware: MiddlewareCallable) -> None
```

Appends a middleware function to the middleware stack. Middleware must conform to the `(Request, call_next) -> Awaitable[Any]` signature.

```python
def async call(...) -> Any
```

Main execution entry point for the router.

#### Parameters

- **endpoint** (str): Target endpoint path.
- **method** ("GET" | "SET" | "DELETE"): HTTP-like request method.
- **request_id** (str): Unique ID for the request (used in tracing/errors).
- **body** (Any): Request payload.
- **strategy** (ConnectorSpec): Strategy instance injected into the request context.

#### Behavior

- Validates method and endpoint existence.
- Builds middleware stack if uninitialized.
- Instantiates Request and dispatches through middleware and handler.

## Internal Methods

```python
def build_middleware_stack() -> None
```

Wraps the internal handler in a composed middleware stack using the registered middleware functions. Each middleware wraps the next in a LIFO order.

```python
def async _handle(request: Request) -> Any
```

Core request processing method:

- Inspects the handler's signature and resolves arguments from the request body.
- Supports type coercion and Pydantic validation for BaseModel arguments.
- Automatically injects ConnectorSpec and Request types if declared.
- Uses `asyncio.to_thread()` to invoke the handler in a non-blocking thread.
- Raises RequestException on validation or mapping failure.

## Exceptions

- **RequestException**: Raised during validation, coercion, or argument mismatch. Includes structured error codes (422, 400, 404, 500).

## Dependencies

- **ConnectorSpec**: Strategy interface for connector implementations
- **Request**: Request object containing endpoint and payload data
- **MiddlewareCallable**: Type definition for middleware functions
- **RequestException**: Custom exception for request processing errors
- **asyncio**: For non-blocking thread execution
- **Pydantic**: For BaseModel validation and type coercion
