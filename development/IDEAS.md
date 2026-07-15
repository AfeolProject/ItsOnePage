# ItsOnePage Development Ideas

Version: 1.0

Status: LIVING DOCUMENT

---

## Scope

This document records possible future directions for ItsOnePage.

Ideas recorded here are not active specifications unless their status is:

```text
ACCEPTED

IN USE
```

Possible entries include:

- Architecture proposals
- Builder improvements
- Specification formats
- Interface changes
- Design proposals
- Automation ideas
- Developer tooling
- Validation systems
- Export formats
- Experimental features

Active requirements remain in their appropriate specification documents.

---

## Idea Status

### PROPOSED

The idea has been recorded but has not yet been evaluated.

### UNDER REVIEW

The idea is being evaluated for feasibility, value, security and compatibility.

### ACCEPTED

The idea has been approved for future implementation.

It is not necessarily implemented.

### IN USE

The idea has been implemented and is actively used.

Its authoritative rules must exist in the appropriate specification or implementation documents.

### REJECTED

The idea was evaluated and intentionally declined.

The rejection reason should remain recorded.

### ARCHIVED

The idea is no longer active but remains preserved for historical context.

---

## Entry Format

Each idea should contain:

```text
ID

Title

Status

Summary

Problem

Proposed Model

Constraints

Open Questions

Acceptance Conditions

Decision
```

Additional sections may be included when required.

---

# IDEA-001 — Specification-Driven Interface Generation

Status:

```text
PROPOSED
```

## Summary

ItsOnePage component specifications may eventually become machine-readable sources for generating:

- Canonical JSON
- Builder controls
- Validation rules
- Dependency rules
- Component registries
- Documentation references
- Export-generator configuration

The objective is to reduce duplicated implementation between documentation, schemas, validation and user interfaces.

---

## Problem

Builder components are currently described in Markdown documents such as:

```text
background.md

panel.md

typography.md

buttons.md
```

The same information may later need to be repeated manually inside:

- TypeScript types
- JSON schemas
- UI forms
- Validation logic
- Rule Engine configuration
- Export generators

Manual duplication creates several risks:

- Documentation and implementation may diverge
- New properties may require changes in several files
- Controls may be implemented inconsistently
- Validation rules may be incomplete
- Component additions may require manual interface changes
- Deprecated properties may remain active accidentally

---

## Proposed Model

Each component remains documented in a human-readable Markdown file.

The document may additionally contain one strictly structured machine-readable block.

Possible formats include:

```text
YAML

JSON

TOML

Another deterministic structured format
```

No canonical format is selected by this proposal.

The selected format must be:

- Deterministic
- Schema-validatable
- Easy to review
- Stable in version control
- Safe to parse
- Independent from artificial intelligence
- Suitable for server-side compilation

---

## Processing Pipeline

```text
Component Specification
        ↓
Structured Machine Block
        ↓
Specification Compiler
        ↓
Schema Validation
        ↓
Canonical JSON
        ↓
Component Registry
        ↓
Generic Interface Renderer
        ↓
Rule Engine
        ↓
Export Generator
```

---

## Source Model

The Markdown file remains readable documentation.

The compiler reads only an explicitly marked structured block.

Example:

```yaml
component:
  id: background
  label: Background
  version: 1

state:
  type: single
  default: none
  options:
    - none
    - color
    - gradient
    - image
```

Free-form explanatory text must never be interpreted as executable configuration.

---

## Possible Component Definition

A future component definition may contain:

```yaml
component:
  id: background
  label: Background
  version: 1

ui:
  section: design
  order: 20

state:
  control: radio
  default: none
  options:
    - value: none
      label: None
    - value: color
      label: Color
    - value: gradient
      label: Gradient
    - value: image
      label: Image

properties:
  color:
    label: Color
    control: color
    default: "#07111c"
    visibleWhen:
      field: state
      equals: color

  gradientType:
    label: Gradient Type
    control: radio
    default: linear
    options:
      - linear
      - radial
    visibleWhen:
      field: state
      equals: gradient

  desktopImage:
    label: Desktop Image
    control: file
    accept:
      - image/jpeg
      - image/png
      - image/webp
    requiredWhen:
      field: state
      equals: image
    visibleWhen:
      field: state
      equals: image

  position:
    label: Position
    control: anchor-grid
    default: center
    visibleWhen:
      field: state
      equals: image

  horizontalOffset:
    label: Horizontal Offset
    control: offset
    default:
      value: 0
      unit: percent
    units:
      - percent
      - pixel
    range:
      min: -100
      max: 100
    visibleWhen:
      field: state
      equals: image

  verticalOffset:
    label: Vertical Offset
    control: offset
    default:
      value: 0
      unit: percent
    units:
      - percent
      - pixel
    range:
      min: -100
      max: 100
    visibleWhen:
      field: state
      equals: image

output:
  generator: background
```

