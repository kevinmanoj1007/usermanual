---
sidebar_position: 2
---

# Circuit Properties

The website provides an interface to create, manage, and share circuit information through three main actions: **defining properties, uploading circuits, and importing/exporting circuits**.

## Circuit Properties

This section allows you to define and manage the details of your circuit. The following fields are available:

- **Circuit Name**: The name of the circuit you're working on. It must start with a letter and can include only letters, numbers, and underscores.
- **Tool**: Select the simulation tool you used for the circuit design from the dropdown. Available options include:
  - LTSpice-Azure
  - Ngspice-Azure-1
- **Description**: Write a brief note about the circuit, including its purpose and functionality (up to 1000 characters).
- **Circuit Schematic**: Upload the schematic file of your circuit by clicking **Upload Circuit**.
- **Circuit Dependencies**: Choose the dependency type (Models, Sub-Circuits, Libraries, or Symbols) and drag and drop the relevant files. You may add multiple dependencies.
- **Circuit Image**: Upload an image that visually represents your circuit.

At the top right of the page, the **Export Circuit** button allows you to export the circuit details into a file. This file can later be imported back into the system.

At the bottom of the page, you have three options:

- **Save circuit**: Save the current circuit with the details provided.
- **Save and add another circuit**: Save the current circuit and open a new blank form to add another one.
- **Reset changes**: Clear all fields and reset the form.

## Upload Circuit

The **Upload Circuit** page is used to create a new circuit entry with all its supporting files. The available fields and options are the same as in *Circuit Properties*:

- Circuit name
- Tool
- Description
- Circuit schematic
- Circuit dependencies
- Circuit image

At the top right of this page, you will also find the **Import Circuit** button, which allows you to bring in circuit data from an exported file.

## Import Circuit

When you click **Import Circuit**, a dialog box appears. This dialog enables you to import a previously exported circuit by filling in the following details:

- **Circuit Name:** Enter a name for the imported circuit.
- **Tool:** Select the appropriate simulation tool from the dropdown.
- **Circuit Export File:** Drag and drop the **.zip** export file (the file generated during export).

At the bottom of the dialog, you can either:

- **Save Circuit:** Save the imported circuit.
- **Cancel:** Exit the dialog without saving.

## Export Circuit

The **Export Circuit** option allows you to export an existing circuit and all its supporting files into a single **.zip** package. This makes it easy to share or re-import later.



The exported **.zip** file can then be re-imported using the **Import Circuit** feature.