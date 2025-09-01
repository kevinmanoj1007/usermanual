# Netlist Reader

## Classes

### [`SPICEVariants`](spicevariants.md)
Enum defining supported SPICE simulators.

**Members**
- `NGSpice` → `0`
- `LTSpice` → `1`

**Methods**
- `into(simulator_name: str)` Converts a string into the corresponding `SPICEVariants` enum member. Defaults to `NGSpice` if not matched.

### [`NetlistScope`](netlistscope.md)
Represents a netlist scope during parsing.

**Attributes**
- `instance_scope: list[str]` – The current instance scope chain.
- `definition_scope: str` – The current definition scope.

### [`Referrables`](referrables.md)
Holds reference information for parameters.

**Attributes**
- `instance_referrables: dict` – Maps parameter names to their instance scope.
- `definition_referrables: dict` – Maps parameter names to their definition scope.

### `SpiceNetlistProcessor`
Processes SPICE netlist content.

**Attributes**
```python
SUBCKT_REGEX          # Regex pattern to match `.subckt` definitions
COMPONENT_REGEX       # Regex pattern to match components
COMPONENT_PARAM_REGEX # Regex for matching component parameters
PARAM_REGEX           # Regex for matching `.param` lines
COMPONENT_FEATURE_REGEX # Regex for component features
spice_variant         # Selected SPICE variant
master_netlist        # The original netlist content
netlist               # The working netlist content
netlist_lines: list[str] # Netlist split into lines
component_lines: list[str] # Extracted component lines
subckts: dict[str, list[str]] # Subcircuit definitions
subckt_ranges: dict[str, range] # Subcircuit ranges
non_component_lines: list[str] # Lines not representing components
external_subckt_file_map: dict[str, Path] # Maps subcircuit name → file
external_file_subckt_map: dict[Path, list[str]] # Maps file → subcircuit list
includes: dict[str, int] # Included files with line index
libs: dict[str, int]  # Libraries with line index
```

**Methods**
```python
__init__(netlist_content, add_lines_at=-1, spice_variant=SPICEVariants.NGSpice)
# Initializes the processor with netlist content and configuration options

get_sanitized()
# Returns a cleaned version of the netlist with processed parameters and references

get_final_netlist()
# Returns the final processed netlist ready for simulation

attach_subckt(path: Path)
# Attaches an external subcircuit file to the current netlist

extract_subckts(content: list[str])
# Extracts subcircuit definitions from the provided netlist content

get_all_design_parameters(location: str | None = None)
# Retrieves all design parameters from the netlist, optionally filtered by location

get_param_value_range(value, *, min_scale=0.5, max_scale=1.0, default_min=1000, default_max=10000)
# Calculates parameter value ranges based on scaling factors and defaults

get_referencing_components(params: list[str])
# Finds all components that reference the specified parameters

extract_components()
# Extracts component definitions from the netlist

extract_component_types()
# Extracts the types of all components in the netlist

extract_component_models()
# Extracts model information for components in the netlist

extract_nets()
# Extracts net/node information from the netlist

set_parameter(param, value, location: str | None = None)
# Sets a parameter to a specific value, optionally within a specific location

mangle_str_chain(str_chain, seperator)
# Converts a string chain into a mangled format using the specified separator

unmangle_str_chain(mangled_str_chain, seperator)
# Converts a mangled string chain back to its original format

mangle_component_name(instance_scope, component_name)
# Creates a mangled name for a component within its instance scope

unmangle_component_name(mangled_name)
# Extracts the original component name from a mangled name

mangle_feature_name(instance_scope, component_name, feature_name)
# Creates a mangled name for a component feature within its scope

unmangle_feature_name(mangled_name)
# Extracts the original feature name from a mangled name

mangle_param_name(definition_scope, param_name)
# Creates a mangled name for a parameter within its definition scope

unmangle_param_name(mangled_name)
# Extracts the original parameter name from a mangled name

mangle_formal_param_name(instance_scope, param_name)
# Creates a mangled name for a formal parameter within its instance scope

unmangle_formal_param_name(mangled_name)
# Extracts the original formal parameter name from a mangled name

mangle_expression(instance_referrables, definition_referrables, expression)
# Processes an expression by mangling parameter references according to scope

add_subckt_feature_extraction(referrables, current_scope, subckt_instance)
# Adds feature extraction capabilities for subcircuit instances

trace_and_flatten_params(referrables, current_scope, subckt_instance)
# Traces parameter dependencies and flattens them for processing

add_feature_extraction()
# Adds feature extraction capabilities to the netlist processor

get_component_types()
# Returns a list of all component types found in the netlist

set_parameters(**kwargs)
# Sets multiple parameters using keyword arguments

add_measurement_statements(measurement)
# Adds measurement statements to the netlist for analysis

port_model(src, target)
# Ports a model from source to target location

port_component_type(component_type, target)
# Ports all components of a specific type to the target

port_component(component_identifier, target)
# Ports a specific component to the target location

set_temperature(value)
# Sets the simulation temperature for the netlist

add_include_file(path)
# Adds an include file directive to the netlist

add_lib_file(path, lib_name)
# Adds a library file with the specified library name

update_lib_argument(lib_name, argument)
# Updates the argument for a specified library

modify(new_netlist)
# Modifies the current netlist with new content
```