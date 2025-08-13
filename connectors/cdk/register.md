# Registration

A utility function that handles connector registration with the orchestrator service through WebSocket communication.

## Function Definition

```python
def register(kind: str, data: dict) -> None:
```

Registers a connector with the orchestrator via a WebSocket connection.

## Parameters

- **kind** (str): The category or type of connector being registered.
- **data** (dict): The registration payload containing connector details.

## Behavior

1. **Validate configuration** – Ensures the `secret` key is present in `cdk_settings`, raising `AttributeError` if missing.
2. **Log attempt** – Records the registration attempt for debugging and auditing.
3. **Connect to orchestrator** – Uses the `Ws` service to open a WebSocket connection to the orchestrator's registration endpoint.
4. **Send payload** – Transmits the registration data over the WebSocket.
5. **Await response** – Waits for and processes the orchestrator's reply.
6. **Close connection** – Gracefully terminates the WebSocket connection.

## Exceptions

- **AttributeError** – Raised if the `secret` is not configured in the environment.

## Dependencies

- **cdk_settings**: Configuration settings containing authentication secret
- **Ws**: WebSocket service for orchestrator communication