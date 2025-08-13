# Overview: sim/router_handlers.py

This module defines routing logic for the simulator service. It connects API requests to appropriate handler functions that interact with a SimInterface strategy. Each route:

- Parses structured input using Pydantic models,
- Delegates logic to the simulator backend (SimInterface),
- Returns standardized outputs (e.g., simulation results, extracted data, modified netlists).

The design is modular and extensible, making it suitable for simulators that follow different internal implementations.

## Key Concepts

### SimInterface

All handlers rely on a strategy parameter, which is an instance of a class implementing the SimInterface. This abstracts backend simulator logic, allowing handlers to remain generic.

### data

All handlers receive validated input data, structured using Pydantic models (e.g., Upload, Simulate, ModifyNetlist).

## Route Handlers

### upload(data: Upload, strategy: SimInterface)

- Saves the schematic and dependencies to the project.
- Calls SimInterface.upload() to extract netlist, parameters, components, and nets.
- Returns a dictionary with the netlist, extracted data, and circuit graph.

### modify_netlist(data: ModifyNetlist, strategy: SimInterface)

- Replaces the existing netlist with the provided one.
- Calls SimInterface.modify_netlist() and re-extracts metadata.
- Returns the new netlist and associated metadata.

### extract_parameters(data: Empty, strategy: SimInterface)

- Extracts parameters from the current circuit netlist.
- Returns a dictionary with a list of parameters.

### extract_portables(data: Empty, strategy: SimInterface)

- Extracts all portable elements including component types and models.
- Returns a dictionary with component metadata.

### simulate(data: Simulate, strategy: SimInterface)

- Constructs a SimulationContext and runs a simulation.
- Returns the simulation result as provided by the backend.

### optimize(data: Simulate, strategy: SimInterface)

- Similar to simulate, but enables optimization mode.
- Returns optimization results.

### extract_nets(data: Empty, strategy: SimInterface)

- Extracts a list of all electrical nets in the current circuit.
- Returns the list of nets.

### port(data: Port, strategy: SimInterface)

- Ports a netlist to a new component mapping based on a given model.
- Returns the updated netlist and extracted metadata.

### get_deps(data: GetCircuitDeps, strategy: SimInterface)

- Lists all dependency files related to the given circuit.
- Returns a nested dictionary representing the file structure.

### add_dep(data: UploadCircuitDep, strategy: SimInterface)

- Uploads a base64-encoded file and adds it as a dependency.
- Returns the updated dependency file structure.

### delete_dep(data: DeleteCircuitDep)

- Deletes a specified circuit dependency file.
- Returns no content.

### extract_graph(data: Empty, strategy: SimInterface)

- Extracts a graph representation of the current netlist.
- Returns graph nodes and edges for visualization or analysis.

## Design Notes

- The abstraction via SimInterface allows this module to support multiple backend simulators with minimal changes.
- All functions are structured to accept validated inputs and return consistent outputs, improving reliability.
- The handlers focus solely on routing and delegating logic, adhering to separation of concerns.