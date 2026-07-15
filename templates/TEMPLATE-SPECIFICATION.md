# Template Specification

## Purpose

Every ItsOnePage template is a completely self-contained website.

A template can be copied, customized and deployed without any
additional tooling.

No build process is required.

No framework is required.

No dependency manager is required.

---

# Required Files

Every template must contain:

```text
index.html
README.md
LICENSE
VERSION
CHANGELOG.md
template.json
preview.png
thumbnail.webp
```

---

# Directory Structure

```text
template/

├── index.html
├── README.md
├── LICENSE
├── VERSION
├── CHANGELOG.md
├── template.json
├── preview.png
├── thumbnail.webp
└── assets/
```

Additional files may be included.

---

# Template Metadata

Every template provides a single metadata file.

```text
template.json
```

This file is consumed by the gallery generator.

It is never edited by the generator.

---

# Example

```json
{
  "id": "official-beginning",
  "name": "The Beginning",
  "version": "0.1.0",

  "category": "official",

  "license": "MIT",

  "author": {
    "name": "AFEOL",
    "url": "https://afeol.com"
  },

  "repository": "https://github.com/AfeolOrg/ItsOnePage",

  "homepage": "https://showcase.itsonepage.pages.dev/",

  "preview": "preview.png",

  "thumbnail": "thumbnail.webp",

  "responsive": true,

  "price": "free",

  "editorsChoice": true
}
```

---

# Categories

Supported categories are:

```text
official
community
marketplace
archive
```

---

# Pricing

Supported values are:

```text
free
paid
```

---

# Images

Every template provides two images.

## Preview

Large image shown on the template page.

```text
preview.png
```

---

## Thumbnail

Small image used by the gallery.

```text
thumbnail.webp
```

---

# Assets

Assets may contain:

- images
- fonts
- icons
- videos
- downloads

The internal organization is left to the template author.

---

# Design Principle

Templates are independent.

The gallery consumes metadata.

Templates never depend on the gallery.

The gallery never modifies templates.
