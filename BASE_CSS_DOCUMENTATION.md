# MTJ Foundation - base.css Documentation

## 📚 Complete Guide to Utility Classes & Use Cases

This document provides a comprehensive reference for all utility classes in `base.css`. Use this as your go-to guide when building components.

---

## 🎨 Section 0: CSS Variables (Design Tokens)

All design tokens are defined in `:root` and can be used directly in your CSS or via utility classes.

### Brand Colors
```css
--color-primary: #0A1A4F    /* MTJ navy - main brand color */
--color-secondary: #802b55  /* maroon/rose - secondary brand */
--color-accent: #D8B861     /* gold - accent highlights */
--color-info: #007ae6       /* informational messages */
--color-success: #2E7D32    /* success states */
--color-warning: #ffda79    /* warning states */
--color-danger: #C62828     /* error/danger states */
```

### Neutral Colors (Grayscale Scale)
```css
--color-black: #0b0b0b      /* Pure black */
--color-900: #1a1a1a        /* Darkest gray */
--color-800: #2a2a2a        /* Very dark gray */
--color-700: #3f3f3f        /* Dark gray */
--color-600: #575757        /* Medium-dark gray */
--color-500: #6f6f6f        /* Medium gray */
--color-400: #9a9a9a        /* Light-medium gray */
--color-300: #c9c9c9        /* Light gray */
--color-200: #e6e6e6        /* Very light gray */
--color-100: #f2f2f2        /* Lightest gray */
--color-white: #ffffff       /* Pure white */
```

**Use Cases:**
- `--color-900` to `--color-600`: Text colors, dark backgrounds
- `--color-500` to `--color-400`: Secondary text, borders
- `--color-300` to `--color-100`: Light backgrounds, dividers
- `--color-white`: Text on dark backgrounds, cards

### Typography Scale
```css
--fs-12: 0.75rem   /* 12px - captions, labels */
--fs-14: 0.875rem  /* 14px - small text */
--fs-16: 1rem      /* 16px - body text (base) */
--fs-18: 1.125rem  /* 18px - large body */
--fs-20: 1.25rem   /* 20px - small headings */
--fs-24: 1.5rem    /* 24px - h3 headings */
--fs-28: 1.75rem   /* 28px - h2 headings */
--fs-32: 2rem      /* 32px - h1 headings */
```

### Spacing Scale
Available spacing values: `0, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32, 36, 40, 44, 48, 52, 56, 64, 72, 80, 96, 100, 120, 150, 200`

**Use Cases:**
- `4-12px`: Tight spacing (icons, badges)
- `16-24px`: Standard spacing (cards, sections)
- `32-48px`: Large spacing (section breaks)
- `64-200px`: Hero spacing (landing pages)

### Border Radius
```css
--radius-sm: 6px   /* Small elements (buttons, inputs) */
--radius-md: 10px  /* Medium elements (cards) */
--radius-lg: 16px  /* Large elements (modals, containers) */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.06)      /* Subtle elevation */
--shadow-md: 0 6px 16px rgba(0,0,0,0.12)     /* Medium elevation */
--shadow-lg: 0 16px 40px rgba(0,0,0,0.18)   /* High elevation */
```

### Breakpoints
```css
--bp-xsm: 430px   /* Extra small devices */
--bp-sm: 576px    /* Small devices (phones) */
--bp-md: 768px    /* Medium devices (tablets) */
--bp-lg: 992px    /* Large devices (desktops) */
--bp-xl: 1200px   /* Extra large devices */
--bp-xxl: 1440px  /* Ultra wide screens */
```

---

## 🏗️ Section 1: Base / Reset

### Box Sizing Reset
```css
*, *::before, *::after { box-sizing: border-box; }
```
**Purpose:** Ensures padding and borders are included in element width calculations.

### Full Height Setup
```css
html, body, #root { height: 100%; }
```
**Use Case:** Allows full-height layouts, especially for React root element.

### Smooth Scrolling
```css
html { scroll-behavior: smooth; }
```
**Use Case:** Smooth anchor link navigation.

### Body Defaults
```css
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  color: var(--text);
  background-color: var(--color-black);
  font-size: var(--fs-16);
  line-height: 1.5;
}
```
**Purpose:** Sets global typography and removes default browser margins.

