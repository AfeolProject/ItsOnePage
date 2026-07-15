# Panel

Version: 1.0

Status: IN PROGRESS

---

# Component

```text
Panel
```

---

# State

```text
None

Solid

Glass
```

Only one state may be active.

---

# Properties

## None

None

---

## Solid

```text
Background Color

Opacity

Border

Border Radius

Shadow

Padding

Width

Maximum Width

Alignment
```

---

## Glass

```text
Opacity

Blur

Border

Border Radius

Shadow

Padding

Width

Maximum Width

Alignment
```

---

# Defaults

## State

```text
Glass
```

---

## Width

```text
100%
```

---

## Maximum Width

```text
720 px
```

---

## Alignment

```text
Center
```

---

## Opacity

```text
65%
```

---

## Blur

```text
18 px
```

---

## Border Radius

```text
24 px
```

---

## Padding

```text
48 px
```

---

## Shadow

```text
Medium
```

---

# Validation

## Width

```text
20%

↓

100%
```

---

## Maximum Width

```text
320 px

↓

1600 px
```

---

## Opacity

```text
0%

↓

100%
```

---

## Blur

```text
0 px

↓

40 px
```

---

## Border Radius

```text
0 px

↓

80 px
```

---

## Padding

```text
0 px

↓

120 px
```

---

## Alignment

Allowed values:

```text
Left

Center

Right
```

---

# Dependencies

## None

Disable:

```text
Background Color

Opacity

Blur

Border

Border Radius

Shadow

Padding

Width

Maximum Width

Alignment
```

---

## Solid

Enable:

```text
Background Color

Opacity

Border

Border Radius

Shadow

Padding

Width

Maximum Width

Alignment
```

Disable:

```text
Blur
```

---

## Glass

Enable:

```text
Opacity

Blur

Border

Border Radius

Shadow

Padding

Width

Maximum Width

Alignment
```

Disable:

```text
Background Color
```

---

# Output

## None

No panel CSS.

---

## Solid

Generates:

```css
background-color

opacity

border

border-radius

box-shadow

padding

max-width
```

---

## Glass

Generates:

```css
backdrop-filter

background

opacity

border

border-radius

box-shadow

padding

max-width
```

---

# Extensions

```text
Gradient Panel

Image Panel

Split Panel

Floating Panel
```
