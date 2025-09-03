# Referrables

Holds reference information for parameters during parsing, allowing resolution of values across instance and definition scopes.

```py
class Referrables(BaseModel):
    instance_referrables: dict
    definition_referrables: dict
```

## Attributes

| Name | Type | Description |
|------|------|-------------|
| `instance_referrables` | `dict` | Maps parameter names to their associated instance scope. Used when parameters are scoped locally to specific instances. |
| `definition_referrables` | `dict` | Maps parameter names to their associated definition scope. Used when parameters are defined at the subcircuit/module definition level. |
