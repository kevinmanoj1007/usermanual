# Netlist Scope

Represents a netlist scope during parsing. Used to track hierarchy and definition context within a SPICE netlist.

## Attributes

- **instance_scope: list[str]** – The current instance scope chain. Represents nested instance identifiers as the parser moves through the design hierarchy.
- **definition_scope: str** – The current definition scope, usually the subcircuit/module name currently being defined or processed.

## Methods

- **push_instance(instance: str) → None** Adds a new instance to the current scope chain. Useful when entering a deeper hierarchical level.
- **pop_instance() → None** Removes the last instance from the scope chain. Called when leaving a nested hierarchical level.
- **set_definition(definition: str) → None** Updates the current definition scope with the given subcircuit/module name.
- **clear() → None** Resets both instance and definition scopes to empty, effectively clearing the parser's context.