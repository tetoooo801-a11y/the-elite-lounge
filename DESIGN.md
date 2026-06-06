---
name: Nocturne Elite
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#a7a5a5'
  on-tertiary-container: '#3c3b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 92px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '400'
    lineHeight: 68px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.2em
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
spacing:
  section-padding-desktop: 120px
  section-padding-mobile: 64px
  gutter: 32px
  margin-safe: 48px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 32px
  unit-xl: 64px
---

## Brand & Style
The design system is rooted in **Luxury Minimalism** and **Cinematic Noir**. It targets an ultra-high-net-worth audience, evoking an emotional response of exclusivity, mystery, and ritualistic elegance.

The aesthetic draws heavily from editorial fashion layouts—prioritizing negative space over information density. The interface should feel like a high-end physical boutique or a private members' club: quiet, dark, and meticulously curated. Visual interest is generated through high-contrast typography and the interplay of matte surfaces with brushed metallic accents.

## Colors
The palette is dominated by **Deepest Black (#050505)** to create an infinite, void-like canvas. 

- **Primary (Brushed Gold):** Used sparingly for interactive focal points, thin borders, and active states. It represents the "ritual" and "exclusivity."
- **Secondary (Soft Bone):** Reserved for primary typography and essential iconography to ensure high legibility against the dark background.
- **Surface (Matte Charcoal):** Used for subtle layering and container separation.
- **Accents:** Occasional use of low-opacity gold for hover states and glassmorphic reflections.

## Typography
This design system employs an aggressive editorial type scale. **Playfair Display** serves as the centerpiece, utilized for oversized headlines to convey a sense of heritage and sophistication. 

**Montserrat** is used for body copy and labels, specifically in lighter weights (300/400) to maintain a modern, clean contrast against the serif headlines. Utility text and small labels must always be uppercase with increased letter spacing to emulate the branding of luxury fashion houses.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy with extreme internal margins. On desktop, content is typically constrained to a 12-column grid with a maximum width of 1440px, but centered within a vast field of Deepest Black.

- **Vertical Rhythm:** Section spacing is intentionally oversized (120px+) to force the user to slow down and appreciate individual elements.
- **Breakpoints:**
    - Mobile (<768px): 4 columns, 20px margins.
    - Tablet (768px - 1024px): 8 columns, 32px margins.
    - Desktop (>1024px): 12 columns, 48px margins.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional drop shadows.

1.  **Base:** Deepest Black (#050505) background.
2.  **Elevated Layers:** Matte Charcoal (#121212) with a 1px "Brushed Gold" border at 15% opacity.
3.  **Overlays:** High-end glass effect using a background blur (20px - 40px) and a subtle linear gradient border (top-left to bottom-right) to simulate a light catch on a glass edge.
4.  **Shadows:** When necessary, use only ultra-diffused, large-radius black shadows (0px 40px 80px rgba(0,0,0,0.8)) to create a sense of floating objects.

## Shapes
The shape language is strictly **Sharp (0px)**. Rounded corners are avoided to maintain a rigorous, architectural, and masculine feel. All containers, buttons, and input fields should utilize crisp 90-degree angles. Rare exceptions are made for profile avatars or specific decorative elements which may be circular, but never slightly rounded.

## Components
- **Buttons:** Rectangular with no radius. Primary buttons feature a "Brushed Gold" border (1px) and "Soft Bone" text in `label-caps`. Hover states should trigger a subtle gold inner-glow or a full gold fill with black text.
- **Input Fields:** Bottom-border only (1px Brushed Gold at 30% opacity). Label moves to `label-caps` above the field on focus.
- **Cards:** Use the Matte Charcoal surface with the glassmorphic overlay for featured items. No visible borders except for a 1px highlight on the top edge.
- **Navigation:** Minimalist top-bar, potentially hidden or appearing on scroll-up. Links are `label-caps` with a thin gold underline appearing on hover.
- **Motion:** All interactions must be "weighted." Use long duration (500ms+) with custom cubic-bezier easing (e.g., `0.16, 1, 0.3, 1`) to simulate the feel of heavy, expensive materials moving.