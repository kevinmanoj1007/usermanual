# spice_parser.py

## Class: SpiceParser

### Overview

SpiceParser is responsible for parsing SPICE netlist source code into a structured internal representation.
It tokenizes the source using SpiceLexer and builds CircuitDef objects containing components, parameters, subcircuits, includes, libraries, and control blocks.
The parser supports error recovery and context tracking for nested subcircuits, enabling downstream analysis or simulation preparation.

### Constructor

```python
def __init__(self, source: str) -> None
```

**Parameters**

- `source` (str): The SPICE netlist source text to parse.

**Behavior**

- Tokenizes the input using SpiceLexer.
- Initializes parsing state (current token index, context stack, circuit map, error list).
- Creates the root "main" circuit definition.

## Public Methods

### parse()

```python
def parse(self)
```

**Description**

Main entry point to process the token list and build the circuit structure.
Dispatches to specific handlers based on token kind:

- Component definitions
- Dot commands (.param, .subckt, .include, etc.)
- Unknown syntax recovery

### dot_command()

```python
def dot_command(self)
```

**Description**

Parses a dot-prefixed SPICE command.
Recognized commands:

- .param → parameters
- .subckt → subcircuit definitions
- .include → file includes
- .lib → library references
- .ends → end of subcircuit
- .control → control block

### parameter()

```python
def parameter(self)
```

**Description**

Parses a .param command, adding parameters to the current circuit.

### subckt()

```python
def subckt(self)
```

**Description**

Parses a .subckt definition.
Extracts:

- Subcircuit name
- Node connections
- Formal parameters

Pushes subcircuit name onto the context stack.

### ends()

```python
def ends(self)
```

**Description**

Parses an .ends statement.
Marks the end span of the current subcircuit and pops it from the context stack.

### include()

```python
def include(self)
```

**Description**

Parses an .include statement, extracting and storing the included file path.

### lib()

```python
def lib(self)
```

**Description**

Parses a .lib statement, extracting file path and optional argument.

### control()

```python
def control(self)
```

**Description**

Parses a .control block until .endc.

### component()

```python
def component(self)
```

**Description**

Parses a SPICE component instance by:

- Determining component type from its name prefix
- Delegating to type-specific parser
- Storing the parsed component

### eat_connections(max_connections: int)

```python
def eat_connections(self, max_connections: int) -> list[str]
```

**Description**

Reads node connection identifiers for a component or subcircuit.

**Parameters**

- `max_connections` (int): Maximum connections to parse (-1 for unlimited).

**Returns**

- `list[str]`: Node names.

### eat_expression()

```python
def eat_expression(self)
```

**Description**

Reads an expression, possibly enclosed by delimiters.

### eat_delimited_expression(delimiter: SpiceTokenKind)

```python
def eat_delimited_expression(self, delimiter: SpiceTokenKind)
```

**Description**

Reads a delimited expression, collecting identifier references and span information.

### eat_features()

```python
def eat_features(self) -> tuple[list[Feature], list[SpiceToken]]
```

**Description**

Parses a list of name=value feature definitions.

**Returns**

- `features` (list[Feature]): Parsed features.
- `outliers` (list[SpiceToken]): Tokens not forming valid features.

### eat_fs_path()

```python
def eat_fs_path(self) -> Span
```

**Description**

Reads a file system path from tokens, optionally quoted.

### find_first_feature_ident()

```python
def find_first_feature_ident(self) -> SpiceToken | None
```

**Description**

Looks ahead to find the first identifier that could start a name=value feature.

## Private Methods – Internals

(Core parsing actions that modify the parser state, circuit model, or handle control flow)

- `recover()` → Skips tokens until next parsable item.
- `add_component(c: Component)` → Adds component to current circuit.
- `add_parameter(p: Feature)` → Adds parameter to current circuit.
- `add_parameters(p: list[Feature])` → Adds multiple parameters.
- `add_subckt(name, connections, formal_parameters, start)` → Adds subcircuit definition.
- `add_include(path: Span)` → Adds include file reference.
- `add_lib(path: Span, argument: Optional[Span])` → Adds library reference.
- `add_error(message: str)` → Records parsing error.

## Utility Methods

(General-purpose token, span, and parsing helpers)

- `get_source_snippet(span: Span)` → Returns source substring for given span.
- `get_current_token_snippet()` → Returns snippet of current token.
- `is_current_keyword_match(kw: str)` → Checks if current token is keyword match.
- `is_keyword_match(token, kw)` → Checks if token matches keyword.
- `kind_matches(token, kind)` → Checks if token kind matches.
- `is_at_end()` → True if end of token list reached.
- `bump()` → Advances token pointer.
- `peek(n=1)` → Returns nth lookahead token.
- `eat_until(kind)` → Consumes tokens until specified kind.
- `eat_while(predicate)` → Consumes while predicate true.
- `eat_until_expression_token()` → Consumes until expression token found.
- `eat_until_unescaped_whitespace()` → Consumes until unescaped whitespace.
- `eat_until_unescaped_token(stop_token)` → Consumes until unescaped token.
- `skip_whitespaces()` → Skips whitespace tokens.
- `maybe_expression_token(kind)` → Checks if token kind can appear in expression.
- `is_closing_same(delimiter)` → Checks if closing delimiter matches opening.
- `is_new_beginning(token)` → Checks if token starts a new statement.