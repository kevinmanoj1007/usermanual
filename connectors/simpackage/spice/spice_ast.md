# Spice AST

The `spice_ast` module defines the Abstract Syntax Tree (AST) structures for SPICE netlists. Each element of a SPICE circuit (components, sources, subcircuits, etc.) is represented as a class with relevant attributes.

## Base Classes

### Ast
Base class for all AST elements.

```py
class Ast(BaseModel):
    pass
```

### Component
Base class for circuit components with name, connections, and features.

```py
class Component(Ast):
    name: str
    connections: list[str]
    features: list[Feature]
```

### Expression
Represents expressions with referenced identifiers and source span.

```py
class Expression(Ast):
    references: set[str]
    span: Span
```

### Feature
Represents a feature/parameter with name and value.

```py
class Feature(Ast):
    name: str
    value: Expression
```

### Lib
Library declaration with path and optional arguments.

```py
class Lib(Ast):
    path: Span
    argument: Optional[Span]
```

### Include
Include declaration with file path.

```py
class Include(Ast):
    path: Span
```

## Circuit Definition

### CircuitDef
Complete circuit definition with name, libraries, includes, parameters, components, connections, and formal parameters.

```py
class CircuitDef(Ast):
    name: str
    libs: list[Lib]
    includes: list[Include]
    parameters: list[Feature]
    components: list[Component]
    connections: list[str]
    formal_parameters: list[Feature]
```

## Passive Components

### Resistor
Resistor component with value and optional model.

```py
class Resistor(Component):
    value: Expression
    model: Optional[str]
```

### Capacitor
Capacitor component with optional value and model.

```py
class Capacitor(Component):
    value: Optional[Expression]
    model: Optional[str]
```

### Inductor
Inductor component with optional value and model.

```py
class Inductor(Component):
    value: Optional[Expression]
    model: Optional[str]
```

### CoupledInductors
Coupled inductors component with coupling value.

```py
class CoupledInductors(Component):
    value: Expression
```

## Semiconductor Devices

### Diode
Diode component with model name and on/off state.

```py
class Diode(Component):
    model: str
    on: bool
```

### Bjt
Bipolar junction transistor with model and state.

```py
class Bjt(Component):
    model: str
    on: bool
```

### Mosfet
MOSFET component with model and state.

```py
class Mosfet(Component):
    model: str
    on: bool
```

### Jfet
JFET component with model, optional area, and state.

```py
class Jfet(Component):
    model: str
    area: Optional[Expression]
    on: bool
```

### Mesfet
MESFET component with model, optional area, and state.

```py
class Mesfet(Component):
    model: str
    area: Optional[Expression]
    on: bool
```

## Sources

### VoltageSource
Voltage source with DC, AC, distortion, and transient specifications.

```py
class VoltageSource(Component):
    dc_value: Optional[Expression]
    ac_magnitude: Optional[Expression]
    ac_phase: Optional[Expression]
    distortion_f1: DistortionTerm
    distortion_f2: DistortionTerm
    transient_value: Optional[Expression]
```

### CurrentSource
Current source with DC, AC, distortion, and transient specifications.

```py
class CurrentSource(Component):
    dc_value: Optional[Expression]
    ac_magnitude: Optional[Expression]
    ac_phase: Optional[Expression]
    distortion_f1: DistortionTerm
    distortion_f2: DistortionTerm
    transient_value: Optional[Expression]
```

### DistortionTerm
Distortion term with magnitude and phase components.

```py
class DistortionTerm(BaseModel):
    magnitude: Optional[Expression]
    phase: Optional[Expression]
```

## Controlled Sources

### Vcvs
Voltage-controlled voltage source.

```py
class Vcvs(Component):
    value: Expression
```

### Vccs
Voltage-controlled current source.

```py
class Vccs(Component):
    value: Expression
```

### Cccs
Current-controlled current source with controlling voltage name.

```py
class Cccs(Component):
    vnam: str
    value: Expression
```

### Ccvs
Current-controlled voltage source with controlling voltage name.

```py
class Ccvs(Component):
    vnam: str
    value: Expression
```

## Transmission Lines

### LosslessTransmissionLine
Lossless transmission line component.

```py
class LosslessTransmissionLine(Component):
    pass
```

### LossyTransmissionLine
Lossy transmission line with model.

```py
class LossyTransmissionLine(Component):
    model: str
```

### SingleLossyTransmissionLine
Single lossy transmission line with model.

```py
class SingleLossyTransmissionLine(Component):
    model: str
```

### UniformRcLine
Uniform RC line with model.

```py
class UniformRcLine(Component):
    model: str
```

### CoupledMulticonductorLine
Coupled multiconductor line with model.

```py
class CoupledMulticonductorLine(Component):
    model: str
```

## Switches and Subcircuits

### SwitchVC
Voltage-controlled switch with model and state.

```py
class SwitchVC(Component):
    model: str
    on: bool
```

### SwitchCC
Current-controlled switch with controlling voltage, model, and state.

```py
class SwitchCC(Component):
    vnam: str
    model: str
    on: bool
```

### Subcircuit
Subcircuit instance with parent reference.

```py
class Subcircuit(Component):
    parent: str
```

## Placeholders

### XSpiceCodeModel
XSpice code model component (not yet implemented).

```py
class XSpiceCodeModel(Component):
    pass
```

### BehaviouralSource
Behavioural source component (not yet implemented).

```py
class BehaviouralSource(Component):
    pass
```

### VerilogDevice
Verilog device component (not yet implemented).

```py
class VerilogDevice(Component):
    pass
```