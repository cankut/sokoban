# Sokoban Game Design Guidelines

## Design Approach
**Reference-Based: Classic Retro Gaming Aesthetic**

Drawing inspiration from vintage puzzle games and retro gaming interfaces, this design embraces nostalgic simplicity with modern clarity. The visual language should evoke classic Sokoban games while maintaining contemporary usability standards.

## Layout Architecture

### Page Structure
Single-page layout with centered game board:
- Header section (h-16): Game title, level indicator, move counter
- Game board area: Centered with max-w-2xl container
- Control panel (below board): Reset, Undo, Level navigation buttons
- Footer: Minimal controls reference and credits

### Spacing System
Use Tailwind units: **2, 4, 6, 8, 12** for consistent rhythm
- Component padding: p-4 to p-8
- Section gaps: space-y-6 to space-y-8
- Grid cells: Uniform square cells (w-12 h-12 for desktop, w-10 h-10 for mobile)

## Typography

**Primary Font:** Monospace family ('Courier New', monospace or 'Press Start 2P' from Google Fonts for authentic retro feel)
- Game title: text-3xl font-bold tracking-wider
- Level indicators: text-xl font-semibold
- Stats/counters: text-lg font-mono
- Instructions: text-sm font-mono

**Hierarchy:**
- H1 (Title): Uppercase, bold, prominent spacing
- H2 (Level): Medium weight, clear numbering
- Body (Stats): Monospace, tabular numbers

## Component Library

### Game Board Grid
- Square grid cells with visible borders
- Each cell: aspect-square, border thickness 1-2px
- Grid container: inline-grid with defined columns/rows
- Responsive scaling: Smaller cells on mobile (w-8 h-8), larger on desktop (w-12 h-12)

### Game Elements (as emoji/unicode or simple shapes)
- Player: Use character sprite or emoji (🧑 or custom icon)
- Boxes: Square shapes or box emoji (📦)
- Goals: Distinct markers (⭕ or target symbol)
- Walls: Solid blocks with texture treatment
- Floor: Subtle differentiation from walls

### Control Buttons
- Grouped button sets: flex gap-4 layout
- Primary actions (Reset/Undo): Larger touch targets (min h-12)
- Navigation (Previous/Next Level): Secondary styling
- Keyboard hints: Small badges showing key bindings (← → ↑ ↓ or WASD)

### Status Display
- Move counter: Large, prominent numbers in monospace
- Level progress: "Level X/10" with clear typography
- Completion state: Modal or overlay with congratulations message
- Best score indicator (if tracking): Small badge or chip component

### UI Panels
- Level completion overlay: Centered modal with blurred backdrop
- Instructions panel (optional toggle): Compact accordion or sidebar
- Stats card: Bordered container showing moves, time, level info

## Interaction Patterns

### Keyboard Controls
- Arrow keys & WASD for movement (primary interaction)
- R for reset, U for undo
- ESC for pause/menu
- Visual feedback on key press (subtle player bounce or highlight)

### Button States
- Default: Solid with border
- Hover: Subtle transform (scale or lift effect)
- Active/pressed: Slight inset shadow
- Disabled: Reduced opacity with cursor-not-allowed

### Level Transitions
- Smooth fade between levels (300ms duration)
- Celebration animation on completion (simple scale/bounce)
- Victory modal with stats and "Next Level" CTA

## Responsive Design

**Desktop (lg:):**
- Game board: 12x12 cell grid at w-12 h-12
- Side-by-side layout possible for stats
- Larger typography and generous spacing

**Tablet (md:):**
- Game board: 10x10 cells at w-10 h-10
- Stacked layout for controls
- Compact stat displays

**Mobile (base):**
- Game board: 8x8 cells at w-8 h-8
- Full-width controls
- Touch-friendly button sizes (min-h-12)
- Virtual direction buttons (optional) alongside keyboard support

## Visual Treatment

### Borders & Containers
- Consistent border-width: 2px for game elements, 1px for UI
- Rounded corners: Very subtle (rounded-sm) or sharp (rounded-none) for retro feel
- Box shadows: Minimal, used only for depth on modals

### Background Patterns
- Game board: Subtle checkered or grid pattern
- Page background: Solid or very subtle noise texture
- Modals: Semi-transparent overlay (bg-opacity-90)

## Accessibility

- Keyboard-first navigation (already core to gameplay)
- High contrast between game elements
- Clear focus indicators on interactive elements (ring-2 ring-offset-2)
- Screen reader labels for all game states
- Skip to game board link for navigation
- Announce level changes and move counts

## Animation Budget
Minimal, purposeful animations only:
- Level completion: Single celebratory bounce (500ms)
- Box placement: Subtle snap-to-grid effect
- Button presses: Quick press feedback (100ms)
- Undo action: Brief reverse animation of last move
- NO continuous animations, NO scroll effects

## Images
**No hero images needed.** This is a pure game interface focused on gameplay mechanics. All visual elements are UI components and game sprites.

---

**Design Philosophy:** Embrace retro simplicity with modern polish. Every pixel serves gameplay clarity. Nostalgia meets usability.