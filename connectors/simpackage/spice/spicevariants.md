# SPICEVariants

An enumeration that defines the supported SPICE simulators. This enum provides a clean way to standardize and reference simulator backends within the system.

```py
from enum import IntEnum

class SPICEVariants(IntEnum):
    NGSpice = 0
    LTSpice = 1
    
    @classmethod
    def into(cls, simulator_name: str) -> 'SPICEVariants':
        pass
```

## Members

| Name | Value | Description |
|------|-------|-------------|
| `NGSpice` | `0` | Represents the NGSpice simulator, an open-source mixed-level/mixed-signal electronic circuit simulator. This is the **default simulator** used when no specific match is found. |
| `LTSpice` | `1` | Represents the LTSpice simulator, a widely used free SPICE-based analog electronic circuit simulator developed by Analog Devices. |

## Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| `into` | `simulator_name: str` | `SPICEVariants` | Converts a string into the corresponding `SPICEVariants` enum member. Defaults to `SPICEVariants.NGSpice` if the input string does not match any known simulator. |

### Example

```py
SPICEVariants.into("ltspice")
# Returns: SPICEVariants.LTSpice

SPICEVariants.into("ngspice")
# Returns: SPICEVariants.NGSpice

SPICEVariants.into("unknown")
# Returns: SPICEVariants.NGSpice (default)
```
