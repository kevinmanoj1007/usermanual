# spice_ast.py

## Overview

This module defines the Abstract Syntax Tree (AST) classes for representing parsed SPICE netlist components and structures. All AST classes inherit from Pydantic's `BaseModel` for data validation and serialization.

## Base Classes

### Ast
Base class for all AST nodes.

### Component
Abstract base class for all SPICE components. Contains:
- `name`: Component instance name
- `connections`: List of node connections
- `features`: List of component parameters/features
- Abstract `parse()` method for component-specific parsing
- Methods for parameter reference checking and feature extraction

### SourceStimulus
Utility class for parsing source component stimulus values (DC, AC, transient, distortion).

## Core AST Types

### CircuitDef
Represents a circuit definition (main circuit or subcircuit) containing:
- `libs`: Library references
- `includes`: Include file references  
- `parameters`: Circuit parameters
- `components`: Component instances
- `connections`: Node connections
- `formal_parameters`: Subcircuit formal parameters

### Expression
Represents a parsed expression with parameter references and source span.

### Feature
Represents a name=value parameter assignment.

### Model
Represents a model reference with name and source span.

### Include
Represents an `.include` directive with file path.

### Lib
Represents a `.lib` directive with file path and optional argument.

## Component Types

The module defines concrete component classes for all major SPICE component types:

### Passive Components
- **Resistor** (`R`): Value and optional model
- **Capacitor** (`C`): Value and optional model  
- **Inductor** (`L`): Value and optional model

### Active Components
- **Diode** (`D`): Model and on/off state
- **Bjt** (`Q`): Bipolar junction transistor with model and on/off state
- **Jfet** (`J`): Junction FET with model, area, and on/off state
- **Mosfet** (`M`): MOSFET with model and on/off state
- **Mesfet** (`Z`): MESFET with model, area, and on/off state

### Sources
- **VoltageSource** (`V`): DC, AC, distortion, and transient stimulus values
- **CurrentSource** (`I`): DC, AC, distortion, and transient stimulus values

### Controlled Sources
- **Vcvs** (`E`): Voltage-controlled voltage source
- **Cccs** (`F`): Current-controlled current source  
- **Vccs** (`G`): Voltage-controlled current source
- **Ccvs** (`H`): Current-controlled voltage source

### Transmission Lines
- **LosslessTransmissionLine** (`T`): Lossless transmission line
- **LossyTransmissionLine** (`O`): Lossy transmission line
- **SingleLossyTransmissionLine** (`Y`): Single lossy transmission line
- **CoupledMulticonductorLine** (`P`): Coupled multiconductor line
- **UniformRcLine** (`U`): Uniform RC line

### Other Components
- **CoupledInductors** (`K`): Mutual inductors with coupling value
- **SwitchVC** (`S`): Voltage-controlled switch
- **SwitchCC** (`W`): Current-controlled switch
- **Subcircuit** (`X`): Subcircuit instance

## Component Mapping

The `component_map` dictionary maps SPICE component prefixes to their corresponding Python classes, enabling dynamic component parsing based on the first letter of the component name.

## Postponed Components

The following component types are defined but not yet implemented:
- **XSpiceCodeModel**: XSPICE code model devices
- **BehaviouralSource**: Behavioral sources  
- **VerilogDevice**: Verilog-A devices