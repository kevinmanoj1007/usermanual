# Class: SimInterface

An abstract base class that defines the interface contract for a simulator connector in the system. This class extends ConnectorSpec and enforces implementation of core simulation capabilities such as netlist creation, parameter extraction, simulation execution, and component/model handling.

## Inherits

- ConnectorSpec
- ABC (Abstract Base Class)

## 🔧 Abstract Methods

You **must implement** the following methods when subclassing SimInterface:

### create_netlist(metadata: Metadata) -> bytes

Generate a raw netlist representation from the given metadata.

### modify_netlist(netlist: str, metadata: Metadata) -> bytes

Apply modifications to an existing netlist based on updated metadata.

### get_parameters(metadata: Metadata) -> dict

Extract simulation-relevant parameters from the circuit metadata.

### run_simulation(simulation_ctx: SimulationContext, metadata: Metadata) -> dict

Run a simulation using the provided context and return results.

### get_nets(metadata: Metadata) -> dict

Extract all signal nets (connections) from the circuit graph.

### port(mapping: str, models: list[str], metadata: Metadata) -> bytes

Produce a portable (e.g., SPICE-compatible) representation using a model mapping.

### get_components(metadata: Metadata) -> list[str]

List all components present in the circuit.

### get_models(metadata: Metadata) -> list[str]

Return a list of supported or available simulation models.

### get_component_types(metadata: Metadata) -> list[str]

Classify components into types (e.g., resistors, capacitors).

### get_graph(metadata: Metadata) -> dict

Return the circuit graph (e.g., nodes, connections) in a structured format.

## Concrete Methods

### get_portables(metadata: Metadata) -> tuple[list[str], list[str], list[str]]

Helper to retrieve components, component types, and models in one call.

### available_deps(path: Path) -> dict[str, Any]

Recursively scans the given path and builds a dictionary representing the file/folder structure.

Returns:

```python
{
  "subfolder": {
      "file.txt": "subfolder/file.txt"
  },
  ...
}
```

### upload(metadata: Metadata) -> dict

Prepares a dictionary payload of all simulation metadata required for registration or upload.

Includes:

- Base64-encoded netlist
- Parameters
- Nets
- Components & types
- Dependency graph

### add_dep(project: str, kind: CircuitDepTypes, name: str, contents: str) -> Path

Adds a dependency (e.g., model or library file) to the connector's data directory.

- **project**: Project name
- **kind**: Enum of dependency type (CircuitDepTypes)
- **name**: File name
- **contents**: Base64-encoded file content

Returns: Path where the file was saved

### call(request: str, *args, **kwargs) -> Any

Dispatch method for dynamic method invocation by name.

Supported requests:

- "netlist"
- "modify_netlist"
- "extract_parameters"
- "extract_components"
- "extract_nets"
- "simulate" or "optimize"
- "extract_graph"

## Example Subclass Stub

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