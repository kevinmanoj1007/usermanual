# netlist_reader.py

## 1. Overview

This module is a **SPICE netlist processing utility** designed for circuit simulators like **NGSpice** and **LTSpice**. It allows:

- Parsing SPICE netlists into structured data.
- Extracting, modifying, and replacing parameters.
- Adding measurements and simulation control statements.
- Mangling/unmangling names for hierarchical parameter handling.
- Including external subcircuit files.
- Exporting the modified netlist back to disk.

It builds on:

- SpiceParser – for parsing the SPICE netlist into AST form.
- Span – for tracking source code locations.