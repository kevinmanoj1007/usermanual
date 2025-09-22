# Model Optimization

This page allows users to configure, run, and monitor optimization models for electronic design tasks such as PSRR, Noise, Load Regulation, and Line Regulation. Below are the detailed descriptions of each section and field:

## Left Navigation Panel

- **PSRR, Noise, Transient_Load_Regulation, Transient_Line_Regulation, etc.** These are selectable optimization categories or test scenarios. Each represents a different type of simulation/analysis that can be run.

## Main Configuration Panel

### Agent Selection

- **Agent (Dropdown):** Allows the user to select a trained optimization model. Example: *TI-TPS7A21-Line_Regulation* – a model trained to optimize Texas Instruments' TPS7A21 LDO for line regulation.
- **Refresh Button (↻):** Refreshes the available agents list.
- **Model details Button:** Opens a popup window with detailed information about the selected model (name, description, design parameters, target specifications).

### Inference & Status

- **Inference (Checkbox):** Toggles inference mode for predictions.
- **Status (Indicator):** Shows current model readiness/connection status.
  - Green dot = Active/Ready
  - Red dot = Inactive/Failed

### Input Parameters

Each parameter row allows users to define conditions for the optimization run:

1. **Parameter Name Field (Text box):** Defines the input condition (e.g., *Vin_5v*, *Vin_6v*).
2. **Output Mapping Field (Text box):** Defines the output variable being measured under that condition (e.g., *Vout_at_5V_Vin*, *Vout_at_6V_Vin*).
3. **Mode Dropdown:**
   - *Range*: Allows specifying a lower and upper bound for expected output.
   - Other modes (if available) may define single-point or tolerance-based values.
4. **Value Fields (Numeric Inputs):** The range values for validation. Example: *3.25 – 3.35*.
5. **Add Row (+ Button):** Adds additional parameter-output pairs for configuration.

## Model Details Popup (Second Screenshot)

When **Model details** is clicked, a popup displays:

- **Model Name:** Example: *TI-TPS7A21-Line_Regulation*.
- **Model Description:** Example: *Trained to optimize the TPS7A21 LDO by Texas Instruments for the task of line regulation.*
- **Tabs in Popup:**
  - *Details:* Basic model metadata (shown in screenshot).
  - *Design parameter specifications:* Defines what design parameters the model considers during optimization.
  - *Target specifications:* Defines the expected or desired target outcomes.
- **Initiate model transfer (Button):** Starts the process of transferring the model for use in optimization.

## Action Buttons

- **Upload/Download Icons:** Allow saving or importing configuration files.
- **Genie Optimize Button:** Runs the optimization process with the current setup.

## System Feedback

- **Highlighted Warning Message:** Example: *"Disproportionate active parameters – expected '36' – got '46'."* Indicates a mismatch between expected and configured parameters. This must be corrected before optimization can proceed.