### Image/Video Reset
```css
img, video { max-width: 100%; height: auto; display: block; }
```
**Use Case:** Responsive images that don't overflow containers.

### Link Reset
```css
a { color: inherit; text-decoration: none; }
```
**Purpose:** Links inherit parent color and have no underline by default.

### List Reset
```css
ul, ol { margin: 0; padding: 0; list-style: none; }
```
**Purpose:** Removes default list styling for custom navigation menus.

---

## 📐 Section 2: Layout Helpers

### Container
```html
<div class="container">Content</div>
```
**Use Case:** Centered, responsive container with max-widths:
- Mobile: Full width with 16px padding
- 576px+: 540px max-width
- 768px+: 720px max-width
- 992px+: 960px max-width
- 1200px+: 1140px max-width
- 1440px+: 1320px max-width

**Example:**
```html
<div class="container">
  <h1>Page Title</h1>
  <p>Content stays centered and responsive</p>
</div>
```

### Grid System

#### Basic Grid Classes
```html
<div class="grid grid-3 gap-16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Available Grid Classes:**
- `.grid` - Base grid with 16px gap
- `.grid-2` - 2 equal columns
- `.grid-3` - 3 equal columns
- `.grid-4` - 4 equal columns
- `.grid-6` - 6 equal columns
- `.grid-12` - 12-column grid system
- `.grid-auto` - Auto-fit columns (min 220px each)

**Gap Utilities:**
- `.gap-8` - 8px gap
- `.gap-12` - 12px gap
- `.gap-16` - 16px gap
- `.gap-24` - 24px gap
- `.gap-32` - 32px gap
- `.gap-40` - 40px gap
- `.row-gap-24` - 24px row gap only
- `.col-gap-24` - 24px column gap only

**Use Cases:**
- `.grid-3`: Product cards, feature lists
- `.grid-4`: Image galleries, testimonials
- `.grid-12`: Complex layouts with custom column spans
- `.grid-auto`: Responsive card grids

#### Column Span Classes
```html
<div class="grid grid-12">
  <div class="col-4">Takes 4 columns</div>
  <div class="col-8">Takes 8 columns</div>
</div>
```

**Available:** `.col-1` through `.col-12`

**Example - 12-Column Layout:**
```html
<div class="grid grid-12 gap-16">
  <div class="col-12 md-8 lg-6">Main content</div>
  <div class="col-12 md-4 lg-3">Sidebar</div>
  <div class="col-12 md-4 lg-3">Widget</div>
</div>
```

### Flexbox Utilities

#### Display
```html
<div class="flex">Flex container</div>
<div class="inline-flex">Inline flex</div>
```

#### Direction
```html
<div class="flex flex-col">Vertical stack</div>
<div class="flex flex-row">Horizontal row</div>
<div class="flex flex-wrap">Wraps items</div>
```

#### Alignment
```html
<!-- Vertical alignment -->
<div class="flex items-start">Top aligned</div>
<div class="flex items-center">Center aligned</div>
<div class="flex items-end">Bottom aligned</div>

<!-- Horizontal alignment -->
<div class="flex justify-start">Left aligned</div>
<div class="flex justify-center">Centered</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-end">Right aligned</div>
```

**Common Patterns:**
```html
<!-- Centered content -->
<div class="flex items-center justify-center h-100">
  <p>Perfectly centered</p>
</div>

<!-- Space between items -->
<div class="flex justify-between items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Flexible item -->
<div class="flex">
  <div class="flex-1">Takes remaining space</div>
  <div class="shrink-0">Fixed width</div>
