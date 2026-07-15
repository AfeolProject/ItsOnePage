# Validation Rules

Version: 1.0

Status: FOUNDATION

---

# Overview

Validation ensures that Builder configurations remain internally consistent.

Invalid configurations shall never reach the Export Engine.

---

# Validation Levels

Validation occurs on three levels.

```text
Builder

↓

Component

↓

Property
```

---

# Builder Validation

Builder Validation verifies:

- Runtime Profile
- Website Type
- Builder Layout
- Export configuration

---

# Component Validation

Each component validates its own state.

Examples:

```text
Background

Panel

Buttons

Metadata
```

---

# Property Validation

Each property validates:

- required values
- allowed ranges
- allowed units
- allowed formats

---

# Continuous Validation

Validation occurs continuously while editing.

Users should receive immediate feedback.

---

# Rule Engine

Validation is coordinated by the Rule Engine.

Validation never modifies Builder data.

It reports invalid configuration.

---

# Principle

```text
Prevent.

Validate.

Export.
```