This example is illustrative and not binding.

---

## Canonical JSON

The compiler may generate normalized JSON such as:

```text
generated/components/background.json

generated/components/panel.json

generated/components/typography.json
```

Generated JSON must not be edited manually.

The compiler remains responsible for:

- Parsing
- Normalization
- Validation
- Stable field ordering where practical
- Error reporting
- Registry generation

Example generated output:

```json
{
  "schemaVersion": 1,
  "component": {
    "id": "background",
    "label": "Background",
    "version": 1
  },
  "ui": {
    "section": "design",
    "order": 20
  },
  "state": {
    "control": "radio",
    "default": "none",
    "options": [
      {
        "value": "none",
        "label": "None"
      },
      {
        "value": "color",
        "label": "Color"
      },
      {
        "value": "gradient",
        "label": "Gradient"
      },
      {
        "value": "image",
        "label": "Image"
      }
    ]
  },
  "output": {
    "generator": "background"
  }
}
```

---

## Component Registry

Generated component definitions may be indexed through:

```text
generated/component-registry.json
```

Example:

```json
{
  "schemaVersion": 1,
  "components": [
    {
      "id": "background",
      "source": "./components/background.json"
    },
    {
      "id": "panel",
      "source": "./components/panel.json"
    },
    {
      "id": "typography",
      "source": "./components/typography.json"
    }
  ]
}
```

The interface loads the registry instead of hard-coding every available component.

---

## Generic Interface Renderer

The renderer should support a controlled registry of interface primitives.

Possible controls:

```text
text

textarea

number

range

color

select

radio

checkbox

file

anchor-grid

offset

group

repeater
```

The specification selects a registered control.

It does not provide arbitrary HTML or executable JavaScript.

Example:

```yaml
position:
  control: anchor-grid
  default: center
```

The renderer remains responsible for:

- HTML
- Accessibility
- Keyboard behavior
- Visual consistency
- Error presentation
- Responsive layout
- Disabled states
- Hidden states

---

## Reserved Interface Grid

The application may use stable interface regions:

```text
┌──────────────────────────────────────────┐
│ Application Header                       │
├──────────────┬───────────────────────────┤
│ Component    │ Property Inspector        │
│ Navigation   │                           │
│              │ Generated Controls        │
├──────────────┴───────────────────────────┤
│ Live Preview                             │
├──────────────────────────────────────────┤
│ Validation and Export                    │
└──────────────────────────────────────────┘
```

Component definitions may declare placement metadata:

```yaml
ui:
  section: design
  order: 20
```

A component must not define the complete application layout.

---

## Structured Dependencies

Dependencies should use declarative rules.

Example:

```yaml
visibleWhen:
  field: state
  equals: image
```

A more complex rule may use:

```yaml
enabledWhen:
  all:
    - field: websiteType
      equals: multipage
    - field: cssMode
      notEquals: locked
```

Possible initial operators:

```text
equals

notEquals

in

notIn

all

any

exists

greaterThan

lessThan
```

Arbitrary JavaScript must not be permitted inside specifications.

---

## Rule Effects

Global rules may define controlled effects.

Example:

```yaml
rules:
  - when:
      field: websiteType
      equals: onepage
    effects:
      - field: cssMode
        set: embedded
      - field: cssMode
        disable: true
```

Another example:

```yaml
rules:
  - when:
      field: runtime
      equals: tor-i2p
    effects:
      - field: javascript
        set: none
      - field: javascript
        disable: true
      - section: seo
        hide: true
```

The Rule Engine must support only registered conditions and effects.

---

## Output Generators

Specifications should describe configuration and generator selection.

They should not contain unrestricted executable output code.

Example:

```yaml
output:
  generator: background
```

The registered generator performs the actual output generation.

```text
Specification

Defines properties and rules

Generator

Produces HTML, CSS, assets or configuration
```

This separation reduces security and consistency risks.

---

## Possible Server Architecture

```text
specifications/
├── components/
├── layouts/
└── profiles/

schemas/
├── component.schema.json
├── layout.schema.json
└── profile.schema.json

generated/
├── components/
├── layouts/
├── profiles/
└── registry.json

src/
├── compiler/
├── validator/
├── registry/
├── rule-engine/
├── renderer/
└── generators/
```

This structure is illustrative and not binding.

---

## Automatic Interface Evolution

When an approved component property is added:

```text
Specification updated
        ↓
Compiler executed
        ↓
JSON regenerated
        ↓
Registry updated
        ↓
Interface renderer reloads
        ↓
New control appears
```

Manual changes to the central interface should not be required when the new property uses an existing registered control.

A new control type still requires implementation inside the renderer.

---

## Documentation Relationship

The system should preserve three distinct layers:

```text
Human Documentation

Machine Specification

Generated Artifacts
```

Human documentation explains the component.

The machine-readable block defines deterministic data.

