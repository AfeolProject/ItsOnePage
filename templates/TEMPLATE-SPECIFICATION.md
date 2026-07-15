# Template Specification

Version: 1.0

Status: IN PROGRESS

---

# Template Types

```text
Builder

Custom
```

## Builder

Generated through the Basic Builder.

Rules:

- Uses a predefined Builder Layout
- Uses supported Builder Components
- Produces static website files
- Is always free
- Requires no Builder runtime after export

## Custom

Designed and implemented independently.

The author controls:

- HTML
- CSS
- JavaScript
- Assets
- Responsive behavior
- Accessibility
- License
- Price
- Distribution

A Custom Template may be:

```text
Free

Premium

Custom Work
```

---

# Categories

```text
Official

Community

Marketplace

Archive
```

## Official

Maintained or approved by the ItsOnePage project.

## Community

Published by an independent contributor and distributed free of charge.

## Marketplace

Published as a premium template, commercial product or custom-work offer.

## Archive

Deprecated or unsupported template preserved for reference.

---

# Required Source Files

A published source template shall contain:

```text
index.html

template.json

README.md

LICENSE

VERSION

CHANGELOG.md
```

Additional files are allowed.

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
├── styles.css
├── assets/
├── previews/
│   ├── preview.webp
│   └── thumbnail.webp
└── screenshots/
    ├── desktop.webp
    ├── tablet.webp
    └── mobile.webp
```

Files not required by the template may be omitted.

---

# Marketplace Catalog Entry

A premium Marketplace entry is not required to include source code.

Recommended structure:

```text
template-name/

├── template.json
├── README.md
├── LICENSE
├── VERSION
├── CHANGELOG.md
├── previews/
│   ├── preview.webp
│   └── thumbnail.webp
└── screenshots/
```

The entry may link to:

- Live demo
- Product page
- Purchase page
- Author website
- Contact page
- Custom-work request

---

# Template Manifest

Every published template or catalog entry shall contain:

```text
template.json
```

Example:

```json
{
  "schemaVersion": 1,
  "id": "official-beginning",
  "name": "The Beginning",
  "description": "A lightweight, responsive and privacy-friendly starting point for a one-page website.",
  "version": "0.1.0",
  "type": "builder",
  "category": "official",
  "price": "free",
  "license": "MIT",
  "profiles": [
    "standard",
    "privacy",
    "zeroscript"
  ],
  "author": {
    "name": "AFEOL",
    "github": "https://github.com/AfeolOrg",
    "website": "https://afeol.com/"
  },
  "repository": "https://github.com/AfeolOrg/ItsOnePage",
  "liveDemo": "https://beta-transparent.itsonepage.pages.dev/",
  "preview": "previews/preview.webp",
  "thumbnail": "previews/thumbnail.webp",
  "responsive": true,
  "editorsChoice": true
}
```

---

# Required Manifest Fields

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

---

# Optional Manifest Fields

```text
profiles

tags

author.github

author.website

repository

liveDemo

purchaseUrl

contactUrl

preview

thumbnail

responsive

editorsChoice
```

---

# Allowed Type Values

```text
builder

custom
```

---

# Allowed Category Values

```text
official

community

marketplace

archive
```

---

# Allowed Price Values

```text
free

premium

custom-work
```

Builder Templates shall use:

```text
free
```

---

# Deployment Profiles

Supported manifest values:

```text
standard

privacy

zeroscript

ultralite
```

## Standard

General static-web output.

## Privacy

No tracking by default and minimal remote dependencies.

## ZeroScript

The generated website requires no JavaScript.

## UltraLite

Minimal output size and resource usage.

A template may support multiple profiles.

---

# Preview Assets

Recommended files:

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

Preview assets are gallery resources.

They are not required runtime assets.

---

# Responsive Output

A responsive template should support:

```text
Desktop

Tablet

Mobile
```

Responsive support shall be declared through:

```json
{
  "responsive": true
}
```

---

# Local Assets

Templates should prefer local assets.

External dependencies shall be documented.

ZeroScript and privacy-oriented output should not depend on:

- Remote fonts
- CDN assets
- Analytics
- Tracking
- Remote APIs

---

# Builder Templates

Builder Templates shall:

- Be generated from a defined Builder Layout
- Use supported Builder Components
- Follow Builder export rules
- Remain free
- Remain independent after export

---

# Custom Templates

Custom Templates may use independent implementation choices.

Authors remain responsible for:

- Code quality
- Accessibility
- Security
- External dependencies
- Licensing
- Pricing
- Delivery
- Support

---

# Validation

A template is valid when:

- Required files exist
- `template.json` is valid JSON
- Required manifest fields exist
- Manifest values are supported
- Template ID is unique
- Referenced local files exist
- Referenced local paths remain inside the template directory

---

# Output

A Template represents either:

```text
A complete static website
```

or:

```text
A Marketplace catalog entry
```

---

# Extensions

```text
Localized Variants

Theme Variants

Template Collections

Additional Deployment Profiles
```
