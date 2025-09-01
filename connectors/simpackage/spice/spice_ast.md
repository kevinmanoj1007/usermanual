# Spice AST

The `spice_ast` module defines the Abstract Syntax Tree (AST) structures for SPICE netlists. Each element of a SPICE circuit (components, sources, subcircuits, etc.) is represented as a class with relevant attributes.

## Base Classes

### `Ast`
Base class for all AST elements.

### `Component (Ast)`
```python
name: str                # Identifier of the component
connections: list[str]   # Net connections for the component  
features: list[Feature]  # Additional features or parameters
```

### `Expression (Ast)`
```python
references: set[str]     # Referenced identifiers
span: Span              # Source code span
```

### `Feature (Ast)`
```python
name: str               # Feature/parameter name
value: Expression       # Feature/parameter value
```

### `Lib (Ast)`
```python
path: Span                    # Path to library
argument: Optional[Span]      # Optional arguments
```

### `Include (Ast)`
```python
path: Span              # Path to included file
```

## Circuit Definition

### `CircuitDef (Ast)`
```python
name: str                           # Circuit name
libs: list[Lib]                     # Library declarations
includes: list[Include]             # Include declarations
parameters: list[Feature]           # Parameter definitions
components: list[Component]         # Components defined in the circuit
connections: list[str]              # Connections (ports)
formal_parameters: list[Feature]    # Formal parameters
```

## Passive Components

### `Resistor (Component)`
```python
value: Expression
model: Optional[str]
```

### `Capacitor (Component)`
```python
value: Optional[Expression]
model: Optional[str]
```

### `Inductor (Component)`
```python
value: Optional[Expression]
model: Optional[str]
```

### `CoupledInductors (Component)`
```python
value: Expression
```

## Semiconductor Devices

### `Diode (Component)`
```python
model: str
on: bool
```

### `Bjt (Component)`
```python
model: str
on: bool
```

### `Mosfet (Component)`
```python
model: str
on: bool
```

### `Jfet (Component)`
```python
model: str
area: Optional[Expression]
on: bool
```

### `Mesfet (Component)`
```python
model: str
area: Optional[Expression]
on: bool
```

## Sources

### `VoltageSource (Component)`
```python
dc_value: Optional[Expression]
ac_magnitude: Optional[Expression]
ac_phase: Optional[Expression]
distortion_f1: DistortionTerm
distortion_f2: DistortionTerm
transient_value: Optional[Expression]
```

### `CurrentSource (Component)`
```python
dc_value: Optional[Expression]
ac_magnitude: Optional[Expression]
ac_phase: Optional[Expression]
distortion_f1: DistortionTerm
distortion_f2: DistortionTerm
transient_value: Optional[Expression]
```

### `DistortionTerm`
```python
magnitude: Optional[Expression]
phase: Optional[Expression]
```

## Controlled Sources

### `Vcvs (Component)`
```python
value: Expression
```

### `Vccs (Component)`
```python
value: Expression
```

### `Cccs (Component)`
```python
vnam: str
value: Expression
```

### `Ccvs (Component)`
```python
vnam: str
value: Expression
```

## Transmission Lines

### `LosslessTransmissionLine (Component)`
(no extra attributes)

### `LossyTransmissionLine (Component)`
```python
model: str
```

### `SingleLossyTransmissionLine (Component)`
```python
model: str
```

### `UniformRcLine (Component)`
```python
model: str
```

### `CoupledMulticonductorLine (Component)`
```python
model: str
```

## Switches and Subcircuits

### `SwitchVC (Component)`
```python
model: str
on: bool
```

### `SwitchCC (Component)`
```python
vnam: str
model: str
on: bool
```

### `Subcircuit (Component)`
```python
parent: str
```

## Placeholders (not yet implemented)

```python
XSpiceCodeModel (Component)
BehaviouralSource (Component)
VerilogDevice (Component)
```