Generated artifacts support implementation.

Generated artifacts must not replace the source specification.

---

## Source-of-Truth Options

Possible future models include:

### Embedded Machine Block

```text
component.md
```

contains both human documentation and structured data.

Advantages:

- One source file
- Documentation and machine data remain close
- Easier review of related changes

Risks:

- Markdown becomes more complex
- Machine blocks may become large
- Parsing boundaries must remain strict

### Separate Structured File

```text
background.md

background.yaml
```

or:

```text
background.md

background.json
```

Advantages:

- Cleaner separation
- Simpler parsing
- Easier schema validation

Risks:

- Documentation and data may diverge
- Every component requires multiple files

### Structured Source Generates Documentation

```text
background.yaml
        ↓
background.md
        ↓
background.json
```

Advantages:

- One canonical machine source
- Strong consistency

Risks:

- Human documentation becomes generated
- Less natural editing
- Greater tooling dependency

No source-of-truth model is selected by this proposal.

---

## Security Constraints

The future implementation must prohibit:

- Arbitrary JavaScript in specifications
- Arbitrary server commands
- Unvalidated output paths
- Path traversal
- Undeclared remote code
- Dynamic module loading from untrusted locations
- Silent schema coercion
- Machine interpretation of unrestricted prose

All specifications must pass schema validation before registry publication.

---

## Validation Requirements

The compiler should reject:

- Missing component IDs
- Duplicate component IDs
- Unsupported control types
- Invalid default values
- Invalid option values
- Invalid dependency targets
- Unsupported operators
- Unknown generators
- Invalid output paths
- Circular dependencies
- Unsupported schema versions

Validation errors should include:

```text
Source file

Component ID

Property path

Error code

Human-readable message
```

---

## Versioning

Every machine-readable specification should declare:

```text
schemaVersion

component version
```

Schema migrations must be explicit.

Existing valid component definitions should remain supported whenever practical.

Generated artifacts should identify the source schema version.

---

## Build and Deployment

Possible compilation points:

```text
Local development

Continuous integration

Server deployment

Administrative publication
```

The production server should consume only validated generated artifacts.

Unvalidated source specifications must not be published directly.

---

## Review Workflow

A possible future workflow:

```text
Specification changed
        ↓
Compiler validation
        ↓
Generated diff
        ↓
Human review
        ↓
Automated tests
        ↓
Registry publication
```

Generated changes should remain visible during review.

---

## Testing

A future implementation should test:

- Schema validation
- Compiler normalization
- Registry generation
- Control rendering
- Dependency evaluation
- Validation messages
- Output generator selection
- Backward compatibility
- Invalid specification rejection

Golden-file testing may be used for canonical JSON output.

---

## Potential Applications

The architecture may later support more than the ItsOnePage Builder.

Possible uses:

- Website builders
- Administrative interfaces
- Configuration portals
- Onboarding workflows
- Deployment configurators
- Documentation editors
- Technical calculators
- Static form generators

These uses are not part of the current ItsOnePage scope.

---

## Constraints

This proposal must not:

- Replace readable documentation with opaque configuration
- Require artificial intelligence during compilation
- Allow arbitrary executable code in specifications
- Make generated websites depend on the specification server
- Force immediate migration of existing Builder code
- Become an implementation requirement before formal acceptance
- Prevent manually developed custom interfaces
- Couple generated websites to the component registry

---

## Open Questions

```text
Which structured format should be canonical?

Should Markdown contain the machine block?

Should machine specifications use separate files?

Should JSON be generated or authored directly?

Should layouts and profiles use the same schema model?

Which controls belong to the initial renderer registry?

How are specification migrations handled?

How are custom generators registered safely?

Should the compiler run during CI, deployment or both?

How are circular dependencies detected?

Should generated artifacts be committed to Git?

How are third-party component definitions reviewed?

Can custom projects extend the control registry?

Which fields belong in the canonical component schema?
```

---

## Acceptance Conditions

This idea may move to:

```text
ACCEPTED
```

when the project has:

- A selected structured source format
- A component schema draft
- A deterministic compiler prototype
- A validated component registry
- A generic renderer prototype
- A defined security boundary
- A migration plan for existing component documents
- A dependency-cycle detection strategy
- A generator registration model

It may move to:

```text
IN USE
```

only after the generated interface successfully supports at least:

- Background
- Panel
- Typography
- Buttons
- Validation
- Conditional dependencies
- Registry loading
- Safe generator selection

---

## Rejection Conditions

This idea should be rejected if implementation demonstrates that it:

- Makes component development substantially harder
- Produces less readable specifications
- Requires unrestricted code execution
- Cannot provide deterministic output
- Creates unacceptable schema migration costs
- Prevents necessary custom interface behavior
- Adds more maintenance work than it removes

---

## Decision

No implementation decision has been made.

Current state:

```text
Recorded for future evaluation.
```
