---
title: Frequently Asked Questions (FAQ)
description: Common questions about the platform and its features
---

# Frequently Asked Questions (FAQ)

## What is this platform used for?

This platform allows users to build, simulate, and manage AI-driven or circuit-based projects using connectors, agents, and orchestration tools.

## What is a Connector?

A Connector is a module that links your project to an external service or system, allowing communication and data exchange through WebSocket connections.

## What is a Domain?

A Domain defines how messages and requests are handled within a specific area of functionality, such as simulation or circuit analysis.

## What is the Orchestrator?

The Orchestrator is the central service that manages and coordinates all connectors, agents, and communication across the platform.

## How do I register a Connector?

You can register a connector using the `register()` function, which connects it to the Orchestrator and sends the necessary configuration data.

## What is Middleware used for?

Middleware helps process requests before and after they reach the main handler, often used for synchronization, logging, or performance tracking.

## What is SPICE in this platform?

SPICE (Simulation Program with Integrated Circuit Emphasis) is used to simulate electronic circuits and analyze their behavior.

## What is the difference between a Personal and a Professional account?

A Personal account is for individual users working alone, while a Professional account supports small teams and collaboration.

## How do I start a simulation?

Use the Simulator module to send a simulation request with your circuit data; it will process the request and return the results.

## What should I do if my WebSocket connection fails?

Check your internet connection, verify your configuration settings, and ensure the Orchestrator service is running properly.