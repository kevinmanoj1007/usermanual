# Spice AST

The `spice_ast` module defines the Abstract Syntax Tree (AST) structures for SPICE netlists. Each element of a SPICE circuit (components, sources, subcircuits, etc.) is represented as a class with relevant attributes.

```py
class Ast(BaseModel):
    pass

class Component(Ast):
    name: str
    connections: list[str]
    features: list[Feature]

class Expression(Ast):
    references: set[str]
    span: Span

class Feature(Ast):
    name: str
    value: Expression

class Lib(Ast):
    path: Span
    argument: Optional[Span]

class Include(Ast):
    path: Span

class CircuitDef(Ast):
    name: str
    libs: list[Lib]
    includes: list[Include]
    parameters: list[Feature]
    components: list[Component]
    connections: list[str]
    formal_parameters: list[Feature]

class Resistor(Component):
    value: Expression
    model: Optional[str]

class Capacitor(Component):
    value: Optional[Expression]
    model: Optional[str]

class Inductor(Component):
    value: Optional[Expression]
    model: Optional[str]

class CoupledInductors(Component):
    value: Expression

class Diode(Component):
    model: str
    on: bool

class Bjt(Component):
    model: str
    on: bool

class Mosfet(Component):
    model: str
    on: bool

class Jfet(Component):
    model: str
    area: Optional[Expression]
    on: bool

class Mesfet(Component):
    model: str
    area: Optional[Expression]
    on: bool

class VoltageSource(Component):
    dc_value: Optional[Expression]
    ac_magnitude: Optional[Expression]
    ac_phase: Optional[Expression]
    distortion_f1: DistortionTerm
    distortion_f2: DistortionTerm
    transient_value: Optional[Expression]

class CurrentSource(Component):
    dc_value: Optional[Expression]
    ac_magnitude: Optional[Expression]
    ac_phase: Optional[Expression]
    distortion_f1: DistortionTerm
    distortion_f2: DistortionTerm
    transient_value: Optional[Expression]

class DistortionTerm(BaseModel):
    magnitude: Optional[Expression]
    phase: Optional[Expression]

class Vcvs(Component):
    value: Expression

class Vccs(Component):
    value: Expression

class Cccs(Component):
    vnam: str
    value: Expression

class Ccvs(Component):
    vnam: str
    value: Expression

class LosslessTransmissionLine(Component):
    pass

class LossyTransmissionLine(Component):
    model: str

class SingleLossyTransmissionLine(Component):
    model: str

class UniformRcLine(Component):
    model: str

class CoupledMulticonductorLine(Component):
    model: str

class SwitchVC(Component):
    model: str
    on: bool

class SwitchCC(Component):
    vnam: str
    model: str
    on: bool

class Subcircuit(Component):
    parent: str

class XSpiceCodeModel(Component):
    pass

class BehaviouralSource(Component):
    pass

class VerilogDevice(Component):
    pass
```

## Base Classes

| Name | Description |
|------|-------------|
| `Ast` | Base class for all AST elements. |
| `Component` | Base class for circuit components with name, connections, and features. |
| `Expression` | Represents expressions with referenced identifiers and source span. |
| `Feature` | Represents a feature/parameter with name and value. |
| `Lib` | Library declaration with path and optional arguments. |
| `Include` | Include declaration with file path. |

## Circuit Definition

| Name | Type | Description |
|------|------|-------------|
| `CircuitDef` | `Ast` | Complete circuit definition with name, libraries, includes, parameters, components, connections, and formal parameters. |

## Passive Components

| Name | Attributes | Description |
|------|------------|-------------|
| `Resistor` | `value: Expression, model: Optional[str]` | Resistor component with value and optional model. |
| `Capacitor` | `value: Optional[Expression], model: Optional[str]` | Capacitor component with optional value and model. |
| `Inductor` | `value: Optional[Expression], model: Optional[str]` | Inductor component with optional value and model. |
| `CoupledInductors` | `value: Expression` | Coupled inductors component with coupling value. |

## Semiconductor Devices

| Name | Attributes | Description |
|------|------------|-------------|
| `Diode` | `model: str, on: bool` | Diode component with model name and on/off state. |
| `Bjt` | `model: str, on: bool` | Bipolar junction transistor with model and state. |
| `Mosfet` | `model: str, on: bool` | MOSFET component with model and state. |
| `Jfet` | `model: str, area: Optional[Expression], on: bool` | JFET component with model, optional area, and state. |
| `Mesfet` | `model: str, area: Optional[Expression], on: bool` | MESFET component with model, optional area, and state. |

## Sources

| Name | Attributes | Description |
|------|------------|-------------|
| `VoltageSource` | `dc_value, ac_magnitude, ac_phase, distortion_f1, distortion_f2, transient_value` | Voltage source with DC, AC, distortion, and transient specifications. |
| `CurrentSource` | `dc_value, ac_magnitude, ac_phase, distortion_f1, distortion_f2, transient_value` | Current source with DC, AC, distortion, and transient specifications. |

## Controlled Sources

| Name | Attributes | Description |
|------|------------|-------------|
| `Vcvs` | `value: Expression` | Voltage-controlled voltage source. |
| `Vccs` | `value: Expression` | Voltage-controlled current source. |
| `Cccs` | `vnam: str, value: Expression` | Current-controlled current source with controlling voltage name. |
| `Ccvs` | `vnam: str, value: Expression` | Current-controlled voltage source with controlling voltage name. |

## Transmission Lines

| Name | Attributes | Description |
|------|------------|-------------|
| `LosslessTransmissionLine` | | Lossless transmission line component. |
| `LossyTransmissionLine` | `model: str` | Lossy transmission line with model. |
| `SingleLossyTransmissionLine` | `model: str` | Single lossy transmission line with model. |
| `UniformRcLine` | `model: str` | Uniform RC line with model. |
| `CoupledMulticonductorLine` | `model: str` | Coupled multiconductor line with model. |

## Switches and Subcircuits

| Name | Attributes | Description |
|------|------------|-------------|
| `SwitchVC` | `model: str, on: bool` | Voltage-controlled switch with model and state. |
| `SwitchCC` | `vnam: str, model: str, on: bool` | Current-controlled switch with controlling voltage, model, and state. |
| `Subcircuit` | `parent: str` | Subcircuit instance with parent reference. |

## Placeholders

| Name | Description |
|------|-------------|
| `XSpiceCodeModel` | XSpice code model component (not yet implemented). |
| `BehaviouralSource` | Behavioural source component (not yet implemented). |
| `VerilogDevice` | Verilog device component (not yet implemented). |