</div>
```

### Display Utilities
```html
<div class="d-none">Hidden</div>
<div class="d-block">Block display</div>
<div class="d-inline">Inline</div>
<div class="d-inline-block">Inline block</div>
<div class="d-grid">Grid display</div>
<div class="d-flex">Flex display</div>
```

**Note:** `.flex` and `.d-flex` are aliases - use whichever you prefer.

### Position Utilities
```html
<div class="relative">Relative positioning</div>
<div class="absolute">Absolute positioning</div>
<div class="fixed">Fixed to viewport</div>
<div class="sticky">Sticks when scrolling</div>
```

**Use Cases:**
- `.relative`: Container for absolutely positioned children
- `.absolute`: Overlays, tooltips, badges
- `.fixed`: Navigation bars, modals
- `.sticky`: Sticky headers, sidebars

### Sizing Utilities
```html
<div class="w-100">Full width</div>
<div class="h-100">Full height</div>
<div class="max-w-sm">Max 480px</div>
<div class="max-w-md">Max 720px</div>
<div class="max-w-lg">Max 960px</div>
```

**Use Cases:**
- `.w-100`: Full-width sections, containers
- `.h-100`: Full-height layouts, hero sections
- `.max-w-*`: Constraining content width for readability

### Overflow & Z-Index
```html
<div class="overflow-hidden">Clips overflow</div>
<div class="overflow-auto">Scrollable</div>
<div class="z-1">Low z-index</div>
<div class="z-10">Medium z-index</div>
<div class="z-100">High z-index</div>
```

**Use Cases:**
- `.overflow-hidden`: Image containers, rounded corners
- `.overflow-auto`: Scrollable containers
- `.z-*`: Layering elements (modals, dropdowns, tooltips)

---

## 📏 Section 3: Spacing Utilities

### Padding Utilities

#### All Sides
```html
<div class="p-0">No padding</div>
<div class="p-8">8px padding</div>
<div class="p-16">16px padding</div>
<div class="p-24">24px padding</div>
<div class="p-32">32px padding</div>
```

**Available:** `.p-0`, `.p-4`, `.p-8`, `.p-12`, `.p-16`, `.p-20`, `.p-24`, `.p-32`, `.p-40`, `.p-48`, `.p-64`

#### Horizontal (Left/Right)
```html
<div class="px-8">8px horizontal padding</div>
<div class="px-16">16px horizontal padding</div>
<div class="px-24">24px horizontal padding</div>
```

#### Vertical (Top/Bottom)
```html
<div class="py-8">8px vertical padding</div>
<div class="py-16">16px vertical padding</div>
<div class="py-24">24px vertical padding</div>
```

#### Individual Sides
```html
<div class="pt-16">Top padding</div>
<div class="pr-16">Right padding</div>
<div class="pb-16">Bottom padding</div>
<div class="pl-16">Left padding</div>
```

**Available sizes:** `4, 8, 12, 16, 20, 24, 32, 48`

#### Kebab-Case Aliases (Alternative Syntax)
```html
<div class="p-t-10">Top padding 10px</div>
<div class="p-b-10">Bottom padding 10px</div>
<div class="p-l-10">Left padding 10px</div>
<div class="p-r-10">Right padding 10px</div>
<div class="p-b-8">Bottom padding 8px</div>
<div class="p-b-16">Bottom padding 16px</div>
<div class="p-b-24">Bottom padding 24px</div>
<div class="p-b-32">Bottom padding 32px</div>
```

### Margin Utilities

#### All Sides
```html
<div class="m-0">No margin</div>
<div class="m-8">8px margin</div>
<div class="m-16">16px margin</div>
<div class="m-24">24px margin</div>
```

**Available:** `.m-0`, `.m-4`, `.m-8`, `.m-12`, `.m-16`, `.m-20`, `.m-24`, `.m-32`, `.m-40`, `.m-48`, `.m-64`

#### Auto Margin (Centering)
```html
<div class="mx-auto">Centered horizontally</div>
```

**Use Case:** Centering block elements.

#### Horizontal & Vertical
```html
<div class="mx-16">16px horizontal margin</div>
<div class="my-16">16px vertical margin</div>
```

#### Individual Sides
```html
<div class="mt-8">Top margin</div>
<div class="mr-8">Right margin</div>
<div class="mb-8">Bottom margin</div>
<div class="ml-8">Left margin</div>
```

**Available sizes:** `8, 16, 24, 32`

#### Kebab-Case Aliases
```html
<div class="m-b-8">Bottom margin 8px</div>
<div class="m-b-16">Bottom margin 16px</div>
<div class="m-b-24">Bottom margin 24px</div>
<div class="m-b-32">Bottom margin 32px</div>
```

**Common Patterns:**
```html
<!-- Section spacing -->
<section class="py-32">
  <div class="container">
    <h2 class="mb-24">Section Title</h2>
    <p class="mb-16">Content</p>
  </div>
