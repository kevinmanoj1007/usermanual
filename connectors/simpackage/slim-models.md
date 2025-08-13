# Connector Models Documentation

This module defines Pydantic models used for managing connector-related functionality such as uploads, netlist modifications, dependency management, simulation setup, and data capture. These models enforce structure and validation for data exchanged between the frontend, backend, and simulation engine.

## Base Models

### Base

```python
class Base(BaseModel):
	project_id: str
	artifact_id: str
```

Base model for all connector payloads. Contains:

- project_id: Identifier for the project.
- artifact_id: Identifier for the specific artifact within the project.

### Empty

```python
class Empty(Base):
	pass
```

An empty placeholder derived from Base for requests that do not require additional payload data.

## Dependency Models

### Dep

```python
class Dep(BaseModel):
	dep_name: str
	dep_contents: str
	dep_kind: CircuitDepTypes
```

Represents a circuit dependency:

- dep_name: Name of the dependency.
- dep_contents: Contents (code/data) of the dependency.
- dep_kind: Enum value describing the type of circuit dependency (e.g., model, include).

Includes a custom validator to convert raw values to CircuitDepTypes.

### UploadCircuitDep

```python
class UploadCircuitDep(Base, Dep):
	pass
```

Used for uploading a circuit dependency with project/artifact context.

### DeleteCircuitDep

```python
class DeleteCircuitDep(Base):
	dep_name: str
	dep_kind: CircuitDepTypes
```

Used to delete a specific circuit dependency by name and kind.

### GetCircuitDeps

```python
class GetCircuitDeps(BaseModel):
	dep_kind: CircuitDepTypes
```

Request model for fetching circuit dependencies by type.

## Schematic and Netlist Uploads

### Upload

```python
class Upload(Base):
	schematic: str
	extension: str
	deps: list[Dep]
```

Represents a schematic file and its dependencies:

- schematic: Base64-encoded schematic content.
- extension: File type (e.g., .sch, .ckt).
- deps: List of associated dependencies.

### ModifyNetlist

```python
class ModifyNetlist(Base):
	netlist: str
```

Model for updating or modifying the netlist content.

## Port and Mapping

### Port

```python
class Port(Base):
	mapping: str
    device_model_paths: list[str]
```

Used to map ports to device models:

- mapping: Port mapping specification.
- device_model_paths: List of paths to device models.

## Simulation Models

### SimulationDep

```python
class SimulationDep(BaseModel):
	dep_name: str
	dep_kind: CircuitDepTypes
	args: str = ""
```

Defines an additional dependency required during simulation:

- dep_name: Name of the dependency.
- dep_kind: Kind of dependency.
- args: Optional command-line or simulation-specific arguments.

### ProcessCorner

```python
class ProcessCorner(BaseModel):
	portable: str
	model_name: str
	kind: PortLocation
```

Describes a process corner used in simulation:

- portable: Identifier for the corner configuration.
- model_name: Name of the associated model.
- kind: Enum value representing port location (e.g., typical, slow).

## Simulation Context and Execution

### DataCapture

```python
class DataCapture(BaseModel):
	name: str
	index: int
```

Defines a probe or point for capturing simulation data.

### SweepGroup

```python
class SweepGroup(BaseModel):
	name: str
	depth: int
	parameters: list[str]
```

Specifies a group of sweep parameters:

- name: Group name.
- depth: Nesting level for the sweep.
- parameters: List of parameter names involved in the sweep.

### SimulationContext

```python
class SimulationContext(BaseModel):
	parameters: dict[str, str | list[str]] = {}
	sweep_groups: list[SweepGroup] = []
	temperature: str | None = None
	instructions: dict | None = None
	data_capture: list[DataCapture] = []
	deps: list[SimulationDep] | None = None
	process_corners: list[ProcessCorner] | None = None
```

Defines the entire simulation environment, including:

- Simulation parameters and temperature.
- Sweep definitions and capture points.
- Dependencies and process corners.

### Simulate

```python
class Simulate(Base, SimulationContext):
	run_id: str | None
	extract_features: bool = False
```

Extends both Base and SimulationContext to initiate a simulation run:

- run_id: Optional identifier for tracking the run.
- extract_features: Flag to extract model features post-simulation.