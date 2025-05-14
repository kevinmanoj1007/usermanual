---
sidebar_position: 5
---

# Measurements

The **Measurements** section provides a comprehensive set of analysis tools that can be used to evaluate circuit performance across different simulation types. These measurements are automatically extracted after running a simulation and are categorized based on the type of analysis performed.

---

## Transient Analysis

These measurements evaluate the time-domain behavior of the circuit:

- **PD**: Propagation delay.
- **T-diff**: Time difference between two points.
- **Slew**: Signal rise/fall rate.
- **Ternary**: Logic-level transition detection.
- **Time@V**: Time when voltage reaches a specified value.
- **Time@V(x)**: Time when node `x` reaches a specific voltage.
- **Time@V(x)2F**: Time when node `x` reaches a specific voltage with 2 flanks.
- **Time@V(x)LF**: Time when node `x` reaches a voltage with leading flank.
- **Vol@t**: Voltage at a specific time.
- **Vmin**: Minimum voltage value over time.
- **Vavg**: Average voltage over time.
- **AUC**: Area Under the Curve.
- **Vrms**: Root Mean Square voltage.
- **Custom**: User-defined expressions or criteria.

---

## AC Analysis

These measurements are frequency-domain evaluations of the circuit:

- **Vol@f**: Voltage at a specified frequency.
- **Vmax@Frange**: Maximum voltage within a frequency range.
- **Freq@Vol**: Frequency at which a specified voltage occurs.
- **Vdiff**: Voltage difference between two nodes over frequency.
- **Vavg@Frange**: Average voltage over a frequency range.
- **AUC**: Area Under the Curve in the frequency domain.
- **Freq@Vol@F**: Frequency at a specified voltage and frequency condition.
- **Ternary**: Logic-level transition detection in frequency context.
- **Vrms**: Root Mean Square voltage in AC response.
- **Custom**: User-defined frequency-domain expressions.

---

## DC Analysis

These measurements relate to the steady-state operating point of the circuit:

- **Current@t**: Current at a specific time point.
- **Imax**: Maximum current value.
- **Vol@i**: Voltage at a specified current.
- **Custom**: Custom DC analysis measurement expressions.

---

These measurement options allow you to tailor simulation outputs to match specific design goals and evaluation criteria.
