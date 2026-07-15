# Template Gallery Specification

Version: 1.0

Status: IN PROGRESS

---

# Generation

```text
template.json
        ↓
generate-gallery.mjs
        ↓
gallery/index.html
```

The gallery is statically generated.

No database or server-side rendering is required.

---

# Source

The gallery reads valid template manifests found inside:

```text
templates/
```

The generator shall ignore:

```text
templates/gallery/

templates/implementation/
```

---

# Supported Template Types

```text
Builder

Custom
```

---

# Supported Categories

```text
Official

Community

Marketplace

Archive
```

---

# Gallery Card

A card may display:

- Thumbnail
- Category
- Type
- Price
- Deployment profiles
- Editor's Choice
- Template name
- Author
- Description
- Version
- License
- Responsive status

---

# Card Actions

Available actions may include:

```text
Details

Live Demo

Source

Purchase

Contact
```

An action shall be hidden when its URL is unavailable or invalid.

---

# Details Action

The Details action opens the template directory.

For a source template, the directory should contain:

```text
index.html
```

A Marketplace catalog entry may provide another detail page instead.

---

# Badges

Supported badges include:

```text
Official

Community

Marketplace

Archive

Builder

Custom

Free

Premium

Custom Work

Editor's Choice

Standard

Privacy

ZeroScript

UltraLite

Responsive
```

Only applicable badges shall be displayed.

---

# Editor's Choice

Editor's Choice is selected by ItsOnePage maintainers.

It is an editorial recommendation.

It is not:

- A competition
- A popularity ranking
- A download ranking
- A time-limited award

A template remains Editor's Choice until another template is selected.

Only one active Editor's Choice is recommended.

---

# Search

Search runs inside the browser.

Searchable fields include:

- Name
- Description
- Author
- Type
- Category
- Price
- Profiles
- Tags

Search shall not require a server request.

---

# Filters

Initial filters:

```text
All

Official

Community

Marketplace

Builder

Custom

Editor's Choice
```

Additional filters may include:

```text
Free

Premium

Privacy

ZeroScript

UltraLite
```

Filtering runs inside the browser.

---

# Result Count

The gallery shall display the number of visible templates.

Examples:

```text
1 template

4 templates
```

---

# Empty State

When no card matches the current search and filter:

```text
No templates match the current search and filter.
```

---

# Sorting

Default sorting:

```text
Editor's Choice first

Then alphabetical by template name
```

Future sorting modes may include:

```text
Alphabetical

Newest

Recently Updated
```

---

# Images

When a valid thumbnail exists, the card displays it.

When no valid thumbnail exists, the card displays a generated placeholder containing:

- Category
- Template name
- Author

---

# Marketplace

Marketplace source code is not required to be stored in the repository.

Marketplace cards may link to:

- Live demo
- Product page
- Purchase page
- Contact page
- Custom-work request

ItsOnePage does not manage:

- Payments
- Licensing agreements
- Delivery
- Refunds
- Support

---

# Editor's Choice Showcase

The active Editor's Choice may be deployed as the public showcase.

The showcase may contain the author's:

- Branding
- Portfolio
- Website
- GitHub profile
- LinkedIn profile
- Commercial information
- Contact information

The author retains ownership.

---

# Validation

The generator shall reject:

- Invalid JSON
- Missing required fields
- Unsupported type values
- Unsupported category values
- Unsupported price values
- Unsupported profile values
- Duplicate template IDs
- Local paths escaping the template directory

Builder Templates with a non-free price shall be rejected.

---

# Output

Generated file:

```text
templates/gallery/index.html
```

The generated file shall contain:

- Static HTML
- Static CSS
- Client-side search
- Client-side filters
- No external runtime dependency

---

# Extensions

```text
Sorting Controls

Template Collections

Profile Filters

Pagination
```
