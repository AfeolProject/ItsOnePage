# Builder Rule Engine

Version: 1.0

Status: FOUNDATION

---

# Overview

The Rule Engine controls Builder behavior.

It determines:

- available options
- disabled options
- hidden options
- generated output

The Rule Engine never changes visual design.

It only controls Builder logic.

---

# Rule Format

Every rule uses the same format.

```text
IF

THEN
```

Rules are deterministic.

The same input always produces the same output.

---

# Rule Priority

Rules are evaluated in the following order.

```text
Runtime Profile

↓

Website Type

↓

Builder Layout

↓

Component State

↓

Component Properties
```

Higher priority rules override lower priority rules.

---

# Runtime Rules

## Runtime Profile

```text
IF

Runtime Profile = Standard Web

THEN

Enable

SEO

JavaScript

Public Metadata
```

---

```text
IF

Runtime Profile = Tor / I2P

THEN

Disable

JavaScript
```

---

```text
IF

Runtime Profile = Tor / I2P

THEN

Hide

SEO

robots.txt

sitemap.xml

Canonical URL

Open Graph

Twitter Cards

Structured Search Metadata
```

---

```text
IF

Runtime Profile = Tor / I2P

THEN

Allow

Document Metadata
```

---

# Website Type Rules

```text
IF

Website Type = OnePage

THEN

Embedded CSS

Disable CSS selector
```

---

```text
IF

Website Type = MultiPage

THEN

Enable CSS selector
```

---

```text
IF

Website Type = OnePage

THEN

Generate

index.html
```

---

```text
IF

Website Type = MultiPage

THEN

Generate

Multiple HTML documents
```

---

# CSS Rules

```text
IF

Website Type = OnePage

THEN

CSS Output

Embedded
```

---

```text
IF

Website Type = MultiPage

THEN

Allow

Embedded

Separate CSS
```

---

# Metadata Rules

```text
IF

Metadata = No

THEN

Generate only required HTML metadata
```

---

```text
IF

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

# Background Rules

```text
IF

Background State = None

THEN

Disable

Background Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

```text
IF

Background State = Color

THEN

Enable

Color
```

---

```text
IF

Background State = Gradient

THEN

Enable

Gradient Type

Start Color

End Color

Angle
```

---

```text
IF

Background State = Image

THEN

Enable

Desktop Image

Tablet Image

Mobile Image

Background Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

# Panel Rules

```text
IF

Panel State = None

THEN

Disable

Opacity

Blur

Border

Shadow

Padding

Radius
```

---

```text
IF

Panel State = Solid

THEN

Enable

Background Color

Opacity

Border

Radius

Shadow
```

---

```text
IF

Panel State = Glass

THEN

Enable

Opacity

Blur

Border

Radius

Shadow
```

---

# Typography Rules

```text
IF

Heading = Hidden

THEN

Disable

Heading Color

Heading Size
```

---

```text
IF

Body = Hidden

THEN

Disable

Body Color

Body Size
```

---

# Button Rules

```text
IF

Buttons = None

THEN

Disable

Primary Button

Secondary Button
```

---

```text
IF

Buttons = One

THEN

Enable

Primary Button

Disable

Secondary Button
```

---

```text
IF

Buttons = Two

THEN

Enable

Primary Button

Secondary Button
```

---

# Footer Rules

```text
IF

Footer = Hidden

THEN

Disable

Footer Text

Footer Links
```

---

# Export Rules

```text
IF

Website Type = OnePage

THEN

Generate

index.html
```

---

```text
IF

Website Type = MultiPage

THEN

Generate

index.html

additional HTML pages
```

---

```text
IF

Project Export = Yes

THEN

Generate

project.json
```

---

```text
IF

Project Export = No

THEN

Do not generate

project.json
```

---

# Validation Rules

The Rule Engine prevents invalid configurations.

Invalid Builder states shall never reach the Export Engine.

---

# Conflicts

Conflicting options shall never be selectable simultaneously.

The Builder resolves conflicts automatically through deterministic rules.

---

# Extensions

Future Builder Components may introduce additional rules.

Existing rules should remain backward compatible whenever reasonably possible.

---

# Principle

```text
User

↓

Builder

↓

Rule Engine

↓

Validation

↓

Export

↓

Static Website
```
