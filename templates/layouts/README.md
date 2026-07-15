# Builder Layouts

Version: 1.0

Status: IN PROGRESS

---

# Overview

A Builder Layout defines the page structure used by the Basic Builder.

Layouts do not define styling.

Layouts arrange Builder Components.

---

# Initial Layouts

```text
Hero
```

Future layouts:

```text
Split

Centered

Glass

Portfolio

Landing

Article
```

---

# Components

Layouts are composed of Builder Components.

Current components:

```text
Background

Panel

Typography

Buttons

Footer

Metadata
```

---

# Independence

Layouts contain no implementation logic.

Component behavior is defined by individual component specifications.

Builder behavior is defined by the Rule Engine.

---

# Principle

```text
Layout

↓

Components

↓

Rule Engine

↓

Generated Website
```
