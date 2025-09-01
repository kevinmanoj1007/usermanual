# SpiceNetlistProcessor

Provides multiple helper functions to work with spice netlists.


## Attributes
| **Name**                   | **Type**                         | **Description**                              |
| -------------------------- | -------------------------------- | -------------------------------------------- |
| `SUBCKT_REGEX`             | `str`                            | Regex pattern to match `.subckt` definitions |
| `COMPONENT_REGEX`          | `str`                            | Regex pattern to match components            |
| `COMPONENT_PARAM_REGEX`    | `str`                            | Regex for matching component parameters      |
| `PARAM_REGEX`              | `str`                            | Regex for matching `.param` lines            |
| `COMPONENT_FEATURE_REGEX`  | `str`                            | Regex for component features                 |
| `spice_variant`            | [SPICEVariants](spicevariants)   | Selected SPICE variant                       |
| `master_netlist`           | `str`                            | The original netlist content                 |
| `netlist`                  | `str`                            | The working netlist content                  |
| `netlist_lines`            | `list[str]`                      | Netlist split into lines                     |
| `component_lines`          | `list[str]`                      | Extracted component lines                    |
| `subckts`                  | `dict[str, list[str]]`           | Subcircuit definitions                       |
| `subckt_ranges`            | `dict[str, range]`               | Subcircuit ranges                            |
| `non_component_lines`      | `list[str]`                      | Lines not representing components            |
| `external_subckt_file_map` | `dict[str, Path]`                | Maps subcircuit name → file                  |
| `external_file_subckt_map` | `dict[Path, list[str]]`          | Maps file → subcircuit list                  |
| `includes`                 | `dict[str, int]`                 | Included files with line index               |
| `libs`                     | `dict[str, int]`                 | Libraries with line index                    |


### **Constructor**
```python
def __init__(self, netlist_content: str, add_lines_at: int = -1, spice_variant: SPICEVariants = SPICEVariants.NGSpice) -> None
```

**Parameters:**
- `netlist_content` (str): The SPICE netlist content to process
- `add_lines_at` (int): Line position where new lines should be inserted (default: -1)
- `spice_variant` ([SPICEVariants](spicevariants)): The SPICE simulator variant to use (default: NGSpice)

**Description:** Initializes the netlist processor with the given content and configuration. Parses the netlist and sets up internal data structures for processing.

### **Netlist Output Methods**

```python
def get_sanitized(self) -> str
```

**Description:** Returns a sanitized version of the final netlist with paths cleaned according to the platform-specific regex patterns.

```python
def get_final_netlist(self)
```
**Description:** Applies all pending changes and returns the final netlist as encoded bytes using the configured encoding.

```python
def write_netlist(self, path: str | Path)
```
**Parameters:**
- `path` (str | Path): File path where the netlist should be written
**Description:** Writes the final netlist to the specified file path.

### **Subcircuit Management**

```python
def attach_subckt(self, path: Path)
```
**Parameters:**
- `path` (Path): Path to the subcircuit file to attach
**Description:** Reads and attaches a subcircuit file to the netlist processor, making its definitions available for use.

### **Parameter Management**

```python
def get_all_design_parameters(self) -> dict[str, str]
```
**Description:** Extracts all design parameters from the netlist, including those from subcircuits, and returns them as a dictionary mapping parameter names to their values.

```python
def get_param_value_range(self, value: str, *, min_scale: float = 0.5, max_scale: float = 1.0, default_min: float = 1000, default_max: float = 10000)
```
**Parameters:**
- `value` (str): The parameter value to analyze
- `min_scale` (float): Scale factor for minimum value (default: 0.5)
- `max_scale` (float): Scale factor for maximum value (default: 1.0)
- `default_min` (float): Default minimum if parsing fails (default: 1000)
- `default_max` (float): Default maximum if parsing fails (default: 10000)
**Description:** Returns a tuple of (min, max) values for the given parameter value, with configurable scaling factors.

```python
def get_referencing_components(self, parameters: list[str]) -> dict[str, list[str]]
```
**Parameters:**
- `parameters` (list[str]): List of parameter names to find references for
**Description:** Finds all components that reference the specified parameters and returns a mapping from parameter names to lists of component names.

