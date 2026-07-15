# Background

Version: 1.0

Status: IN PROGRESS

---

# Component

```text
Background
```

---

# State

```text
None

Color

Gradient

Image
```

Only one state may be active.

---

# Properties

## None

None

---

## Color

```text
Color
```

---

## Gradient

```text
Type

Start Color

End Color

Angle
```

Supported Types:

```text
Linear

Radial
```

---

## Image

```text
Desktop Image

Tablet Image

Mobile Image

Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

# Defaults

## State

```text
None
```

---

## Position

```text
Center
```

---

## Horizontal Offset

```text
Unit

%

Value

0
```

---

## Vertical Offset

```text
Unit

%

Value

0
```

---

## Overlay

```text
20%
```

---

## Brightness

```text
100%
```

---

## Contrast

```text
100%
```

---

## Blur

```text
0 px
```

---

# Validation

## State

Exactly one state shall be selected.

---

## Image

Desktop Image is required.

Tablet Image is optional.

Mobile Image is optional.

---

## Position

Allowed values:

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

---

## Horizontal Offset

Units:

```text
%

px
```

Range:

```text
-100

↓

+100
```

---

## Vertical Offset

Units:

```text
%

px
```

Range:

```text
-100

↓

+100
```

---

## Overlay

```text
0%

↓

100%
```

---

## Brightness

```text
0%

↓

200%
```

---

## Contrast

```text
0%

↓

200%
```

---

## Blur

```text
0 px

↓

40 px
```

---

# Dependencies

## None

Disable:

```text
Color

Gradient

Image

Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

## Color

Enable:

```text
Color
```

Disable:

```text
Gradient

Image

Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

## Gradient

Enable:

```text
Type

Start Color

End Color

Angle
```

Disable:

```text
Image

Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

---

## Image

Enable:

```text
Desktop Image

Tablet Image

Mobile Image

Position

Horizontal Offset

Vertical Offset

Overlay

Brightness

Contrast

Blur
```

Disable:

```text
Gradient
```

---

# Output

## None

No background CSS.

---

## Color

```css
background-color
```

---

## Gradient

```css
background-image
```

---

## Image

```css
background-image

background-position

background-size

background-repeat

filter
```

Assets:

```text
background-desktop.*

background-tablet.*

background-mobile.*
```

---

# Extensions

```text
Pattern

SVG

Video

Parallax

Animation
```