</section>

<!-- Card spacing -->
<div class="card p-24">
  <h3 class="mb-16">Card Title</h3>
  <p class="mb-8">Description</p>
</div>
```

---

## ✍️ Section 4: Typography & Colors

### Heading Classes
```html
<h1 class="h1">Heading 1 (32px, bold)</h1>
<h2 class="h2">Heading 2 (28px, bold)</h2>
<h3 class="h3">Heading 3 (24px, semi-bold)</h3>
<h4 class="h4">Heading 4 (20px, semi-bold)</h4>
```

**Note:** These classes add bottom margin automatically.

### Text Size Utilities
```html
<p class="text-xs">Extra small (12px)</p>
<p class="text-sm">Small (14px)</p>
<p class="text-base">Base (16px)</p>
<p class="text-lg">Large (18px)</p>
<p class="text-xl">Extra large (20px)</p>
```

### Text Alignment
```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
```

### Font Weight
```html
<p class="bold">Bold (700)</p>
<p class="semi">Semi-bold (600)</p>
<p class="normal">Normal (400)</p>
```

### Text Colors
```html
<p class="text-primary">Primary color</p>
<p class="text-secondary">Secondary color</p>
<p class="text-accent">Accent color</p>
<p class="text-success">Success green</p>
<p class="text-warning">Warning yellow</p>
<p class="text-danger">Danger red</p>
<p class="text-white">White text</p>
<p class="muted">Muted gray</p>
```

**Use Cases:**
- `.text-primary`: Links, CTAs, brand elements
- `.text-success`: Success messages, checkmarks
- `.text-danger`: Error messages, warnings
- `.muted`: Secondary text, captions

### Background Colors
```html
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-muted">Muted gray background</div>
```

**Note:** `.bg-primary` and `.bg-secondary` automatically set white text.

### Borders & Radius
```html
<div class="border">Has border</div>
<div class="rounded-sm">Small radius</div>
<div class="rounded">Medium radius</div>
<div class="rounded-lg">Large radius</div>
```

### Shadows
```html
<div class="shadow-sm">Subtle shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
```

**Use Cases:**
- `.shadow-sm`: Cards, buttons
- `.shadow-md`: Modals, dropdowns
- `.shadow-lg`: Hero sections, large cards

---

## 🎯 Section 5: Buttons, Inputs, Cards

### Button Base Class
```html
<button class="btn">Default Button</button>
```

**Default Style:** Blue background (`--color-info`), white text, rounded, with hover effects.

### Button Variants
```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--outline">Outline</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn" disabled>Disabled</button>
```

**Use Cases:**
- `.btn--primary`: Main CTA buttons
- `.btn--secondary`: Secondary actions
- `.btn--outline`: Less prominent actions
- `.btn--ghost`: Subtle, minimal buttons

**Example:**
```html
<div class="flex gap-16">
  <button class="btn btn--primary">Submit</button>
  <button class="btn btn--outline">Cancel</button>
</div>
```

### Form Inputs
```html
<input type="text" class="input" placeholder="Text input">
<select class="select">
  <option>Option 1</option>
</select>
<textarea class="textarea" placeholder="Textarea"></textarea>
```

**Features:**
- Full width by default
- Consistent padding and border
- Focus state with primary color border
- Smooth transitions

**Example:**
```html
<div class="mb-16">
  <label class="text-sm mb-8 d-block">Email</label>
  <input type="email" class="input" placeholder="your@email.com">
</div>
```

### Card Component
```html
<div class="card">
  <h3 class="h3 mb-16">Card Title</h3>
  <p>Card content goes here</p>
</div>
```

**Features:**
- White background
- Border and shadow
- 16px padding
- Rounded corners

**Example:**
```html
<div class="grid grid-3 gap-24">
  <div class="card">
    <h3 class="h3 mb-16">Feature 1</h3>
    <p class="muted">Description</p>
  </div>
  <div class="card">
    <h3 class="h3 mb-16">Feature 2</h3>
    <p class="muted">Description</p>
  </div>
  <div class="card">
    <h3 class="h3 mb-16">Feature 3</h3>
    <p class="muted">Description</p>
  </div>
