# Builder Components

Version: 1.0

Status: IN PROGRESS

---

# Overview

Builder Components are reusable building blocks used by Builder Layouts.

A Builder Layout is composed of one or more Builder Components.

Components are independent.

Each component defines:

- available states
- configurable properties
- validation rules
- dependencies
- generated output
- future extensions

---

# Component Specification

Every component uses the following document structure.

```text
Component

State

Properties

Defaults

Validation

Dependencies

Output

Extensions
```

The structure is identical for every component.

---

# Initial Components

```text
Background

Panel

Typography

Buttons

Footer

Metadata

Export
```

Additional components may be introduced without changing Builder architecture.

---

# Component Independence

Each component owns its own:

- validation
- dependencies
- generated output

Global Builder behavior is defined separately by the Rule Engine.

---

# Builder Layout

Builder Layouts assemble multiple Builder Components into a complete website.

Components remain reusable across different layouts.

---

# Principle

```text
Layouts compose.

Components define.

Rule Engine coordinates.
```
