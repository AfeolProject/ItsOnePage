# Typography

Version: 1.0

Status: IN PROGRESS

---

# Component

```text
Typography
```

---

# State

```text
Default

Custom
```

---

# Properties

```text
Heading

Subheading

Body

Caption

Font Family

Font Weight

Text Alignment

Line Height

Letter Spacing

Text Color

Accent Color
```

---

# Defaults

```text
Heading

48 px

Subheading

24 px

Body

18 px

Alignment

Center

Font

System

Weight

Normal
```

---

# Validation

Alignment:

```text
Left

Center

Right
```

Font Size:

```text
8 px

↓

120 px
```

---

# Dependencies

```text
IF State = Default

THEN

Use Builder defaults
```

```text
IF State = Custom

THEN

Enable all properties
```

---

# Output

Generates:

```css
font-family

font-size

font-weight

line-height

letter-spacing

color

text-align
```

---

# Extensions

```text
Theme Presets

Custom Fonts

Typography Scale
```