</div>
```

---

## 📱 Section 6: Responsive Helpers

### Responsive Display
```html
<div class="d-none sm:d-block">Hidden on mobile, visible on small+</div>
<div class="d-block md:d-none">Visible on mobile, hidden on medium+</div>
<div class="d-none lg:d-flex">Hidden until large screens</div>
```

**Available:** `.sm:d-none`, `.sm:d-block`, `.sm:d-flex`, `.sm:grid`
                  `.md:d-none`, `.md:d-block`, `.md:d-flex`, `.md:grid`
                  `.lg:d-none`, `.lg:d-block`, `.lg:d-flex`, `.lg:grid`

### Responsive Padding
```html
<div class="p-16 sm:p-16 md:p-24 lg:p-32">
  Responsive padding
</div>
<div class="px-16 sm:px-24">
  Responsive horizontal padding
</div>
```

### Responsive Grid Columns
```html
<div class="grid grid-12">
  <div class="col-12 sm-6 md-4 lg-3">
    Full width on mobile, 3 columns on large
  </div>
  <div class="col-12 sm-6 md-4 lg-3">Item 2</div>
  <div class="col-12 sm-6 md-4 lg-3">Item 3</div>
  <div class="col-12 sm-6 md-4 lg-3">Item 4</div>
</div>
```

**Breakpoint Prefixes:**
- `.sm-*`: 576px and up
- `.md-*`: 768px and up
- `.lg-*`: 992px and up
- `.xl-*`: 1200px and up
- `.xxl-*`: 1440px and up

**Common Patterns:**
```html
<!-- Mobile-first: 1 column → 2 columns → 3 columns -->
<div class="grid grid-12 gap-16">
  <div class="col-12 sm-6 lg-4">Card 1</div>
  <div class="col-12 sm-6 lg-4">Card 2</div>
  <div class="col-12 sm-6 lg-4">Card 3</div>
</div>

<!-- Responsive sidebar -->
<div class="grid grid-12 gap-24">
  <main class="col-12 lg-8">Main content</main>
  <aside class="col-12 lg-4">Sidebar</aside>
</div>
```

### Responsive Gaps
```html
<div class="grid grid-3 gap-16 md:gap-24 lg:gap-32">
  Responsive gap spacing
</div>
```

---

## 🛠️ Section 7: Helpers & Effects

### Cursor Utilities
```html
<div class="clickable">Pointer cursor</div>
<div class="pointer">Pointer cursor (alias)</div>
```

### Centering
```html
<div class="center">
  Perfectly centered content
</div>
```

**Use Case:** Centering content both horizontally and vertically.

### Visually Hidden (Accessibility)
```html
<h1 class="hidden-visually">Screen reader only</h1>
```

**Use Case:** Hide content visually but keep it accessible to screen readers.

### Horizontal Rule
```html
<hr class="hr">
```

**Use Case:** Section dividers.

### Link with Hover Underline
```html
<a href="#" class="link">Hover to see underline</a>
```

**Features:**
- Primary color
- Animated underline on hover
- Smooth transition

---

## 🎨 Section 8: Daily Utilities

### Text Utilities
```html
<p class="nowrap">No line breaks</p>
<p class="wrap">Normal wrapping</p>
<p class="upper">UPPERCASE TEXT</p>
<p class="ellipsis">Long text that truncates...</p>
```

**Use Cases:**
- `.nowrap`: Buttons, labels, badges
- `.upper`: Headings, labels, navigation
- `.ellipsis`: Truncated text in cards, tables

### User Interaction
```html
<div class="no-select">Cannot select text</div>
```

**Use Case:** Icons, logos, decorative elements.

### Visual Effects
```html
<div class="opacity-50">50% opacity</div>
<div class="rotate-90">Rotated 90 degrees</div>
```

---

## 🎯 Common Patterns & Examples

### Hero Section
```html
<section class="py-64">
  <div class="container">
    <h1 class="h1 text-center mb-24">Welcome</h1>
    <p class="text-lg text-center muted mb-32 max-w-md mx-auto">
      Hero description text
    </p>
    <div class="flex justify-center">
      <button class="btn btn--primary">Get Started</button>
    </div>
  </div>
