# Middleware

This module defines abstract [Middleware](middleware) class used to wrap request handlers, including logic to load environment-specific settings and construct the base URL for communication with the Orchestrator.

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
- [Middleware](middleware) chain setup

## Attributes: Middleware

| Attribute | Type | Description |
|-----------|------|-------------|
| `app` | Callable | The main application handler function |
| `dispatch_fn` | Callable | The dispatch method used for request processing |

## Public Methods: Middleware

```python
def __call__(request: Request) -> Any
```

Entry point for middleware execution. Calls `dispatch_fn` with the current request and the `call_next` function, which invokes the next handler in the chain.

## Required Subclass Implementation: Middleware

Any subclass of [Middleware](middleware) must implement:

```python
@abstractmethod
async def dispatch(request: Request, call_next: Callable) -> Any:
    ...
```

Abstract method that must be implemented by subclasses to define custom middleware logic. Raises `NotImplementedError` if not overridden.

## Dependencies
- **ABC**: Abstract base class functionality
- **Request**: Request object type for middleware processing
- **Callable**: Type annotation for function parameters