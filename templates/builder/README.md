# Basic Builder

Status:

```text
IN PROGRESS
```

The Basic Builder is a browser-based generator for static Tor and I2P websites.

Supported deployment environments:

```text
Tor onion services

I2P eepsites
```

The Builder generates websites using:

- HTML
- CSS
- Local assets

It does not generate websites that require:

- JavaScript
- External fonts
- CDN resources
- Analytics
- Tracking
- Remote APIs

## Website Types

```text
OnePage

MultiPage
```

### OnePage

Output:

```text
index.html
assets/
```

CSS is embedded inside `index.html`.

### MultiPage

Typical output:

```text
index.html
additional-pages.html
styles.css
assets/
```

MultiPage users may choose embedded or separate CSS.

## Metadata

Document metadata is optional.

Default:

```text
No
```

The Builder does not generate public-web SEO files such as:

- robots.txt
- sitemap.xml
- Open Graph
- canonical public URLs

## Background Controls

Supported background anchors:

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

Fine adjustment supports percentage or pixel offsets.

## Primary Goal

Generate complete static files that users can publish directly on their own Tor or I2P services.

## Primary Principle

```text
No JavaScript.

No remote dependencies.

Local assets only.
```
