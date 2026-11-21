# ZYRICON Design System v1.0
A Figma-ready specification and token starter for a premium dark AI chat product.

## 1. Product principles
- Calm intelligence: dark, spacious, focused, never visually noisy.
- Glass is a material, not a gimmick: reserve strong blur for the composer, modal, and floating controls.
- Cyan/teal is functional: use accent color for primary actions, focus, progress, and AI activity.
- No purple, pink, magenta, or violet.
- Accessibility: maintain readable contrast, visible keyboard focus, and 44px minimum touch targets.

## 2. Foundations

### Color themes
Base dark surfaces remain stable; themes change the accent:
- Oceanic (default): #18C8E8
- Midnight Blue: #347FE8
- Emerald: #13BFA5
- Arctic: #83E8F7
- Monochrome: #B6C5D5
- Solar: #E8AA45

Semantic colors should be used in components rather than raw hex values. Status colors: success #32C48D, warning #E8AA45, danger #F16F75, info #347FE8.

### Typography
- Display/headings: Sora, weights 500–700.
- UI/body: Inter, weights 400–600.
- Code/technical: JetBrains Mono, weights 400–600.
- H1 48/58, H2 36/45, H3 30/38, H4 24/32, body-large 18/28, body 16/25, body-small 14/22, label 12/16, micro 10/14.
- Prefer sentence case. Avoid all-caps except tiny metadata labels.

### Spacing and grid
4px base scale. Core spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
Desktop: 12 columns, 24px gutters, 32px outer margins; content max width 1120px.
Tablet: 8 columns, 20px gutters, 24px outer margins.
Mobile: 4 columns, 16px gutters, 16px outer margins.
Sidebar 264px desktop; collapses to icon rail at tablet; becomes drawer on mobile.

### Radius
4, 8, 12, 16, 20, 24, 32px and pill 999px.
Use 12px for controls, 16px for cards, 24px for large composer and dialogs.

### Glass and elevation
- Glass subtle: 12px blur, 50–60% dark surface opacity.
- Glass standard: 24px blur, 60–72% opacity.
- Glass hero: 36px blur, 70–80% opacity.
- Ambient background: 64px blur.
- Always add a subtle 1px light border and inset top highlight; keep text on a sufficiently opaque surface.
- Elevation levels: 0 flat; 1 0 4px 16px; 2 0 12px 32px; 3 0 24px 64px. Accent glow is reserved for focused/AI-active states.

## 3. Layout
Desktop app frame: 1440×900 reference.
- Sidebar: 264px wide; 24px internal horizontal padding.
- Top bar: 72px high.
- Main content: max 1120px, centered in remaining space.
- Welcome composition: orb 144–176px diameter; 24–32px gap to heading; composer width 760–900px and min-height 184px.
- Main chat transcript: max width 800px; user messages align right; assistant responses align left.
Tablet 768–1024: 80px icon rail, content gutters 24px.
Mobile ≤640: drawer navigation, 16px gutters, composer min-height 148px, full-width actions.

## 4. Components and variants

### Buttons
Variants: Primary, Secondary, Tertiary/Ghost, Destructive.
Sizes: Small 36px, Medium 44px, Large 52px; icon-only 36/44/52 square.
States: Default, Hover, Pressed, Focus-visible, Disabled, Loading.
Primary uses accent fill with dark text. Secondary uses translucent fill and subtle border. Ghost has no fill until hover. Destructive uses status-danger.
Do not communicate state by color alone; include icon/text where needed.

### Icon button
Sizes 36/40/44; variants Ghost, Glass, Outline. Always provide tooltip and accessible label. Focus ring 2px accent with 3px offset.

### Text field
Sizes 40/44/48px. States Default, Hover, Focus, Filled, Error, Disabled. Label above; helper/error below. Placeholder uses muted text. Do not use placeholder as the only label.

