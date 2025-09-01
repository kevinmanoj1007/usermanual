# SPICEVariants

An **enumeration** that defines the supported SPICE simulators. This enum provides a clean way to standardize and reference simulator backends within the system.

## Members

- `NGSpice = 0` Represents the NGSpice simulator, an open-source mixed-level/mixed-signal electronic circuit simulator. This is the **default simulator** used when no specific match is found.
- `LTSpice = 1` Represents the LTSpice simulator, a widely used free SPICE-based analog electronic circuit simulator developed by Analog Devices.

## Methods

### `into(simulator_name: str) -> SPICEVariants`

Converts a string into the corresponding `SPICEVariants` enum member.

**Parameters**:
- `simulator_name (str)` → Name of the simulator (e.g., `"ngspice"`, `"ltspice"`).

**Returns**:
- `SPICEVariants` enum member corresponding to the input string.
- Defaults to `SPICEVariants.NGSpice` if the input string does not match any known simulator.

**Example**:

```python
SPICEVariants.into("ltspice")
# Returns: SPICEVariants.LTSpice
```