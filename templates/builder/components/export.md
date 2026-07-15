# Export

Version: 1.0

Status: IN PROGRESS

---

# Component

```text
Export
```

---

# State

```text
Ready

Exporting

Completed

Failed
```

Only one state may be active.

---

# Properties

```text
Website Type

CSS Output

Project Configuration

Output Directory
```

---

# Defaults

```text
Project Configuration

Disabled
```

---

# Validation

Export is allowed only when Builder validation succeeds.

---

# Dependencies

```text
IF Validation = Failed

THEN

Disable Export
```

---

```text
IF Validation = Passed

THEN

Enable Export
```

---

# Output

OnePage

```text
index.html

assets/
```

---

MultiPage

```text
index.html

additional pages

styles.css

assets/
```

---

Optional

```text
project.json
```

---

# Extensions

```text
ZIP Archive

Checksums

Digital Signature

Deployment Package
```