### Chat composer
Variants: Welcome/Hero, Conversation/Compact, Voice/Recording, Disabled.
Hero: min-height 184px; max width 900px; padding 20px; 24px radius.
Compact: min-height 112px; max width 800px; padding 16px; 20px radius.
Anatomy: prompt area, attachment/tool row, model selector (optional), voice action, send button.
States: Empty, Focused, Has content, Uploading, Sending, Disabled, Voice active.
Send button is disabled when empty unless voice mode is active. Keep controls grouped and predictable.

### Suggestion chip
Variants: Neutral, Accent, Selected, Disabled. Height 32px; horizontal padding 12px; pill radius. Use short verb-led labels.

### Navigation
Sidebar item sizes 40/44px. States Default, Hover, Active, Focus, Disabled. Active uses a low-opacity accent surface and a 2px accent marker. Group items by primary navigation, workspaces, and recent history.

### Cards
Variants: Standard glass, Elevated, Interactive, AI insight. Padding 16/20/24px. Interactive cards get hover border and subtle lift (max 2px).

### Chat messages
User bubble: accent-tinted surface, max width 78%, 16px radius.
Assistant response: transparent or low-opacity surface, full reading width, no unnecessary enclosing card.
Code block: JetBrains Mono, dark inset surface, copy action, horizontal scroll on narrow screens.

### Select / dropdown
Heights 40/44px. Menu surface uses standard glass with 12–16px radius. Include selected, hover, disabled, and keyboard-highlight states.

### Toggle / checkbox / radio
Minimum 20px control size; hit area 40px. Provide focus-visible and disabled states. Toggle track uses neutral surface off and accent on.

### Tabs / segmented control
Height 40px; selected segment uses raised glass surface and strong text. Keyboard arrow navigation.

### Tooltip / popover / modal
Tooltip delay 400ms; compact dark surface, 8px radius. Popover 12px radius and standard glass. Modal max width 560px, 24px radius, backdrop blur 8px; mobile modal becomes bottom sheet.

### Toast / alert
Types Success, Warning, Error, Info. Include icon + title + concise description; auto-dismiss only for non-critical messages. Error messages remain actionable.

### AI orb
Size 160px hero / 48px compact. States Idle, Listening, Thinking, Responding, Error.
Idle: low-amplitude slow float and soft cyan/teal glow.
Listening: pulsing outer ring and mic indicator.
Thinking: slowly rotating light bands; avoid rapid flashing.
Responding: gentle brightness pulse synced to streaming.
Error: stop motion and show a restrained red status indicator.
Respect prefers-reduced-motion; use static fallback.

## 5. Motion
- Micro interactions: 140–180ms ease-out.
- Menus and popovers: 180–220ms.
- Page transitions: 240–320ms.
- Orb idle loop: 5–8s, low amplitude.
- Use transform/opacity; avoid animating blur or large shadows.
- Reduced motion: remove continuous orb movement and transition only opacity.

## 6. Accessibility
Target WCAG 2.2 AA. Body text should meet 4.5:1 contrast; large text and UI boundaries 3:1. Keyboard focus always visible. Minimum touch target 44×44px where possible. Include labels for icon-only controls. Never rely only on color for status.

## 7. Figma setup
Recommended pages:
00 — Cover & Principles
01 — Foundations (Color, Type, Spacing, Grid, Radius, Effects)
02 — Components (Buttons, Inputs, Navigation, Cards, Chat, Feedback)
03 — Patterns (Welcome, Conversation, Search, Settings, Empty states)
04 — Responsive (Desktop, Tablet, Mobile)
05 — Playground (theme and glass experiments)

Recommended component naming:
Button / Primary / Medium / Default
Button / Secondary / Small / Hover
Field / Text / Medium / Focus
Composer / Hero / Empty
Composer / Compact / Sending
Navigation / Sidebar Item / Active
Chip / Suggestion / Neutral
Orb / Hero / Thinking

Use Auto Layout for every component. Use variables for colors, spacing, radius, and typography. Create component properties for Variant, Size, State, Icon leading, Icon trailing, and Label. Set sensible min/max widths and use Fill container for responsive regions.

## 8. Included files
- `zyricon.tokens.json`: Tokens Studio-style token groups.
- `zyricon.tokens.css`: CSS custom properties and starter component styles.
- `README.md`: this complete specification.
