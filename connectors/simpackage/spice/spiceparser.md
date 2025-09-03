# Spice Parser

Parses SPICE netlists into structured AST representations.

```py
class SpiceParser:
    delims: dict[SpiceTokenKind, SpiceTokenKind]
    lexer: SpiceLexer
    tokens: list[SpiceToken]
    current: int
    context: list[str]
    circuits: dict[str, CircuitDef]
    errors: list[str]
```

## Attributes

| **Name** | **Type** | **Description** |
|----------|----------|-----------------|
| `delims` | `dict[SpiceTokenKind, SpiceTokenKind]` | Maps opening tokens (parentheses, braces, quotes, etc.) to their matching closing tokens |
| `lexer` | `SpiceLexer` | Tokenizer for SPICE source code |
| `tokens` | `list[SpiceToken]` | List of tokens generated from the lexer |
| `current` | `int` | Current token index during parsing |
| `context` | `list[str]` | Parsing context stack (e.g., current subcircuit, defaults to ["main"]) |
| `circuits` | `dict[str, CircuitDef]` | Parsed circuits by name, with "main" as the root circuit |
| `errors` | `list[str]` | Collected error messages during parsing |

### **Constructor**

```python
def __init__(self, source: str) -> None
```

**Parameters:**
- `source` (str): The SPICE source text to parse

**Description:** Initializes the parser with SPICE source text and sets up the lexer and parsing state.

### **Main Parsing Methods**

```python
def parse(self) -> None
```

**Description:** Main parse loop; processes components, dot-commands, and recovers from errors.

```python
def dot_command(self) -> None
```

**Description:** Handles SPICE dot-commands (.param, .subckt, .include, .lib, .ends).

```python
def component(self) -> None
```

**Description:** Parses a SPICE component line and adds it to the current circuit.

### **Expression Parsing**

```python
def eat_expression(self) -> Expression
```

**Description:** Consumes an expression starting at the current token.

```python
def eat_delimited_expression(self, delimiter: SpiceTokenKind) -> Expression
```

**Parameters:**
- `delimiter` (SpiceTokenKind): The delimiter token kind that encloses the expression

**Description:** Reads expressions enclosed by delimiters (e.g., parentheses).

### **Connection and Feature Parsing**

```python
def eat_connections(self, max_connections: int) -> list[str]
```

**Parameters:**
- `max_connections` (int): Maximum number of connections to read

**Description:** Reads node connections for a component or subcircuit.

```python
def eat_features(self) -> tuple[list[Feature], list[str]]
```

**Description:** Extracts features (parameter assignments) and outliers.

```python
def find_first_feature_ident(self) -> int
```

**Description:** Detects the first feature identifier following a component.

### **Source Text Utilities**

```python
def get_source_snippet(self, span: Span) -> str
```

**Parameters:**
- `span` (Span): The span to extract from the source

**Description:** Returns raw source code corresponding to a span.

```python
def get_current_token_snippet(self) -> str
```

**Description:** Gets snippet text for the current token.

### **Token Matching and Validation**

```python
def is_current_keyword_match(self, kw: str) -> bool
```

**Parameters:**
- `kw` (str): The keyword to match against

**Description:** Checks if current token matches a keyword.

```python
def is_keyword_match(self, token: SpiceToken | None, kw: str) -> bool
```

**Parameters:**
- `token` (SpiceToken | None): The token to check
- `kw` (str): The keyword to match against

**Description:** Checks if a token matches a keyword.

```python
def kind_matches(self, token: SpiceToken | None, kind: SpiceTokenKind) -> bool
```

**Parameters:**
- `token` (SpiceToken | None): The token to check
- `kind` (SpiceTokenKind): The expected token kind

**Description:** Checks if token kind matches expected kind.

### **Token Navigation**

```python
def is_at_end(self) -> bool
```

**Description:** Returns whether parsing has reached the end of tokens.

```python
def bump(self) -> None
```

**Description:** Advances the parser to the next token.

```python
def peek(self, n: int = 1) -> SpiceToken | None
```

**Parameters:**
- `n` (int): Number of tokens to look ahead (default: 1)

**Description:** Looks ahead n tokens without consuming.

### **Token Consumption**

```python
def eat_until(self, kind: SpiceTokenKind) -> list[SpiceToken]
```

**Parameters:**
- `kind` (SpiceTokenKind): The token kind to consume until

**Description:** Consumes tokens until a specific kind is found.

```python
def eat_while(self, f: Callable[[SpiceToken], bool]) -> list[SpiceToken]
```

**Parameters:**
- `f` (Callable[[SpiceToken], bool]): Predicate function to test tokens

**Description:** Consumes tokens while predicate f is true.

```python
def eat_until_expression_token(self) -> list[SpiceToken]
```

**Description:** Consumes tokens until an expression token or new beginning is found.

```python
def eat_until_unescaped_whitespace(self) -> list[SpiceToken]
```

**Description:** Consumes until unescaped whitespace is found.

```python
def skip_whitespaces(self) -> None
```

**Description:** Skips whitespace tokens.

### **Error Recovery**

```python
def recover(self) -> None
```

**Description:** Error recovery; skips tokens until a valid start (Component or Dot).

```python
def add_error(self, message: str) -> None
```

**Parameters:**
- `message` (str): Error message to record

**Description:** Records a parsing error.

### **Circuit Building**

```python
def add_component(self, c: Component) -> None
```

**Parameters:**
- `c` (Component): The component to add

**Description:** Adds a component to the current circuit.

```python
def add_parameter(self, p: Feature) -> None
```

**Parameters:**
- `p` (Feature): The parameter to add

**Description:** Adds a parameter to the current circuit.

```python
def add_parameters(self, p: list[Feature]) -> None
```

**Parameters:**
- `p` (list[Feature]): The parameters to add

**Description:** Adds multiple parameters.

```python
def add_subckt(self, name: str, connections: list[str], formal_parameters: list[Feature]) -> None
```

**Parameters:**
- `name` (str): Name of the subcircuit
- `connections` (list[str]): Node connections for the subcircuit
- `formal_parameters` (list[Feature]): Formal parameters of the subcircuit

**Description:** Defines a new subcircuit.

```python
def add_include(self, path: Span) -> None
```

**Parameters:**
- `path` (Span): Path span for the include statement

**Description:** Adds an .include statement to the current circuit.

```python
def add_lib(self, path: Span, argument: Optional[Span]) -> None
```

**Parameters:**
- `path` (Span): Path span for the library file
- `argument` (Optional[Span]): Optional argument for the library

**Description:** Adds a .lib statement with optional argument.

### **Token Validation Utilities**

```python
def maybe_expression_token(self, kind: SpiceTokenKind) -> bool
```

**Parameters:**
- `kind` (SpiceTokenKind): The token kind to check

**Description:** Checks if a token kind can start an expression.

```python
def is_closing_same(self, delimiter: SpiceTokenKind) -> bool
```

**Parameters:**
- `delimiter` (SpiceTokenKind): The delimiter to check

**Description:** Determines if a delimiter can close itself.

```python
def is_new_beginning(self, token: SpiceToken | None) -> bool
```

**Parameters:**
- `token` (SpiceToken | None): The token to check

**Description:** Checks if token starts a new construct (component/dot).

### **Properties**

```python
@property
def current_token(self) -> SpiceToken | None
```

**Description:** Returns the current token.

```python
@property
def prev_token(self) -> SpiceToken | None
```

**Description:** Returns the previous token.

```python
@property
def circuit(self) -> CircuitDef
```

**Description:** Returns the root "main" circuit definition.