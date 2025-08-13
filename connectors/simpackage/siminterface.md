# SimInterface

The SimInterface class is an abstract base class that defines the interface contract for a simulator connector in the system. It extends ConnectorSpec and enforces implementation of core simulation capabilities such as netlist creation, parameter extraction, simulation execution, and component/model handling.

## Class Definition

```python
class SimInterface(ConnectorSpec, ABC):
```

**Inherits from:** ConnectorSpec, ABC (Abstract Base Class)

## Constructor

The SimInterface class inherits its constructor from ConnectorSpec and does not define additional initialization parameters.

## Abstract Methods

The following methods **must** be implemented by all subclasses of SimInterface:

### create_netlist(metadata: Metadata) -> bytes

```python
@abstractmethod
def create_netlist(self, metadata: Metadata) -> bytes
```

Generate a raw netlist representation from the given metadata.

**Parameters:**
- **metadata** (Metadata): Circuit metadata containing component and connection information

**Returns:** Raw netlist as bytes

### modify_netlist(netlist: str, metadata: Metadata) -> bytes

```python
@abstractmethod
def modify_netlist(self, netlist: str, metadata: Metadata) -> bytes
```

Apply modifications to an existing netlist based on updated metadata.

**Parameters:**
- **netlist** (str): Existing netlist content
- **metadata** (Metadata): Updated metadata with modifications

**Returns:** Modified netlist as bytes

### get_parameters(metadata: Metadata) -> dict

```python
@abstractmethod
def get_parameters(self, metadata: Metadata) -> dict
```

Extract simulation-relevant parameters from the circuit metadata.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** Dictionary of simulation parameters

### run_simulation(simulation_ctx: SimulationContext, metadata: Metadata) -> dict

```python
@abstractmethod
def run_simulation(self, simulation_ctx: SimulationContext, metadata: Metadata) -> dict
```

Run a simulation using the provided context and return results.

**Parameters:**
- **simulation_ctx** (SimulationContext): Simulation configuration and context
- **metadata** (Metadata): Circuit metadata

**Returns:** Dictionary containing simulation results

### get_nets(metadata: Metadata) -> dict

```python
@abstractmethod
def get_nets(self, metadata: Metadata) -> dict
```

Extract all signal nets (connections) from the circuit graph.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** Dictionary of circuit nets and connections

### port(mapping: str, models: list[str], metadata: Metadata) -> bytes

```python
@abstractmethod
def port(self, mapping: str, models: list[str], metadata: Metadata) -> bytes
```

Produce a portable (e.g., SPICE-compatible) representation using a model mapping.

**Parameters:**
- **mapping** (str): Model mapping specification
- **models** (list[str]): List of available models
- **metadata** (Metadata): Circuit metadata

**Returns:** Portable netlist representation as bytes

### get_components(metadata: Metadata) -> list[str]

```python
@abstractmethod
def get_components(self, metadata: Metadata) -> list[str]
```

List all components present in the circuit.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** List of component identifiers

### get_models(metadata: Metadata) -> list[str]

```python
@abstractmethod
def get_models(self, metadata: Metadata) -> list[str]
```

Return a list of supported or available simulation models.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** List of available simulation models

### get_component_types(metadata: Metadata) -> list[str]

```python
@abstractmethod
def get_component_types(self, metadata: Metadata) -> list[str]
```

Classify components into types (e.g., resistors, capacitors).

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** List of component type classifications

### get_graph(metadata: Metadata) -> dict

```python
@abstractmethod
def get_graph(self, metadata: Metadata) -> dict
```

Return the circuit graph (e.g., nodes, connections) in a structured format.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** Dictionary representing circuit graph structure

## Concrete Methods

### get_portables(metadata: Metadata) -> tuple[list[str], list[str], list[str]]

```python
def get_portables(self, metadata: Metadata) -> tuple[list[str], list[str], list[str]]
```

Helper method to retrieve components, component types, and models in one call.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Returns:** Tuple containing (components, component_types, models)

### available_deps(path: Path) -> dict[str, Any]

```python
def available_deps(self, path: Path) -> dict[str, Any]
```

Recursively scans the given path and builds a dictionary representing the file/folder structure.

**Parameters:**
- **path** (Path): Directory path to scan

**Returns:** Dictionary representing file structure

**Example Structure:**
```python
{
  "subfolder": {
      "file.txt": "subfolder/file.txt"
  },
  ...
}
```

### upload(metadata: Metadata) -> dict

```python
def upload(self, metadata: Metadata) -> dict
```

Prepares a dictionary payload of all simulation metadata required for registration or upload.

**Parameters:**
- **metadata** (Metadata): Circuit metadata

**Includes:**
- Base64-encoded netlist
- Parameters
- Nets
- Components & types
- Dependency graph

**Returns:** Complete metadata dictionary for upload

### add_dep(project: str, kind: CircuitDepTypes, name: str, contents: str) -> Path

```python
def add_dep(self, project: str, kind: CircuitDepTypes, name: str, contents: str) -> Path
```

Adds a dependency (e.g., model or library file) to the connector's data directory.

**Parameters:**
- **project** (str): Project name
- **kind** (CircuitDepTypes): Enum of dependency type
- **name** (str): File name
- **contents** (str): Base64-encoded file content

**Returns:** Path where the file was saved

### call(request: str, *args, **kwargs) -> Any

```python
def call(self, request: str, *args, **kwargs) -> Any
```

Dispatch method for dynamic method invocation by name.

**Parameters:**
- **request** (str): Method name to invoke
- **args**: Positional arguments for the method
- **kwargs**: Keyword arguments for the method

**Supported Requests:**
- "netlist"
- "modify_netlist"
- "extract_parameters"
- "extract_components"
- "extract_nets"
- "simulate" or "optimize"
- "extract_graph"

**Returns:** Result from the invoked method

## Required Subclass Implementation

Any subclass of SimInterface must implement all abstract methods:

```python
class MySpiceSimulator(SimInterface):
    def create_netlist(self, metadata):
        ...
    
    def modify_netlist(self, netlist, metadata):
        ...
    
    def get_parameters(self, metadata):
        ...
    
    def run_simulation(self, simulation_ctx, metadata):
        ...
    
    def get_nets(self, metadata):
        ...
    
    def port(self, mapping, models, metadata):
        ...
    
    def get_components(self, metadata):
        ...
    
    def get_models(self, metadata):
        ...
    
    def get_component_types(self, metadata):
        ...
    
    def get_graph(self, metadata):
        ...
```

## Dependencies

- ConnectorSpec (base class)
- ABC (Abstract Base Class)
- Metadata (circuit metadata structure)
- SimulationContext (simulation configuration)
- CircuitDepTypes (dependency type enumeration)
- Path (file system path handling)