</section>
```

### Card Grid
```html
<div class="container py-48">
  <div class="grid grid-12 gap-24">
    <div class="col-12 sm-6 lg-4">
      <div class="card">
        <h3 class="h3 mb-16">Card Title</h3>
        <p class="muted mb-24">Description</p>
        <button class="btn btn--outline">Learn More</button>
      </div>
    </div>
    <!-- Repeat for more cards -->
  </div>
</div>
```

### Navigation Bar
```html
<nav class="flex justify-between items-center py-16">
  <div class="flex items-center gap-24">
    <a href="#" class="text-primary bold">Logo</a>
    <a href="#" class="link">Home</a>
    <a href="#" class="link">About</a>
  </div>
  <button class="btn btn--primary">Contact</button>
</nav>
```

### Form Layout
```html
<form class="max-w-md mx-auto">
  <div class="mb-24">
    <label class="text-sm mb-8 d-block bold">Name</label>
    <input type="text" class="input" placeholder="Your name">
  </div>
  <div class="mb-24">
    <label class="text-sm mb-8 d-block bold">Email</label>
    <input type="email" class="input" placeholder="your@email.com">
  </div>
  <div class="flex gap-16">
    <button type="submit" class="btn btn--primary flex-1">Submit</button>
    <button type="button" class="btn btn--outline">Cancel</button>
  </div>
</form>
```

### Responsive Sidebar Layout
```html
<div class="container py-32">
  <div class="grid grid-12 gap-24">
    <main class="col-12 lg-8">
      <h1 class="h1 mb-24">Main Content</h1>
      <p>Content goes here...</p>
    </main>
    <aside class="col-12 lg-4">
      <div class="card">
        <h3 class="h3 mb-16">Sidebar</h3>
        <p class="muted">Sidebar content</p>
      </div>
    </aside>
  </div>
</div>
```

### Modal/Dialog Pattern
```html
<div class="fixed w-100 h-100 center" style="background: rgba(0,0,0,0.5)">
  <div class="card max-w-md" style="max-width: 500px;">
    <h2 class="h2 mb-16">Modal Title</h2>
    <p class="mb-24">Modal content</p>
    <div class="flex justify-end gap-16">
      <button class="btn btn--outline">Cancel</button>
      <button class="btn btn--primary">Confirm</button>
    </div>
  </div>
</div>
```

---

## 💡 Best Practices

1. **Mobile-First Approach:** Start with mobile styles, then add responsive classes
2. **Combine Utilities:** Stack multiple classes for complex layouts
3. **Use Semantic HTML:** Combine utility classes with proper HTML elements
4. **Consistent Spacing:** Stick to the spacing scale (4, 8, 16, 24, 32, etc.)
5. **Color System:** Use semantic color classes (primary, success, danger) for consistency
6. **Responsive Design:** Always test on multiple screen sizes

---

## 🔍 Quick Reference

### Most Used Classes
- Layout: `.container`, `.flex`, `.grid`, `.grid-3`, `.gap-16`
- Spacing: `.p-16`, `.p-24`, `.mb-16`, `.mb-24`, `.mx-auto`
- Typography: `.h1`, `.h2`, `.h3`, `.text-center`, `.bold`
- Colors: `.text-primary`, `.bg-primary`, `.muted`
- Responsive: `.col-12`, `.sm-6`, `.md-4`, `.lg-3`
- Components: `.btn`, `.btn--primary`, `.card`, `.input`

### Spacing Cheat Sheet
- Tight: `4px`, `8px`, `12px`
- Standard: `16px`, `20px`, `24px`
- Large: `32px`, `40px`, `48px`
- Hero: `64px`, `80px`, `96px`

### Breakpoint Cheat Sheet
- Mobile: `< 576px` (default)
- Small: `≥ 576px` (`.sm-*`)
- Medium: `≥ 768px` (`.md-*`)
- Large: `≥ 992px` (`.lg-*`)
- XL: `≥ 1200px` (`.xl-*`)
- XXL: `≥ 1440px` (`.xxl-*`)

---

## 📝 Notes

- All utility classes use CSS custom properties for easy theming
- Colors can be customized by changing `:root` variables
- Spacing values are consistent across padding, margin, and gap utilities
- Responsive classes follow mobile-first methodology
- Button and input styles are designed for accessibility

---

**Last Updated:** Based on base.css v1.0
**For Questions:** Refer to this documentation or check the source CSS file

