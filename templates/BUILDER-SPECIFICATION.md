# Basic Builder Specification

Version: 1.0

Status: IN PROGRESS

---

# Builder

The Basic Builder is a browser-based static website generator.

It generates complete websites without requiring programming knowledge.

The generated website is intended to be immediately deployable.

---

# Runtime Profile

## Properties

```text
Runtime Profile

(●) Standard Web

( ) Tor / I2P
```

---

## Defaults

```text
Standard Web
```

---

## Validation

Exactly one Runtime Profile shall be selected.

---

## Dependencies

```text
IF Runtime Profile = Standard Web

THEN

Enable

SEO

JavaScript

Public Web Metadata
```

```text
IF Runtime Profile = Tor / I2P

THEN

Disable

JavaScript

Hide

SEO

robots.txt

sitemap.xml

Canonical URL

Open Graph

Twitter Cards

Public Search Metadata
```

---

## Output

Runtime Profile changes generation rules only.

It never changes visual appearance.

---

## Extensions

Future Runtime Profiles may be added.

---

# Website Type

## Properties

```text
Website Type

(●) OnePage

( ) MultiPage
```

---

## Defaults

```text
OnePage
```

---

## Validation

Exactly one Website Type shall be selected.

---

## Dependencies

```text
IF Website Type = OnePage

THEN

Single HTML document

Embedded CSS

Disable Separate CSS
```

```text
IF Website Type = MultiPage

THEN

Enable CSS Output selector
```

---

## Output

OnePage

```text
index.html
assets/
```

MultiPage

```text
index.html

additional-pages.html

styles.css

assets/
```

---

## Extensions

Additional website structures may be introduced later.

---

# CSS Output

## Properties

```text
CSS Output

Embedded

Separate File
```

---

## Defaults

```text
Embedded
```

for

```text
OnePage
```

```text
Separate File
```

for

```text
MultiPage
```

---

## Validation

Exactly one CSS mode shall be selected.

---

## Dependencies

```text
IF Website Type = OnePage

THEN

Embedded

Lock selector
```

```text
IF Website Type = MultiPage

THEN

Enable selector
```

---

## Output

Embedded

↓

```text
<style>

...
```

Separate

↓

```text
styles.css
```

---

## Extensions

Future CSS optimization options may be added.

---

# Metadata

## Properties

```text
Generate Metadata

(●) No

( ) Yes
```

---

## Defaults

```text
No
```

---

## Validation

Metadata generation is optional.

---

## Dependencies

```text
IF Runtime Profile = Tor / I2P

AND

Metadata = No

THEN

Generate only required HTML metadata.
```

```text
IF Runtime Profile = Tor / I2P

AND

Metadata = Yes

THEN

Enable

Title

Description

Author

Language

Version
```

---

## Output

Metadata is embedded inside HTML.

No additional runtime dependency is created.

---

## Extensions

Future metadata fields may be added.

---

# Builder Layout

## Properties

Builder Layout

---

## Defaults

None

---

## Validation

Exactly one Builder Layout shall be selected.

---

## Dependencies

Builder Layout determines which Builder Components are available.

---

## Output

Builder Layout combines Builder Components into a complete website.

---

## Extensions

New Builder Layouts may be added without changing Builder architecture.

---

# Components

The Builder consists of reusable components.

Initial components:

```text
Background

Panel

Typography

Buttons

Footer

Metadata
```

Each component is specified independently.

Each component uses the following structure.

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

---

# Rule Engine

The Rule Engine guarantees that conflicting options cannot be selected simultaneously.

Rules use the following form.

```text
IF

THEN
```

Dependencies are deterministic.

The Builder never generates conflicting output.

---

# Validation Engine

Validation occurs continuously while editing.

Invalid configuration should never reach the export phase.

---

# Export

The Builder generates complete static websites.

Generated websites require no Builder runtime.

Typical outputs:

OnePage

```text
index.html

assets/
```

MultiPage

```text
index.html

additional-pages.html

styles.css

assets/
```

---

# Project Configuration

The Builder may optionally export:

```text
project.json
```

The generated website must never depend on this file.

Its purpose is only to reopen the project inside the Builder.

---

# Builder Principles

The Builder shall:

- generate portable websites
- avoid conflicting options
- hide unnecessary complexity
- preserve user ownership
- remain browser-based

---

# Principle

```text
Builder configures.

Rule Engine validates.

Exporter generates.

Users own.
```
