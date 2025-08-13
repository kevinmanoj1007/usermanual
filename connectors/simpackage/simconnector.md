# SimConnector

SimConnector is a concrete implementation of the BaseConnector class that connects a simulation strategy to a WebSocket-based backend. It receives, processes, and manages simulation tasks asynchronously, while supporting configurable test options and extensible callback hooks.

## Class Definition

```python
class SimConnector(BaseConnector):
```

**Inherits from:** BaseConnector

## Constructor

```python
def __init__(self, strategy: SimInterface, *, throw_errors=False) -> None:
```

### Parameters

- **strategy** (SimInterface): The simulation strategy to be used for processing incoming requests.
- **throw_errors** (bool, optional): If set to True, exceptions encountered during task processing will be re-raised. Defaults to False.

### Initializes

- A persistent WebSocket connection (/connector/stream)
- Configurable runtime options
- Startup routines
- A simulation domain (Simulator)
- A task queue and processing state trackers
- Simulator-level callback registration support

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `_ws` | WebsocketAsyncIO | Asynchronous WebSocket connection manager |
| `strategy` | SimInterface | Simulation strategy passed during instantiation |
| `domain` | Simulator | Simulation handler responsible for executing core logic |
| `_task_queue` | Deque | Queue holding pending simulation requests |
| `_proccessing_tasks` | int | Counter for currently running simulation tasks |
| `_simulator_callbacks` | dict[SimulatorCallbacks, Callable] | Mapping of callback identifiers to functions |
| `options` | dict[str, Option] | Supported runtime options (currently includes "test") |

## Public Methods

### on_start()

Runs during connector startup. Checks for active runtime options and performs early-stage operations, such as executing test modes.

### check_options()

Checks runtime options and handles special behaviors. If the "test" option is provided with sub-options (e.g., ["netlist", "simulate"]), it initializes the Testing module, runs the tests, and exits the process.

### register_simulator_callback(id: SimulatorCallbacks, cb: Callable)

Registers a simulator-level callback to be invoked during simulation events. The callback is associated with a unique identifier (SimulatorCallbacks).

### trigger_process()

Initiates processing of a new simulation task if the system is not currently at maximum processing capacity and if the task queue is not empty.

### async receiver()

Asynchronous method that continuously listens for incoming WebSocket messages. On receiving a valid request and request_id, it appends the data to the task queue and triggers processing.

## Internal Methods

### _call_cb(id: SimulatorCallbacks, *args, **kwargs)

Invokes a previously registered callback function, if available, for a specific simulator event.

### _proccess_request()

Dequeues a simulation request and submits it as an asynchronous task. Each task is bound to a done callback that handles post-processing and error reporting.

### task_handler(task: Task, send_error: Callable[[int, str], Coroutine])

Handles the outcome of an asynchronous simulation task. If the task raises an exception, it logs the error and sends a structured error message through the WebSocket. It also updates internal task counters and triggers the next task in the queue.

## Runtime Options

This connector currently supports the following runtime options:

**test**: Executes predefined simulation tests and exits.

Available test sub-options:

- "netlist"
- "simulate"
- "parameters"
- "nets"

### Example Usage

```bash
python app.py --test=simulate,nets
```

This will execute the selected tests and terminate the program without initializing the WebSocket connection or processing loop.

## Dependencies

- BaseConnector from cdk.base_connector
- Simulator from sim.simulator
- SimInterface from .interface
- WebsocketAsyncIO from core.websocket.asyncio
- Ws, asyncio from cdk.services.ws
- Option from cdk.models.option
- SimulatorCallbacks from sim.callbacks
- Testing from sim.testing
- StartupService from .services.startup_service
- settings from sim.config
- logger from cdk.logger