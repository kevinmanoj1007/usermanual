# Spice Parser

## Classes

### `SpiceParser`
Parses SPICE netlists into structured AST representations.

**Attributes**
- `delims: dict[SpiceTokenKind, SpiceTokenKind]` – Maps opening tokens (parentheses, braces, quotes, etc.) to their matching closing tokens.
- `lexer: SpiceLexer` – Tokenizer for SPICE source code.
- `tokens: list[SpiceToken]` – List of tokens generated from the lexer.
- `current: int` – Current token index during parsing.
- `context: list[str]` – Parsing context stack (e.g., current subcircuit, defaults to `["main"]`).
- `circuits: dict[str, CircuitDef]` – Parsed circuits by name, with `"main"` as the root circuit.
- `errors: list[str]` – Collected error messages during parsing.

**Methods**
- `__init__(source: str)` – Initializes the parser with SPICE source text.
- `parse()` – Main parse loop; processes components, dot-commands, and recovers from errors.
- `dot_command()` – Handles SPICE dot-commands (`.param`, `.subckt`, `.include`, `.lib`, `.ends`).
- `component()` – Parses a SPICE component line and adds it to the current circuit.
- `eat_connections(max_connections: int)` – Reads node connections for a component or subcircuit.
- `eat_expression()` – Consumes an expression starting at the current token.
- `eat_delimited_expression(delimiter: SpiceTokenKind)` – Reads expressions enclosed by delimiters (e.g., parentheses).
- `eat_features()` – Extracts features (parameter assignments) and outliers.
- `find_first_feature_ident()` – Detects the first feature identifier following a component.
- `get_source_snippet(span: Span)` – Returns raw source code corresponding to a span.
- `get_current_token_snippet()` – Gets snippet text for the current token.
- `is_current_keyword_match(kw: str)` – Checks if current token matches a keyword.
- `is_keyword_match(token: SpiceToken | None, kw: str)` – Checks if a token matches a keyword.
- `kind_matches(token: SpiceToken | None, kind: SpiceTokenKind)` – Checks if token kind matches expected kind.
- `is_at_end()` – Returns whether parsing has reached the end of tokens.
- `bump()` – Advances the parser to the next token.
- `peek(n=1)` – Looks ahead `n` tokens without consuming.
- `eat_until(kind: SpiceTokenKind)` – Consumes tokens until a specific kind is found.
- `eat_while(f: Callable[[SpiceToken], bool])` – Consumes tokens while predicate `f` is true.
- `eat_until_expression_token()` – Consumes tokens until an expression token or new beginning is found.
- `eat_until_unescaped_whitespace()` – Consumes until unescaped whitespace is found.
- `skip_whitespaces()` – Skips whitespace tokens.
- `recover()` – Error recovery; skips tokens until a valid start (`Component` or `Dot`).
- `add_component(c: Component)` – Adds a component to the current circuit.
- `add_parameter(p: Feature)` – Adds a parameter to the current circuit.
- `add_parameters(p: list[Feature])` – Adds multiple parameters.
- `add_subckt(name: str, connections: list[str], formal_parameters: list[Feature])` – Defines a new subcircuit.
- `add_include(path: Span)` – Adds an `.include` statement to the current circuit.
- `add_lib(path: Span, argument: Optional[Span])` – Adds a `.lib` statement with optional argument.
- `add_error(message: str)` – Records a parsing error.
- `maybe_expression_token(kind: SpiceTokenKind)` – Checks if a token kind can start an expression.
- `is_closing_same(delimiter: SpiceTokenKind)` – Determines if a delimiter can close itself.
- `is_new_beginning(token: SpiceToken | None)` – Checks if token starts a new construct (component/dot).

**Properties**
- `current_token` – Returns the current token.
- `prev_token` – Returns the previous token.
- `circuit` – Returns the root `"main"` circuit definition.