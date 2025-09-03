# Referrables

Holds reference information for parameters during parsing, allowing resolution of values across instance and definition scopes.

```py
class Referrables(BaseModel):
    instance_referrables: dict
    definition_referrables: dict
    
    def add_instance_ref(self, param: str, scope: list[str]) -> None:
        pass
    
    def add_definition_ref(self, param: str, scope: str) -> None:
        pass
    
    def get_instance_ref(self, param: str) -> list[str] | None:
        pass
    
    def get_definition_ref(self, param: str) -> str | None:
        pass
    
    def clear(self) -> None:
        pass
```

## Attributes

| Name | Type | Description |
|------|------|-------------|
| `instance_referrables` | `dict` | Maps parameter names to their associated instance scope. Used when parameters are scoped locally to specific instances. |
| `definition_referrables` | `dict` | Maps parameter names to their associated definition scope. Used when parameters are defined at the subcircuit/module definition level. |

## Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| `add_instance_ref` | `param: str, scope: list[str]` | `None` | Stores a reference for a parameter in the instance scope mapping. |
| `add_definition_ref` | `param: str, scope: str` | `None` | Stores a reference for a parameter in the definition scope mapping. |
| `get_instance_ref` | `param: str` | `list[str] \| None` | Retrieves the instance scope chain for the given parameter if available. |
| `get_definition_ref` | `param: str` | `str \| None` | Retrieves the definition scope for the given parameter if available. |
| `clear` | | `None` | Clears all stored references for both instance and definition scopes. |