```python
def set_parameter(self, param: str, value: str, location: str | None = None)
```
**Parameters:**
- `param` (str): Parameter name to set
- `value` (str): New value for the parameter
- `location` (str | None): Circuit location where the parameter should be set (default: None for main circuit)
**Description:** Sets a specific parameter value in the netlist, either by replacing an existing parameter or adding a new one.

```python
def set_parameters(self, **kwargs)
```
**Parameters:**
- `**kwargs`: Keyword arguments where keys are parameter names and values are parameter values
**Description:** Sets multiple parameters at once using keyword arguments.

### **Component Extraction**

```python
def extract_components(self) -> list[str]
```

**Description:** Extracts all component names from the main circuit and returns them as a list.

```python
def extract_component_types(self) -> list[str]
```

**Description:** Extracts all unique component types from the main circuit and returns them as a list.

```python
def extract_component_models(self) -> list[str]
```

**Description:** Extracts all unique model names used by components in the main circuit and returns them as a list.

```python
def extract_nets(self) -> dict[str, list[str]]
```

**Description:** Extracts all nets and their connections from the main circuit, returning a dictionary mapping component names to their connection lists.

### **String Mangling Methods**

```python
def mangle_str_chain(self, str_chain: list[str], seperator: str)
```
**Parameters:**
- `str_chain` (list[str]): List of strings to mangle
- `seperator` (str): Separator to use between mangled strings
**Description:** Combines a list of strings into a single mangled string using the specified separator.

```python
def unmangle_str_chain(self, mangled_str_chain: str, seperator: str) -> list[str]
```
**Parameters:**
- `mangled_str_chain` (str): The mangled string to unmangle
- `seperator` (str): Separator used in the mangled string
**Description:** Splits a mangled string back into a list of strings using the specified separator.

### **Component Name Mangling**

```python
def mangle_component_name(self, instance_scope: list[str], component_name: str) -> str
```
**Parameters:**
- `instance_scope` (list[str]): The instance scope hierarchy
- `component_name` (str): The component name to mangle
**Description:** Creates a mangled component name that includes the instance scope information.

```python
def unmangle_component_name(self, mangled_name: str) -> tuple[list[str], str]
```
**Parameters:**
- `mangled_name` (str): The mangled component name to unmangle
**Description:** Extracts the instance scope and component name from a mangled component name.

### **Parameter Name Mangling**

```python
def mangle_param_name(self, definition_scope: str, param_name: str) -> str
```
**Parameters:**
- `definition_scope` (str): The definition scope
- `param_name` (str): The parameter name to mangle
**Description:** Creates a mangled parameter name that includes the definition scope information.

```python
def unmangle_param_name(self, mangled_name: str) -> tuple[str, str]
```
**Parameters:**
- `mangled_name` (str): The mangled parameter name to unmangle
**Description:** Extracts the definition scope and parameter name from a mangled parameter name.

### **Formal Parameter Mangling**

```python
def mangle_formal_param_name(self, instance_scope: list[str], param_name: str) -> str
```
**Parameters:**
- `instance_scope` (list[str]): The instance scope hierarchy
- `param_name` (str): The formal parameter name to mangle
**Description:** Creates a mangled formal parameter name that includes the instance scope information.

```python
def unmangle_formal_param_name(self, mangled_name: str) -> tuple[list[str], str]
```
**Parameters:**
- `mangled_name` (str): The mangled formal parameter name to unmangle
**Description:** Extracts the instance scope and formal parameter name from a mangled formal parameter name.

### **Feature Name Mangling**

```python
def mangle_feature_name(self, instance_scope: list[str], feature_name: str) -> str
```
**Parameters:**
- `instance_scope` (list[str]): The instance scope hierarchy
- `feature_name` (str): The feature name to mangle
**Description:** Creates a mangled feature name that includes the instance scope information.

```python
def unmangle_feature_name(self, mangled_name: str) -> tuple[list[str], str]
```
**Parameters:**
- `mangled_name` (str): The mangled feature name to unmangle
**Description:** Extracts the instance scope and feature name from a mangled feature name.

### **Expression Processing**

