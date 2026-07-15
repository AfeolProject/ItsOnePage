# ItsOnePage Templates

Version: 1.0

Status: IN PROGRESS

---

# Purpose

The Templates subsystem defines how websites are represented, generated, published and distributed within the ItsOnePage ecosystem.

The system consists of two independent parts:

- Basic Builder
- Custom Templates

Both produce portable static websites.

---

# Architecture

```text
Templates

├── Basic Builder
│
│   Browser-based generator
│
│   Generates free static websites
│
└── Custom Templates

    Independently developed

    Free or Premium
```

---

# Basic Builder

The Basic Builder is a browser-based website generator.

It allows users to configure predefined layouts without writing code.

The generated website belongs entirely to its owner.

The Builder itself is always free.

Generated output is intended for static deployment.

Typical output:

```text
index.html
assets/
```

or

```text
index.html
about.html
contact.html
styles.css
assets/
```

depending on the selected website type.

---

# Runtime Profile

The Builder supports runtime profiles.

Initial profiles:

```text
Standard Web

Tor / I2P
```

A runtime profile defines runtime restrictions.

It does not define appearance.

---

# Website Types

The Builder supports:

```text
OnePage

MultiPage
```

## OnePage

Produces a single HTML document.

CSS is embedded inside the HTML document.

## MultiPage

Produces multiple HTML documents.

CSS may be embedded or generated as a separate local stylesheet.

---

# Custom Templates

Custom Templates are independently implemented.

Their authors control:

- HTML
- CSS
- JavaScript
- Design
- Licensing
- Pricing
- Distribution

Custom Templates may be:

```text
Free

Premium

Commercial

Custom Work
```

---

# Gallery

The Template Gallery is generated automatically.

Source:

```text
template.json
```

↓

```text
generate-gallery.mjs
```

↓

```text
gallery/index.html
```

The gallery itself is completely static.

---

# Template Metadata

Each template provides:

```text
template.json
```

Metadata is used for:

- Gallery generation
- Search
- Filtering
- Validation

The gallery never modifies templates.

---

# Builder

The Builder is specified separately.

Primary documents:

```text
builder/

README.md

BUILDER-SPECIFICATION.md

BUILDER-UI-SPECIFICATION.md

RULE-ENGINE.md

VALIDATION-RULES.md

EXPORT-SPECIFICATION.md

COMPONENTS.md
```

---

# Components

Builder components are documented independently.

Each component uses the same document structure.

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

Initial components:

```text
Background

Panel

Typography

Buttons

Footer

Metadata

Export
```

---

# Rule Engine

Builder behavior is driven by rules.

Example:

```text
IF Website Type = OnePage

THEN

CSS Output = Embedded

CSS selector = Disabled
```

Example:

```text
IF Runtime = Tor / I2P

THEN

JavaScript = Disabled

SEO = Hidden
```

---

# Generated Websites

Generated websites are static.

They require no Builder runtime.

Users may host them on any compatible static web server.

---

# Ownership

Generated websites belong entirely to their owners.

Users are never required to:

- Maintain a Builder account
- Use ItsOnePage hosting
- Continue using the Builder
- Purchase a subscription

---

# Principle

```text
Generate.

Download.

Publish.

Own.
```
