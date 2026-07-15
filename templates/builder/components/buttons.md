# Buttons

Version: 1.0

Status: IN PROGRESS

---

# Component

```text
Buttons
```

---

# State

```text
None

One

Two
```

Only one state may be active.

---

# Properties

## None

None

---

## One

```text
Label

URL

Style

Icon

Target
```

---

## Two

```text
Primary Label

Primary URL

Primary Style

Primary Icon

Primary Target

Secondary Label

Secondary URL

Secondary Style

Secondary Icon

Secondary Target
```

---

# Defaults

## State

```text
One
```

---

## Style

```text
Primary
```

---

## Target

```text
Same Window
```

---

# Validation

## Label

Required.

---

## URL

Required.

---

## Style

Allowed values:

```text
Primary

Secondary

Ghost
```

---

## Target

Allowed values:

```text
Same Window

New Window
```

---

# Dependencies

## None

Disable:

```text
All Button Properties
```

---

## One

Enable:

```text
Primary Button
```

Disable:

```text
Secondary Button
```

---

## Two

Enable:

```text
Primary Button

Secondary Button
```

---

# Output

Generates:

```html
<a>
```

Generates:

```css
Button Styles
```

---

# Extensions

```text
Button Groups

Icons

Download Button

Custom Styles
```
