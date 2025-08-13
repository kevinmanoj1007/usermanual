# Simulator

The Simulator class is a domain-specific handler responsible for routing simulation requests, managing synchronization of required data, handling errors gracefully, and capturing performance metrics. It integrates with a WebSocket pool and thread pool to manage concurrent simulation sessions.

## Class Definition

```python
class Simulator(BaseDomain):
```

Inherits from: BaseDomain

## Constructor

```python
def __init__(
	self,
	connection_pool: WebsocketPool,
	thread_pool: ThreadPoolExecutor,
	call_cb: Callable,
	throw_errors: bool
) -> None
```

### Parameters

- connection_pool (WebsocketPool): Connection manager for communicating with external services.
- thread_pool (ThreadPoolExecutor): Thread executor for parallel task execution.
- call_cb (Callable): A callback function used for simulator event hooks.
- throw_errors (bool): Determines whether errors should be propagated or suppressed.

### Description

Initializes internal state, registers global metric tracking middleware, and optionally loads persisted global performance stats from disk (global_stats.json).

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| connection_pool | WebsocketPool | WebSocket pool for communicating with external systems |
| thread_pool | ThreadPoolExecutor | Executor for concurrent background task execution |
| throw_errors | bool | Flag to raise or suppress runtime exceptions |
| call_cb | Callable | Function used to invoke simulator-level callbacks |
| metrics_counter | int | Countdown used to determine when to persist metrics |
| global_stats_path | Path | Filesystem path to store global metric stats |

## Public Methods

### async def call(self, data: Any, strategy: SimInterface)

Handles a single simulation request.

#### Parameters

- data (dict): Request payload including method, request, request_id, and body.
- strategy (SimInterface): Strategy implementation to be used for processing.

#### Behavior

- Routes the request to the appropriate endpoint using the router.
- Handles all exceptions, sends structured error responses over the connection.
- Uses default success/error response templates defined in Defaults.

### async def synchronize(self, request: Request, call_next)

Middleware for synchronizing circuit dependencies before simulation.

#### Behavior

- Determines whether simulation artifacts exist locally.
- If missing, requests the necessary data from an external service via WebSocket.
- Downloads a ZIP-encoded response, extracts contents, and places them in the appropriate project folder.
- Invokes the ON_SYNCHRONIZE callback upon completion.
- Passes the request to the next middleware or handler.

Synchronizes if:
- The local artifact folder is empty and
- The request endpoint is not upload, netlist, or deps.

### async def capture_metrics(self, request: Request, call_next)

Middleware to capture and record request processing duration.

#### Behavior

- Measures the time taken to process the request.
- Records the duration using global_load_tracker.
- Saves aggregated metrics to disk every 5 requests.
- Forwards the request to the next handler and returns the response.

## Exception Handling

The call method handles and categorizes exceptions as follows:

| Exception Type | Response Code | Behavior |
|----------------|---------------|----------|
| SimulatorException | 460 | Logged and responded with message and optional extra_data |
| RequestException | Custom | Responded with custom status code and message |
| General Exception | 500 | Responded with a generic internal server error |

If throw_errors is enabled, exceptions are re-raised after handling.

## Middleware Registration

Middleware is registered globally via:

```python
router.add_middleware(self.synchronize)
router.add_middleware(self.capture_metrics)
```

These middlewares are executed for every request routed through the Simulator.

## Dependencies

- router from sim
- Utility from sim.utils
- global_load_tracker from sim.global_load_tracker
- SimulatorCallbacks from sim.callbacks
- SimulatorException, RequestException for structured error handling
- Defaults for success/error response formatting
- settings from sim.config
- Request from cdk.router
- BaseDomain from cdk.base_domain