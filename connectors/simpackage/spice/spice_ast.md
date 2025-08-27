# Spice AST

The `spice_ast` module defines the Abstract Syntax Tree (AST) structures for SPICE netlists. Each element of a SPICE circuit (components, sources, subcircuits, etc.) is represented as a class with relevant attributes.

## Base Classes

### `Ast`
- **Base class** for all AST elements.

### `Component (Ast)`
- **Attributes:**
  - `name: str` — Identifier of the component.
  - `connections: list[str]` — Net connections for the component.
  - `features: list[Feature]` — Additional features or parameters.

### `Expression (Ast)`
- **Attributes:**
  - `references: set[str]` — Referenced identifiers.
  - `span: Span` — Source code span.

### `Feature (Ast)`
- **Attributes:**
  - `name: str` — Feature/parameter name.
  - `value: Expression` — Feature/parameter value.

### `Lib (Ast)`
- **Attributes:**
  - `path: Span` — Path to library.
  - `argument: Optional[Span]` — Optional arguments.

### `Include (Ast)`
- **Attributes:**
  - `path: Span` — Path to included file.

## Circuit Definition

### `CircuitDef (Ast)`
- **Attributes:**
  - `name: str` — Circuit name.
  - `libs: list[Lib]` — Library declarations.
  - `includes: list[Include]` — Include declarations.
  - `parameters: list[Feature]` — Parameter definitions.
  - `components: list[Component]` — Components defined in the circuit.
  - `connections: list[str]` — Connections (ports).
  - `formal_parameters: list[Feature]` — Formal parameters.

## Passive Components

### `Resistor (Component)`
- `value: Expression`
- `model: Optional[str]`

### `Capacitor (Component)`
- `value: Optional[Expression]`
- `model: Optional[str]`

### `Inductor (Component)`
- `value: Optional[Expression]`
- `model: Optional[str]`

### `CoupledInductors (Component)`
- `value: Expression`

## Semiconductor Devices

### `Diode (Component)`
- `model: str`
- `on: bool`

### `Bjt (Component)`
- `model: str`
- `on: bool`

### `Mosfet (Component)`
- `model: str`
- `on: bool`

### `Jfet (Component)`
- `model: str`
- `area: Optional[Expression]`
- `on: bool`

### `Mesfet (Component)`
- `model: str`
- `area: Optional[Expression]`
- `on: bool`

## Sources

### `VoltageSource (Component)`
- `dc_value: Optional[Expression]`
- `ac_magnitude: Optional[Expression]`
- `ac_phase: Optional[Expression]`
- `distortion_f1: DistortionTerm`
- `distortion_f2: DistortionTerm`
- `transient_value: Optional[Expression]`

### `CurrentSource (Component)`
- `dc_value: Optional[Expression]`
- `ac_magnitude: Optional[Expression]`
- `ac_phase: Optional[Expression]`
- `distortion_f1: DistortionTerm`
- `distortion_f2: DistortionTerm`
- `transient_value: Optional[Expression]`

### `DistortionTerm`
- `magnitude: Optional[Expression]`
- `phase: Optional[Expression]`

## Controlled Sources

### `Vcvs (Component)`
- `value: Expression`

### `Vccs (Component)`
- `value: Expression`

### `Cccs (Component)`
- `vnam: str`
- `value: Expression`

### `Ccvs (Component)`
- `vnam: str`
- `value: Expression`

## Transmission Lines

### `LosslessTransmissionLine (Component)`
(no extra attributes)

### `LossyTransmissionLine (Component)`
- `model: str`

### `SingleLossyTransmissionLine (Component)`
- `model: str`

### `UniformRcLine (Component)`
- `model: str`

### `CoupledMulticonductorLine (Component)`
- `model: str`

## Switches and Subcircuits

### `SwitchVC (Component)`
- `model: str`
- `on: bool`

### `SwitchCC (Component)`
- `vnam: str`
- `model: str`
- `on: bool`

### `Subcircuit (Component)`
- `parent: str`

## Placeholders (not yet implemented)

- `XSpiceCodeModel (Component)`
- `BehaviouralSource (Component)`
- `VerilogDevice (Component)`