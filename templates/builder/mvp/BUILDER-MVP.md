# Basic Builder MVP

Version: 1.0

Status: IN PROGRESS

## Scope

The MVP provides:

- Browser-only operation
- Standard Web and Tor / I2P profiles
- OnePage and MultiPage output modes
- Context-sensitive controls
- Live preview
- Static HTML generation
- Optional separate CSS generation
- No external dependencies

## Runtime Profiles

```text
Standard Web

Tor / I2P
```

Tor / I2P output requires:

- No JavaScript
- No remote assets
- No external fonts
- No analytics
- No public-web SEO subsystem
- Local assets only

## Website Types

```text
OnePage

MultiPage
```

### OnePage

```text
index.html
```

CSS is embedded and the CSS selector is disabled.

### MultiPage

```text
index.html
styles.css
```

The user may select embedded or separate CSS.

## Components

Initial MVP components:

- Runtime
- Website Type
- Metadata
- Background
- Panel
- Typography
- Buttons
- Export

## Background

Supported states:

```text
None
Color
Gradient
Image
```

Image positioning supports:

```text
Top Left
Top Center
Top Right
Center Left
Center
Center Right
Bottom Left
Bottom Center
Bottom Right
```

Fine positioning supports percentage or pixel offsets.

## Output

The generated website does not depend on the Builder.

The Builder itself uses browser JavaScript.

Tor / I2P website output does not contain JavaScript.
