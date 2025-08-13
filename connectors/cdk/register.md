# CDK Configuration, Middleware & Registration

## File: cdk/config.py

This module defines the configuration settings for the Connector Development Kit (CDK).

### Class: CDKSettings

Inherits from BaseSettings, a custom configuration class likely designed to load .env files.

#### Attributes

- **secret** (str): Secret key for authentication.
- **name** (str): Name identifier for the connector.
- **orc_host** (str): Hostname of the orchestrator.
- **orc_port** (int): Port number of the orchestrator (default: 8080).
- **heartbeat_timeout** (int): Time in seconds before heartbeat timeout (default: 20).
- **pool_size** (int): Number of threads or connections (default: 30).
- **data_dir** (str): Directory to store connector data (default: .connector_data).
- **ssl_enabled** (int): Boolean (0 or 1) indicating whether SSL is enabled (default: 1).

#### Methods

- **__init__(env_file: str)**: Initializes the settings by reading from the specified environment file.
- **base_url() -> str**: Constructs the WebSocket URL to the orchestrator using protocol wss or ws.

#### Global Variable

- **cdk_settings**: An instance of CDKSettings, loaded from .env or .test.env based on the TEST_ENV environment variable.

#### Function

- **update_settings(s: CDKSettings)**: Updates the global cdk_settings with a new settings instance.

---

## File: cdk/middleware.py

Defines an abstract Middleware class for processing requests in a chain-like structure.

### Class: Middleware

#### Constructor

- **__init__(app: Callable, dispatch: Optional[Callable] = None)**: Initializes the middleware with an application callable and an optional dispatch function.

#### Methods

- **__call__(request: Request) -> Any**: Asynchronously calls the dispatch function, passing in the request and a reference to the next middleware/app in the chain.
- **dispatch(request: Request, call_next: Callable)**: Abstract method that must be implemented by any subclass to define request handling logic.

---

## File: cdk/register.py

Handles the registration of a connector with the orchestrator.

### Function: register(kind: str, data: dict)

#### Parameters

- **kind** (str): The type/category of the connector.
- **data** (dict): The payload to be sent during registration.

#### Process

1. Validates the presence of the secret key in cdk_settings.
2. Logs the registration attempt.
3. Establishes a WebSocket connection using the Ws service to the registration endpoint.
4. Sends the registration payload and waits for a response.
5. Closes the WebSocket connection gracefully.

#### Exceptions

- Raises **AttributeError** if the secret key is missing from the environment configuration.