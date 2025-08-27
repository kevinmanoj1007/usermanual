# Netlist Reader

## Classes

### `SPICEVariants`
Enum defining supported SPICE simulators.

**Members**
- `NGSpice` → `0`
- `LTSpice` → `1`

**Methods**
- `into(simulator_name: str)` Converts a string into the corresponding `SPICEVariants` enum member. Defaults to `NGSpice` if not matched.

### `NetlistScope`
Represents a netlist scope during parsing.

**Attributes**
- `instance_scope: list[str]` – The current instance scope chain.
- `definition_scope: str` – The current definition scope.

### `Referrables`
Holds reference information for parameters.

**Attributes**
- `instance_referrables: dict` – Maps parameter names to their instance scope.
- `definition_referrables: dict` – Maps parameter names to their definition scope.

### `SpiceNetlistProcessor`
Processes SPICE netlist content.

**Attributes**
- `SUBCKT_REGEX` – Regex pattern to match `.subckt` definitions.
- `COMPONENT_REGEX` – Regex pattern to match components.
- `COMPONENT_PARAM_REGEX` – Regex for matching component parameters.
- `PARAM_REGEX` – Regex for matching `.param` lines.
- `COMPONENT_FEATURE_REGEX` – Regex for component features.
- `spice_variant` – Selected SPICE variant.
- `master_netlist` – The original netlist content.
- `netlist` – The working netlist content.
- `netlist_lines: list[str]` – Netlist split into lines.
- `component_lines: list[str]` – Extracted component lines.
- `subckts: dict[str, list[str]]` – Subcircuit definitions.
- `subckt_ranges: dict[str, range]` – Subcircuit ranges.
- `non_component_lines: list[str]` – Lines not representing components.
- `external_subckt_file_map: dict[str, Path]` – Maps subcircuit name → file.
- `external_file_subckt_map: dict[Path, list[str]]` – Maps file → subcircuit list.
- `includes: dict[str, int]` – Included files with line index.
- `libs: dict[str, int]` – Libraries with line index.

**Methods**
- `__init__(netlist_content, add_lines_at=-1, spice_variant=SPICEVariants.NGSpice)`
- `get_sanitized()`
- `get_final_netlist()`
- `attach_subckt(path: Path)`
- `extract_subckts(content: list[str])`
- `get_all_design_parameters(location: str | None = None)`
- `get_param_value_range(value, *, min_scale=0.5, max_scale=1.0, default_min=1000, default_max=10000)`
- `get_referencing_components(params: list[str])`
- `extract_components()`
- `extract_component_types()`
- `extract_component_models()`
- `extract_nets()`
- `set_parameter(param, value, location: str | None = None)`
- `mangle_str_chain(str_chain, seperator)`
- `unmangle_str_chain(mangled_str_chain, seperator)`
- `mangle_component_name(instance_scope, component_name)`
- `unmangle_component_name(mangled_name)`
- `mangle_feature_name(instance_scope, component_name, feature_name)`
- `unmangle_feature_name(mangled_name)`
- `mangle_param_name(definition_scope, param_name)`
- `unmangle_param_name(mangled_name)`
- `mangle_formal_param_name(instance_scope, param_name)`
- `unmangle_formal_param_name(mangled_name)`
- `mangle_expression(instance_referrables, definition_referrables, expression)`
- `add_subckt_feature_extraction(referrables, current_scope, subckt_instance)`
- `trace_and_flatten_params(referrables, current_scope, subckt_instance)`
- `add_feature_extraction()`
- `get_component_types()`
- `set_parameters(**kwargs)`
- `add_measurement_statements(measurement)`
- `port_model(src, target)`
- `port_component_type(component_type, target)`
- `port_component(component_identifier, target)`
- `set_temperature(value)`
- `add_include_file(path)`
- `add_lib_file(path, lib_name)`
- `update_lib_argument(lib_name, argument)`
- `modify(new_netlist)`