# Netlist Scope

Represents a netlist scope during parsing. Used to track hierarchy and definition context within a SPICE netlist.

```py
class NetlistScope(BaseModel):
    instance_scope: list[str]
    definition_scope: str
```

## Attributes

| Name | Type | Description |
|------|------|-------------|
| `instance_scope` | `list[str]` | The current instance scope chain. Represents nested instance identifiers as the parser moves through the design hierarchy. |
| `definition_scope` | `str` | The current definition scope, usually the subcircuit/module name currently being defined or processed. |
