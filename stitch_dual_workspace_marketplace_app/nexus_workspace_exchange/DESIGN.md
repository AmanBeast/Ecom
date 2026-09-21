---
name: Nexus Workspace & Exchange
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#464555'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#3a2cc1'
  on-tertiary: '#ffffff'
  tertiary-container: '#534ada'
  on-tertiary-container: '#dbd8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e3dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#100069'
  on-tertiary-fixed-variant: '#372abf'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system pairs the professional reliability of a workspace concierge with the fluidity and trust of a curated hardware exchange. Designed with a mobile-first paradigm, the aesthetic blends Scandinavian minimalism with modern digital craft.

The brand targets remote professionals, digital nomads, tech enthusiasts, and independent creators who demand frictionless utility without visual clutter. The interface conveys calm confidence, rigorous order, and tactile clarity. High-density information (specs, availability schedules, equipment condition tiers) is balanced by generous negative space, purposeful contrast ratios, and warm ambient canvas tones. The visual language rejects ornamental noise in favor of functional elegance, structural alignment, and responsive micro-feedback.

## Colors
The palette balances an authoritative deep indigo core against a neutral, warm-tinted base to eliminate clinical starkness while preserving high contrast.

- **Primary (`#4F46E5` / `#4338CA`)**: Anchor for high-priority user actions, verified member badges, active date selections, and primary interactive states. Hover and active states press into deeper indigo (`#4338CA` and `#3730A3`).
- **Secondary (`#10B981`)**: Dedicated strictly to value confirmation: successful bookings, certified hardware grading tags, verified buyer/seller ratings, and real-time desk availability indicators.
- **Tertiary (`#6366F1`)**: Reserved for focus rings, subtle active iconography, and secondary chart/analytic accents.
- **Neutral & Canvas Layers**:
  - Root Canvas: `#FAFAFA`
  - Elevated Surfaces & Cards: `#FFFFFF`
  - Subtle Structural Borders: `#E4E4E7`
  - Secondary Inactive Borders: `#F4F4F5`
  - Primary Typography: `#18181B` (Deep Charcoal)
  - Secondary / Muted Typography: `#71717A`
  - Disabled / Placeholder: `#A1A1AA`

## Typography
Typographic rhythm relies on the interplay between `Geist` for crisp structural headings and `Inter` for hyper-legible UI labels and body text. 

- **Geist (Headings & Display)**: Chosen for its neutral grotesque precision, tightened tracking, and contemporary technical feel. All titles use negative letter-spacing to maintain compact hierarchy across dense mobile viewports.
- **Inter (Body, Controls, Data)**: Deployed across listings, descriptions, desk specifications, and transactions. High x-height ensures immediate readability when scanning equipment hardware condition tags or time slots under varying lighting conditions.

## Layout & Spacing
The layout follows a fluid-responsive model strictly anchored to an 8pt spatial grid (with 4pt micro-steps for compact UI controls).

- **Mobile Viewport (< 640px)**: 4-column layout, `1rem` outer canvas padding, and `0.75rem` card gutters. Interactive controls adhere to a 48px minimum vertical touch target.
- **Tablet / Split View (640px - 1024px)**: 8-column layout, `1.25rem` outer margins. Dual-pane view surfaces listings alongside map or device diagnostic overviews.
- **Desktop (≥ 1024px)**: 12-column layout bounded by a maximum container width of `1280px`, centered with fluid margins and a `1.5rem` gutter. 

Element positioning enforces clear functional grouping: input label-to-control distance uses `space-xs` (4px), control-to-control stacks use `space-md` (16px), and distinct contextual blocks rely on `space-xl` (40px) to establish breathable reading zones.

## Elevation & Depth
Depth is created through low-contrast surface boundaries paired with subtle ambient diffusion rather than heavy directional drop shadows.

