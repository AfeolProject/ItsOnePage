# Official Template Guide

Version: 1.0

Status: IN PROGRESS

---

# Required Files

Every Official source template shall contain:

```text
index.html

template.json

README.md

LICENSE

VERSION

CHANGELOG.md
```

---

# Required Preview Files

```text
previews/preview.webp

previews/thumbnail.webp
```

Recommended dimensions:

```text
Preview

1600 × 1000

Thumbnail

800 × 500
```

---

# Recommended Structure

```text
template-name/

├── index.html
├── template.json
├── README.md
├── LICENSE
├── VERSION
├── CHANGELOG.md
├── assets/
├── previews/
│   ├── preview.webp
│   └── thumbnail.webp
└── screenshots/
```

Additional files are allowed when required.

---

# Manifest

The manifest shall provide:

```text
schemaVersion

id

name

description

version

type

category

price

license

author.name
```

Official category:

```json
{
  "category": "official"
}
```

Builder Templates shall use:

```json
{
  "type": "builder",
  "price": "free"
}
```

---

# Template ID

The template ID shall be:

- Unique
- Lowercase
- Stable
- Suitable for filenames and URLs

Recommended form:

```text
official-template-name
```

Example:

```text
official-beginning
```

---

# Source Code

Official Templates shall:

- Use valid HTML
- Use semantic HTML where appropriate
- Remain usable without build tools
- Document external dependencies
- Prefer local assets
- Remain responsive when declared responsive

---

# JavaScript

JavaScript is optional unless prohibited by the declared profile.

A template declaring:

```text
zeroscript
```

shall not require or include JavaScript.

---

# Privacy

Official Templates should not include by default:

- Analytics
- Tracking
- Fingerprinting
- Advertising
- Hidden remote requests

Remote resources shall be documented.

---

# Accessibility

Official Templates should provide:

- Semantic structure
- Keyboard-accessible controls
- Visible focus states
- Sufficient text contrast
- Meaningful alternative text
- Responsive text and controls

---

# Responsive Support

A responsive Official Template should be tested on:

```text
Desktop

Tablet

Mobile
```

The manifest shall declare:

```json
{
  "responsive": true
}
```

only when responsive behavior is implemented.

---

# Preview Assets

Preview and thumbnail files shall represent the actual template.

They shall not:

- Misrepresent unavailable functionality
- Display unrelated designs
- Contain undocumented commercial branding
- Depend on remote loading

---

# README

The template README should include:

- Template name
- Description
- Version
- License
- Supported profiles
- File structure
- Deployment instructions
- Customization notes

---

# Version

The `VERSION` file shall contain only the current template version.

Example:

```text
0.1.0
```

The manifest version shall match the `VERSION` file.

---

# Change Log

`CHANGELOG.md` shall record user-visible template changes.

---

# License

The declared manifest license shall match the included `LICENSE` file.

---

# Builder Compatibility

An Official Builder Template shall:

- Reference a defined Builder Layout
- Use supported Builder Components
- Follow Builder export rules
- Remain free

A Custom Official Template is not required to be Builder-compatible.

---

# Validation

Before publication:

```text
template.json valid

required files present

referenced preview files present

manifest paths valid

template ID unique

version values consistent

local preview successful

gallery generation successful
```

---

# Gallery Publication

After validation:

```text
node scripts/generate-gallery.mjs
```

The generated gallery shall be reviewed before commit.

---

# Extensions

```text
Automated Accessibility Validation

Automated Performance Validation

Automated Preview Generation

Official Template Certification
```
