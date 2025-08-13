# Router Handlers

The Router Handlers module defines routing logic for the simulator service. It connects API requests to appropriate handler functions that interact with a SimInterface strategy. Each route parses structured input using Pydantic models, delegates logic to the simulator backend, and returns standardized outputs such as simulation results, extracted data, and modified netlists.

## Module Definition

```python
# sim/router_handlers.py
```

**Purpose:** Modular and extensible routing system suitable for simulators that follow different internal implementations.

## Key Concepts

### Strategy Pattern
All handlers rely on a `strategy` parameter, which is an instance of a class implementing the SimInterface. This abstracts backend simulator logic, allowing handlers to remain generic.

### Data Validation
All handlers receive validated input data, structured using Pydantic models (e.g., Upload, Simulate, ModifyNetlist).

## Handler Functions

### upload(data: Upload, strategy: SimInterface)

```python
def upload(data: Upload, strategy: SimInterface) -> dict
```

Processes schematic upload and dependency management.

**Parameters:**
- **data** (Upload): Validated upload data containing schematic and dependencies
- **strategy** (SimInterface): Backend simulation strategy implementation

**Process:**
- Saves the schematic and dependencies to the project
- Calls SimInterface.upload() to extract netlist, parameters, components, and nets
- Returns a dictionary with the netlist, extracted data, and circuit graph

### modify_netlist(data: ModifyNetlist, strategy: SimInterface)

```python
def modify_netlist(data: ModifyNetlist, strategy: SimInterface) -> dict
```

Replaces existing netlist with provided netlist data.

**Parameters:**
- **data** (ModifyNetlist): Validated netlist modification data
- **strategy** (SimInterface): Backend simulation strategy implementation

**Process:**
- Replaces the existing netlist with the provided one
- Calls SimInterface.modify_netlist() and re-extracts metadata
- Returns the new netlist and associated metadata

### extract_parameters(data: Empty, strategy: SimInterface)

```python
def extract_parameters(data: Empty, strategy: SimInterface) -> dict
```

Extracts parameters from the current circuit netlist.

**Parameters:**
- **data** (Empty): Empty data payload
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** Dictionary with a list of parameters

### extract_portables(data: Empty, strategy: SimInterface)

```python
def extract_portables(data: Empty, strategy: SimInterface) -> dict
```

Extracts all portable elements including component types and models.

**Parameters:**
- **data** (Empty): Empty data payload
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** Dictionary with component metadata

### simulate(data: Simulate, strategy: SimInterface)

```python
def simulate(data: Simulate, strategy: SimInterface) -> dict
```

Executes circuit simulation with provided parameters.

**Parameters:**
- **data** (Simulate): Validated simulation configuration
- **strategy** (SimInterface): Backend simulation strategy implementation

**Process:**
- Constructs a SimulationContext and runs a simulation
- Returns the simulation result as provided by the backend

### optimize(data: Simulate, strategy: SimInterface)

```python
def optimize(data: Simulate, strategy: SimInterface) -> dict
```

Executes circuit optimization with provided parameters.

**Parameters:**
- **data** (Simulate): Validated simulation configuration
- **strategy** (SimInterface): Backend simulation strategy implementation

**Process:**
- Similar to simulate, but enables optimization mode
- Returns optimization results

### extract_nets(data: Empty, strategy: SimInterface)

```python
def extract_nets(data: Empty, strategy: SimInterface) -> dict
```

Extracts electrical network information from current circuit.

**Parameters:**
- **data** (Empty): Empty data payload
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** List of all electrical nets in the current circuit

### port(data: Port, strategy: SimInterface)

```python
def port(data: Port, strategy: SimInterface) -> dict
```

Ports netlist to new component mapping based on specified model.

**Parameters:**
- **data** (Port): Validated port configuration data
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** Updated netlist and extracted metadata

## Dependency Management

### get_deps(data: GetCircuitDeps, strategy: SimInterface)

```python
def get_deps(data: GetCircuitDeps, strategy: SimInterface) -> dict
```

Lists all dependency files related to the given circuit.

**Parameters:**
- **data** (GetCircuitDeps): Circuit dependency query data
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** Nested dictionary representing the file structure

### add_dep(data: UploadCircuitDep, strategy: SimInterface)

```python
def add_dep(data: UploadCircuitDep, strategy: SimInterface) -> dict
```

Uploads and registers a new circuit dependency file.

**Parameters:**
- **data** (UploadCircuitDep): Base64-encoded file upload data
- **strategy** (SimInterface): Backend simulation strategy implementation

**Process:**
- Uploads a base64-encoded file and adds it as a dependency
- Returns the updated dependency file structure

### delete_dep(data: DeleteCircuitDep)

```python
def delete_dep(data: DeleteCircuitDep) -> None
```

Removes specified circuit dependency file.

**Parameters:**
- **data** (DeleteCircuitDep): Dependency deletion specification

**Returns:** No content

## Graph Operations

### extract_graph(data: Empty, strategy: SimInterface)

```python
def extract_graph(data: Empty, strategy: SimInterface) -> dict
```

Extracts graph representation of the current netlist.

**Parameters:**
- **data** (Empty): Empty data payload
- **strategy** (SimInterface): Backend simulation strategy implementation

**Returns:** Graph nodes and edges for visualization or analysis

## Design Principles

### Abstraction
The abstraction via SimInterface allows this module to support multiple backend simulators with minimal changes.

### Reliability
All functions are structured to accept validated inputs and return consistent outputs, improving reliability.

### Separation of Concerns
The handlers focus solely on routing and delegating logic, adhering to separation of concerns.

## Dependencies

- Pydantic models (Upload, Simulate, ModifyNetlist, Empty, Port, GetCircuitDeps, UploadCircuitDep, DeleteCircuitDep)
- SimInterface strategy pattern implementation
- SimulationContext for simulation execution