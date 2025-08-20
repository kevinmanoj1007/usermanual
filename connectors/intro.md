---
id: intro
title: Introduction to Connectors
---

# Connectors

Welcome to the **Connectors** section of the Genie User Manual.

This section provides comprehensive documentation for building and implementing connector systems that integrate external tools and simulation engines with the Genie platform. Connectors are built using the Connector Development Kit (CDK) framework and follow standardized patterns for WebSocket-based communication, data validation, and request handling.

## What You'll Find Here

### CDK (Connector Development Kit)
Core framework components for building connectors:
- [BaseConnector](baseconnector) - Abstract base class for WebSocket-based connectors
- [BaseDomain](basedomain) - Foundation for domain-specific request handlers
- [Router](router) - Endpoint registration and request dispatching system
- [Middleware](middleware) - Request/response processing pipeline
- [CDKSettings](cdksettings) - Configuration management
- [Registration](register) - Orchestrator registration utilities

### SimPackage Implementation
A complete connector implementation for simulation engines:
- [SimConnector](simconnector) - Simulation-focused connector implementation
- [SimInterface](siminterface) - Abstract interface for simulator backends
- [Simulator](simulatordomain) - Domain handler for simulation requests
- [Router Handlers](simcontroller) - API endpoints for simulation operations
- [Connector Models](slim-models) - Pydantic data validation models

## Architecture Overview

Connectors follow a layered architecture:

1. **Connection Layer**: WebSocket-based communication with the Genie orchestrator
2. **Routing Layer**: Request dispatching to appropriate handlers with middleware support
3. **Domain Layer**: Business logic processing with strategy pattern implementations
4. **Data Layer**: Pydantic models for structured data validation and serialization

## Why Use the CDK Framework?

The CDK provides a standardized approach to connector development:

- **Consistent Interface**: All connectors follow the same communication patterns
- **Built-in Features**: WebSocket management, heartbeat handling, error recovery
- **Middleware Support**: Extensible request/response processing pipeline
- **Type Safety**: Pydantic-based data validation and serialization
- **Strategy Pattern**: Pluggable backend implementations via interface abstractions
- **Production Ready**: Connection pooling, thread management, and robust error handling

## Current Connector Implementations

- **Simulation Connectors**: Support for electrical circuit simulators (NgSpice, LTSpice, Cadence)
  - Schematic upload and netlist extraction
  - Parameter extraction and modification
  - Simulation execution and results capture
  - Dependency management and circuit porting

## Getting Started

### For Connector Users
Navigate to the SimPackage section to learn how to configure and use existing simulation connectors.

### For Connector Developers
Start with the CDK documentation to understand the framework components, then examine the SimPackage implementation as a reference for building domain-specific connectors.

Each connector must implement:
- A strategy class extending the appropriate interface
- Domain-specific request handlers
- Data models for request/response validation
- Registration with the Genie orchestrator