```python
def mangle_expression(self, instance_referrables: dict, definition_referrables: dict, expression: str) -> str
```
**Parameters:**
- `instance_referrables` (dict): Dictionary of instance-level referrable parameters
- `definition_referrables` (dict): Dictionary of definition-level referrable parameters
- `expression` (str): The expression to mangle
**Description:** Processes an expression by mangling parameter references according to the provided referrable dictionaries.

### **Feature Extraction**

```python
def add_feature_extraction(self)
```

**Description:** Adds feature extraction capabilities to the netlist by adding parameter tracing and measurement statements.

### **Measurement Management**

```python
def add_measurement_statements(self, measurement: Measurement)
```
**Parameters:**
- `measurement` (Measurement): The measurement configuration to add
**Description:** Adds measurement statements to the netlist based on the provided measurement configuration.

### **Model Porting**

```python
def port_model(self, src: str, target: str)
```
**Parameters:**
- `src` (str): Source model name
- `target` (str): Target model name
**Description:** Replaces all instances of the source model with the target model in the netlist.

```python
def port_component_type(self, component_type: Components, target: str)
```
**Parameters:**
- `component_type` (Components): The component type to port
- `target` (str): Target model name
**Description:** Replaces all models of the specified component type with the target model.

```python
def port_component(self, component_identifier: str, target: str)
```
**Parameters:**
- `component_identifier` (str): The specific component identifier to port
- `target` (str): Target model name
**Description:** Replaces the model of the specified component with the target model.

### **Simulation Configuration**

```python
def set_temperature(self, value: str)
```
**Parameters:**
- `value` (str): Temperature value to set
**Description:** Adds a temperature setting to the netlist.

```python
def add_include_file(self, path: str | Path)
```
**Parameters:**
- `path` (str | Path): Path to the file to include
**Description:** Adds an include statement to the netlist.

```python
def add_lib_file(self, path: str | Path, lib_name: str)
```
**Parameters:**
- `path` (str | Path): Path to the library file
- `lib_name` (str): Name of the library
**Description:** Adds a library file reference to the netlist.

```python
def add_raw_file(self, name: str)
```
**Parameters:**
- `name` (str): Name for the raw output file
**Description:** Adds a raw file output command to the netlist.

```python
def update_lib_argument(self, lib_name: str, argument: str)
```
**Parameters:**
- `lib_name` (str): Name of the library to update
- `argument` (str): New argument for the library
**Description:** Updates the argument of a library reference in the netlist.

### **Netlist Modification**

```python
def modify(self, new_netlist: str) -> str
```
**Parameters:**
- `new_netlist` (str): The new netlist content
**Description:** Modifies the current netlist by comparing it with the new netlist and applying differences.

```python
def reset(self)
```

**Description:** Resets the netlist to its original state and reapplies all changes.

```python
def apply_changes(self)
```

**Description:** Applies all pending changes (additions, replacements, deletions) to the netlist and re-parses it.

### **File Operations**

```python
def write_all_subckts(self)
```

**Description:** Writes all external subcircuit files to disk with their current content.

### **Graph Construction**

```python
def construct_subcircuit_graph(self, parent_name: str) -> MultiDiGraph
```
**Parameters:**
- `parent_name` (str): Name of the parent subcircuit
**Description:** Constructs a NetworkX graph representation of the specified subcircuit.

```python
def construct_graph(self) -> dict
```
**Description:** Constructs a complete graph representation of the entire netlist and returns it as a JSON-serializable dictionary.

### **Utility Methods**

```python
def normalize(self, value: NormType, mode: str = "lower") -> NormType
```
**Parameters:**
- `value` (NormType): Value to normalize
- `mode` (str): Normalization mode ("lower" or "upper", default: "lower")
**Description:** Normalizes strings, dictionaries, sets, or lists by converting them to lowercase or uppercase according to the specified mode.

```python
def process_subckt_graph(self, subckt_graph: MultiDiGraph, mapping: dict[str, str], instance_name: str)
```
**Parameters:**
- `subckt_graph` (MultiDiGraph): The subcircuit graph to process
- `mapping` (dict[str, str]): Mapping of node names
- `instance_name` (str): Name of the instance
**Description:** Processes a subcircuit graph by applying node mappings and instance name prefixes.
