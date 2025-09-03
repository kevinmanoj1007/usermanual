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
    
    def __init__(self, source: str):
        pass
    
    def parse(self) -> None:
        pass
    
    def dot_command(self) -> None:
        pass
    
    def component(self) -> None:
        pass
    
    def eat_connections(self, max_connections: int) -> list[str]:
        pass
    
    def eat_expression(self) -> Expression:
        pass
    
    def eat_delimited_expression(self, delimiter: SpiceTokenKind) -> Expression:
        pass
    
    def eat_features(self) -> tuple[list[Feature], list[str]]:
        pass
    
    def find_first_feature_ident(self) -> int:
        pass
    
    def get_source_snippet(self, span: Span) -> str:
        pass
    
    def get_current_token_snippet(self) -> str:
        pass
    
    def is_current_keyword_match(self, kw: str) -> bool:
        pass
    
    def is_keyword_match(self, token: SpiceToken | None, kw: str) -> bool:
        pass
    
    def kind_matches(self, token: SpiceToken | None, kind: SpiceTokenKind) -> bool:
        pass
    
    def is_at_end(self) -> bool:
        pass
    
    def bump(self) -> None:
        pass
    
    def peek(self, n=1) -> SpiceToken | None:
        pass
    
    def eat_until(self, kind: SpiceTokenKind) -> list[SpiceToken]:
        pass
    
    def eat_while(self, f: Callable[[SpiceToken], bool]) -> list[SpiceToken]:
        pass
    
    def eat_until_expression_token(self) -> list[SpiceToken]:
        pass
    
    def eat_until_unescaped_whitespace(self) -> list[SpiceToken]:
        pass
    
    def skip_whitespaces(self) -> None:
        pass
    
    def recover(self) -> None:
        pass
    
    def add_component(self, c: Component) -> None:
        pass
    
    def add_parameter(self, p: Feature) -> None:
        pass
    
    def add_parameters(self, p: list[Feature]) -> None:
        pass
    
    def add_subckt(self, name: str, connections: list[str], formal_parameters: list[Feature]) -> None:
        pass
    
    def add_include(self, path: Span) -> None:
        pass
    
    def add_lib(self, path: Span, argument: Optional[Span]) -> None:
        pass
    
    def add_error(self, message: str) -> None:
        pass
    
    def maybe_expression_token(self, kind: SpiceTokenKind) -> bool:
        pass
    
    def is_closing_same(self, delimiter: SpiceTokenKind) -> bool:
        pass
    
    def is_new_beginning(self, token: SpiceToken | None) -> bool:
        pass
    
    @property
    def current_token(self) -> SpiceToken | None:
        pass
    
    @property
    def prev_token(self) -> SpiceToken | None:
        pass
    
    @property
    def circuit(self) -> CircuitDef:
        pass
```

## Attributes

| Name | Type | Description |
|------|------|-------------|
| `delims` | `dict[SpiceTokenKind, SpiceTokenKind]` | Maps opening tokens (parentheses, braces, quotes, etc.) to their matching closing tokens |
| `lexer` | `SpiceLexer` | Tokenizer for SPICE source code |
| `tokens` | `list[SpiceToken]` | List of tokens generated from the lexer |
| `current` | `int` | Current token index during parsing |
| `context` | `list[str]` | Parsing context stack (e.g., current subcircuit, defaults to ["main"]) |
| `circuits` | `dict[str, CircuitDef]` | Parsed circuits by name, with "main" as the root circuit |
| `errors` | `list[str]` | Collected error messages during parsing |

## Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| `__init__` | `source: str` | | Initializes the parser with SPICE source text |
| `parse` | | `None` | Main parse loop; processes components, dot-commands, and recovers from errors |
| `dot_command` | | `None` | Handles SPICE dot-commands (.param, .subckt, .include, .lib, .ends) |
| `component` | | `None` | Parses a SPICE component line and adds it to the current circuit |
| `eat_connections` | `max_connections: int` | `list[str]` | Reads node connections for a component or subcircuit |
| `eat_expression` | | `Expression` | Consumes an expression starting at the current token |
| `eat_delimited_expression` | `delimiter: SpiceTokenKind` | `Expression` | Reads expressions enclosed by delimiters (e.g., parentheses) |
| `eat_features` | | `tuple[list[Feature], list[str]]` | Extracts features (parameter assignments) and outliers |
| `find_first_feature_ident` | | `int` | Detects the first feature identifier following a component |
| `get_source_snippet` | `span: Span` | `str` | Returns raw source code corresponding to a span |
| `get_current_token_snippet` | | `str` | Gets snippet text for the current token |
| `is_current_keyword_match` | `kw: str` | `bool` | Checks if current token matches a keyword |
| `is_keyword_match` | `token: SpiceToken \| None, kw: str` | `bool` | Checks if a token matches a keyword |
| `kind_matches` | `token: SpiceToken \| None, kind: SpiceTokenKind` | `bool` | Checks if token kind matches expected kind |
| `is_at_end` | | `bool` | Returns whether parsing has reached the end of tokens |
| `bump` | | `None` | Advances the parser to the next token |
| `peek` | `n=1` | `SpiceToken \| None` | Looks ahead n tokens without consuming |
| `eat_until` | `kind: SpiceTokenKind` | `list[SpiceToken]` | Consumes tokens until a specific kind is found |
| `eat_while` | `f: Callable[[SpiceToken], bool]` | `list[SpiceToken]` | Consumes tokens while predicate f is true |
| `eat_until_expression_token` | | `list[SpiceToken]` | Consumes tokens until an expression token or new beginning is found |
| `eat_until_unescaped_whitespace` | | `list[SpiceToken]` | Consumes until unescaped whitespace is found |
| `skip_whitespaces` | | `None` | Skips whitespace tokens |
| `recover` | | `None` | Error recovery; skips tokens until a valid start (Component or Dot) |
| `add_component` | `c: Component` | `None` | Adds a component to the current circuit |
| `add_parameter` | `p: Feature` | `None` | Adds a parameter to the current circuit |
| `add_parameters` | `p: list[Feature]` | `None` | Adds multiple parameters |
| `add_subckt` | `name: str, connections: list[str], formal_parameters: list[Feature]` | `None` | Defines a new subcircuit |
| `add_include` | `path: Span` | `None` | Adds an .include statement to the current circuit |
| `add_lib` | `path: Span, argument: Optional[Span]` | `None` | Adds a .lib statement with optional argument |
| `add_error` | `message: str` | `None` | Records a parsing error |
| `maybe_expression_token` | `kind: SpiceTokenKind` | `bool` | Checks if a token kind can start an expression |
| `is_closing_same` | `delimiter: SpiceTokenKind` | `bool` | Determines if a delimiter can close itself |
| `is_new_beginning` | `token: SpiceToken \| None` | `bool` | Checks if token starts a new construct (component/dot) |

## Properties

| Name | Return Type | Description |
|------|-------------|-------------|
| `current_token` | `SpiceToken \| None` | Returns the current token |
| `prev_token` | `SpiceToken \| None` | Returns the previous token |
| `circuit` | `CircuitDef` | Returns the root "main" circuit definition |
