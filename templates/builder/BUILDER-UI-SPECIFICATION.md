# Builder UI Specification

Version: 1.0

Status: IN PROGRESS

---

# Overview

The Builder UI exposes Builder Components.

It never exposes implementation details.

---

# Navigation

The Builder is organized into sections.

```text
Project

Website

Runtime

Layout

Background

Panel

Typography

Buttons

Footer

Metadata

Export
```

---

# Visibility

The Builder displays only controls relevant to the current configuration.

Unavailable controls may be:

```text
Visible

Disabled
```

or

```text
Hidden
```

depending on the Rule Engine.

---

# Rule Engine

Builder behavior is controlled by the Rule Engine.

The UI does not contain Builder logic.

---

# Validation

Validation occurs continuously while editing.

Errors should be presented immediately.

---

# Components

Each section represents a Builder Component.

Component behavior is documented independently.

---

# Principle

```text
UI presents.

Components configure.

Rule Engine controls.

Exporter generates.
```
