# Connector Models

The [Connector Models](slim-models) module defines Pydantic models used for managing connector-related functionality such as uploads, netlist modifications, dependency management, simulation setup, and data capture. These models enforce structure and validation for data exchanged between the frontend, backend, and simulation engine.

## Module Definition

```python
# Connector Models - Pydantic Data Validation
```

**Purpose:** Structure and validation for data exchanged between frontend, backend, and simulation engine.

## Base Models

### Base

```python
class Base(BaseModel):
    project_id: str
    artifact_id: str
```

Base model for all connector payloads containing project and artifact identification.

**Attributes:**
- **project_id** (str): Identifier for the project
- **artifact_id** (str): Identifier for the specific artifact within the project

### Empty

```python
class Empty(Base):
    pass
```

An empty placeholder derived from Base for requests that do not require additional payload data.

**Inherits from:** Base

## Dependency Models

### Dep

```python
class Dep(BaseModel):
    dep_name: str
    dep_contents: str
    dep_kind: CircuitDepTypes
```

Represents a circuit dependency with validation.

**Attributes:**
- **dep_name** (str): Name of the dependency
- **dep_contents** (str): Contents (code/data) of the dependency
- **dep_kind** (CircuitDepTypes): Enum value describing the type of circuit dependency

**Validation:**
Includes a custom validator to convert raw values to CircuitDepTypes.

### UploadCircuitDep

```python
class UploadCircuitDep(Base, Dep):
    pass
```

Model for uploading a circuit dependency with project/artifact context.

**Inherits from:** Base, Dep

### DeleteCircuitDep

```python
class DeleteCircuitDep(Base):
    dep_name: str
    dep_kind: CircuitDepTypes
```

Model for deleting a specific circuit dependency by name and kind.

**Attributes:**
- **dep_name** (str): Name of the dependency to delete
- **dep_kind** (CircuitDepTypes): Type of dependency to delete

**Inherits from:** Base

### GetCircuitDeps

```python
class GetCircuitDeps(BaseModel):
    dep_kind: CircuitDepTypes
```

Request model for fetching circuit dependencies by type.

**Attributes:**
- **dep_kind** (CircuitDepTypes): Type of dependencies to retrieve

## Schematic and Netlist Models

### Upload

```python
class Upload(Base):
    schematic: str
    extension: str
    deps: list[Dep]
```

Model representing a schematic file and its dependencies for upload.

**Attributes:**
- **schematic** (str): Base64-encoded schematic content
- **extension** (str): File type (e.g., .sch, .ckt)
- **deps** (list[Dep]): List of associated dependencies

**Inherits from:** Base

### ModifyNetlist

```python
class ModifyNetlist(Base):
    netlist: str
```

Model for updating or modifying netlist content.

**Attributes:**
- **netlist** (str): New netlist content

**Inherits from:** Base

## Port and Mapping Models

### Port

```python
class Port(Base):
    mapping: str
    device_model_paths: list[str]
```

Model for mapping ports to device models.

**Attributes:**
- **mapping** (str): Port mapping specification
- **device_model_paths** (list[str]): List of paths to device models

**Inherits from:** Base

## Simulation Dependency Models

### SimulationDep

```python
class SimulationDep(BaseModel):
    dep_name: str
    dep_kind: CircuitDepTypes
    args: str = ""
```

Defines an additional dependency required during simulation.

**Attributes:**
- **dep_name** (str): Name of the dependency
- **dep_kind** (CircuitDepTypes): Kind of dependency
- **args** (str): Optional command-line or simulation-specific arguments (default: "")

### ProcessCorner

```python
class ProcessCorner(BaseModel):
    portable: str
    model_name: str
    kind: PortLocation
```

Describes a process corner used in simulation.

**Attributes:**
- **portable** (str): Identifier for the corner configuration
- **model_name** (str): Name of the associated model
- **kind** (PortLocation): Enum value representing port location (e.g., typical, slow)

## Data Capture and Sweep Models

### DataCapture

```python
class DataCapture(BaseModel):
    name: str
    index: int
```

Defines a probe or point for capturing simulation data.

**Attributes:**
- **name** (str): Name of the capture point
- **index** (int): Index or position of the capture point

### SweepGroup

```python
class SweepGroup(BaseModel):
    name: str
    depth: int
    parameters: list[str]
```

Specifies a group of sweep parameters for parametric analysis.

**Attributes:**
- **name** (str): Group name
- **depth** (int): Nesting level for the sweep
- **parameters** (list[str]): List of parameter names involved in the sweep

## Simulation Context Models

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

Comprehensive model defining the entire simulation environment.

**Attributes:**
- **parameters** (dict[str, str | list[str]]): Simulation parameters (default: {})
- **sweep_groups** (list[SweepGroup]): Parameter sweep definitions (default: [])
- **temperature** (str | None): Simulation temperature (default: None)
- **instructions** (dict | None): Additional simulation instructions (default: None)
- **data_capture** (list[DataCapture]): Points for data capture (default: [])
- **deps** (list[SimulationDep] | None): Simulation dependencies (default: None)
- **process_corners** (list[ProcessCorner] | None): Process corner specifications (default: None)

### Simulate

```python
class Simulate(Base, SimulationContext):
    run_id: str | None
    extract_features: bool = False
```

Model extending Base and SimulationContext to initiate a simulation run.

**Attributes:**
- **run_id** (str | None): Optional identifier for tracking the run
- **extract_features** (bool): Flag to extract model features post-simulation (default: False)

**Inherits from:** Base, SimulationContext

## Model Hierarchy

```
BaseModel (Pydantic)
├── Base
│   ├── Empty
│   ├── UploadCircuitDep (also inherits Dep)
│   ├── DeleteCircuitDep
│   ├── Upload
│   ├── ModifyNetlist
│   ├── Port
│   └── Simulate (also inherits SimulationContext)
├── Dep
├── GetCircuitDeps
├── SimulationDep
├── ProcessCorner
├── DataCapture
├── SweepGroup
└── SimulationContext
```

## Dependencies

- BaseModel from pydantic
- CircuitDepTypes (dependency type enumeration)
- PortLocation (port location enumeration)