- **Level 0 (Canvas Base)**: `#FAFAFA`, non-elevated ground layer.
- **Level 1 (Card & Module Resting)**: Pure white `#FFFFFF` surface enclosed by a `1px` solid border (`#E4E4E7`). Shadow is barely perceptible: `0 1px 3px rgba(24, 24, 27, 0.03), 0 1px 2px rgba(24, 24, 27, 0.02)`.
- **Level 2 (Active Cards, Popovers & Hover States)**: `1px` solid border (`#D4D4D8`) with ambient shadow: `0 8px 24px -4px rgba(24, 24, 27, 0.06), 0 4px 8px -2px rgba(24, 24, 27, 0.03)`.
- **Level 3 (Modals, Action Sheets & Floating Navbars)**: Pure white `#FFFFFF` surface with `0 20px 32px -8px rgba(24, 24, 27, 0.08), 0 8px 16px -4px rgba(24, 24, 27, 0.04)`. Sticky mobile navigations utilize a backdrop blur filter (`backdrop-blur-md` with `rgba(255, 255, 255, 0.88)` fill).

## Shapes
The design embraces generous, friendly radii that visually soften technological and architectural data. 

- **Containers & Master Cards (`rounded-2xl` / 1rem to `rounded-3xl` / 1.5rem)**: Used for listing cards, booking modules, image carousels, and bottom sheets.
- **Interactive Controls (`rounded-xl` / 0.75rem)**: Applied to buttons, search fields, text inputs, and segmented controls for clean geometric ergonomics.
- **Micro-Indicators & Tags (`rounded-full`)**: Used for verification badges, battery health pills, pricing tags, and user avatars.

## Components

### Buttons
- **Primary**: Solid deep indigo background (`#4F46E5`), pure white text, 12px vertical padding, 20px horizontal padding, `rounded-xl`. Active state triggers `#4338CA`. Subtle scale transition `scale(0.98)` on tap.
- **Secondary**: Crisp white background (`#FFFFFF`), 1px border (`#E4E4E7`), text color `#18181B`. Active background drops to `#F4F4F5`.
- **Ghost / Tertiary**: No background or border. Indigo or charcoal text with active background highlight (`#F4F4F5`).

### Cards (Listings & Workspace Desks)
Constructed on `#FFFFFF` with `rounded-2xl`, bound by a 1px `#E4E4E7` border. Media assets feature an internal top radius matching the outer curve, with a 16:9 ratio for desk venues and 1:1 ratio for hardware. The footer area separates pricing and quick-action actions using a subtle top divider or spacious auto-layout padding.

### Chips & Badges
- **Status / Availability**: `rounded-full` pill structure. Green accent variant uses `#ECFDF5` fill with `#065F46` label and `#10B981` status dot.
- **Filter Chips**: Multi-select pills utilizing `#FFFFFF` fill and `#E4E4E7` border. When active, transition to `#4F46E5` fill with white text and no border.

### Input Fields & Search Bars
- **Surface**: `#FFFFFF` background, 1px `#E4E4E7` stroke, `rounded-xl`, 12px vertical padding, 16px horizontal padding.
- **Focus**: Transitions border to `#4F46E5` with a `0 0 0 3px rgba(79, 70, 229, 0.12)` halo ring. 
- **Icons**: Inline leading and trailing icons rendered in `#71717A` at 20px.

### Checkboxes, Radios & Toggles
- **Checkbox/Radio**: 20px dimension, `rounded-md` (checkbox) or `rounded-full` (radio). Inactive border 1.5px `#D4D4D8`. Active state shifts to solid `#4F46E5` with white checkmark/dot.
- **Switch**: 44px by 24px pill track. Inactive track `#E4E4E7`; active track `#4F46E5`. Pure white thumb with `Level 1` ambient drop shadow.

### Domain-Specific Components
- **Hardware Condition Meter**: Visual 4-tier segmented bar indicating used device state (Fair, Good, Excellent, Pristine) utilizing muted gray for inactive and `#10B981` or `#4F46E5` for current rating.
- **Booking Time Matrix**: Grid-based horizontal scroll cards for desk intervals with immediate visual feedback: unavailable slots grayed out with strike-through time, selected slot highlighted in primary indigo.
- **Seller / Host Verification Tile**: Compact horizontal card containing a 40px rounded avatar, verification badge, aggregate star rating in `#10B981`, and response time label.