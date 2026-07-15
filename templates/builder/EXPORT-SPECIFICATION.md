# Export Specification

Version: 1.0

Status: IN PROGRESS

---

# Overview

The Export Engine converts Builder configuration into a complete static website.

---

# Supported Outputs

```text
OnePage

MultiPage
```

---

# OnePage

Typical output:

```text
index.html

assets/
```

CSS is embedded inside the HTML document.

---

# MultiPage

Typical output:

```text
index.html

additional HTML pages

styles.css

assets/
```

---

# Optional Output

The Builder may additionally export:

```text
project.json
```

Purpose:

Store Builder configuration for reopening the project.

Generated websites must never depend on this file.

---

# Independence

Generated websites must remain deployable without:

- Builder
- Builder runtime
- Builder account
- Cloud service

---

# Principle

```text
Configuration

↓

Validation

↓

Export

↓

Static Website
```
