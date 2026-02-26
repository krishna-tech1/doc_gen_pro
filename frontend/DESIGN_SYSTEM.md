# SaaS-Grade UI Design System
## Institutional Document Automation System

## 🎨 Design System Overview

### Color Palette
```
Primary:   #4f46e5 (Indigo-600) - Main CTA, active states
Secondary: #111827 (Gray-900)   - Primary text
Tertiary:  #6b7280 (Gray-500)   - Secondary text
Accent:    #10b981 (Emerald-600) - Success, highlights
Background: #f9fafb (Gray-50)   - Main background
Card:      #ffffff (White)      - Component backgrounds
Border:    #e5e7eb (Gray-200)   - Borders, dividers
```

### Typography System
- **Font**: Inter (400, 500, 600, 700, 800)
- **Headings**: Font-weight 700, tracking-tight
- **Body**: Font-weight 400, leading-relaxed
- **Labels**: Font-weight 600, text-xs, uppercased

### Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
```

### Border Radius
- Small: rounded-lg (8px)
- Medium: rounded-xl (12px)
- Large: rounded-2xl (16px)

### Shadows
- Card: shadow-sm (0 1px 2px rgba...)
- Hover: shadow-lg (0 10px 15px rgba...)
- None in minimalist mode

## 📁 Folder Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx          # Flexible button with variants
│   │   ├── Card.jsx            # Card container with sections
│   │   ├── Badge.jsx           # Badge/label component
│   │   ├── FormField.jsx       # Form wrapper with label/error
│   │   └── index.js            # UI barrel export
│   ├── Layout/
│   │   ├── Sidebar.jsx         # Side navigation (collapsible)
│   │   ├── Header.jsx          # Top header bar
│   │   ├── MainLayout.jsx      # Main layout wrapper
│   │   └── index.js
│   └── Common/
│       ├── DocumentPreview.jsx # Live document preview
│       └── index.js
├── pages/
│   ├── Dashboard.jsx           # Main dashboard (new)
│   ├── CircularGeneratorNew.jsx # Split layout form
│   ├── ProposalGeneratorNew.jsx # Split layout form
│   ├── ReportGeneratorNew.jsx  # Image upload form
│   └── [old pages...]          # Legacy pages (fallback)
├── lib/
│   └── utils.js               # Design system constants, cn() helper
├── api.js                      # API client
├── App.jsx                     # Main router
└── index.css                   # Global styles

```

## 🧩 Component Architecture

### Button Component
```jsx
<Button 
  variant="primary|secondary|outline|ghost|success|danger"
  size="sm|md|lg"
  loading={false}
  disabled={false}
>
  Label
</Button>
```

### Card Component
```jsx
<Card hover={true}>
  <CardHeader>Title & Subtitle</CardHeader>
  <CardContent>Main content</CardContent>
  <CardFooter>Action buttons</CardFooter>
</Card>
```

### FormField Component
```jsx
<FormField
  label="Label"
  required={true}
  error={errorMessage}
  helperText="Helper text"
>
  <Input />
</FormField>
```

## 🎯 Layout Structure

### Sidebar Navigation
- Fixed left sidebar (64rem width, collapsible to 5rem)
- Logo + branding at top
- Navigation items with icons
- Active state highlighting
- Smooth collapse animation

### Header Bar
- Fixed top bar (sticky)
- Page title + subtitle
- Action buttons on right
- Notification bell, settings, profile

### Main Content Area
- Margins after sidebar (ml-64)
- Padding: 32px (2rem)
- Min-height: full viewport

## ✨ Interaction Patterns

### Button States
- **Hover**: Slight scale up, shadow increase
- **Active**: No scale, slightly darker
- **Disabled**: Opacity 50%, cursor not-allowed
- **Loading**: Spinner + disabled state

### Form Focus
- Border color changes to primary
- Ring-2 with light tint
- Smooth transition (300ms)

### Card Hover
- Shadow increases from sm to lg
- Border becomes more visible
- Optional scale transform

### Navigation
- Active link: bg tint + left border
- Hover: bg lighter shade
- Smooth transition

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Layout Changes
- Sidebar collapses on mobile (mobile nav instead)
- Grid layouts: 1 col → 2 col → 3 col
- Padding reduces on mobile

## 🎨 Split-Screen Generator Layout

### Left (Form)
- Max-width container
- ScrollableSection
- Form fields in grid
- Action buttons at bottom

### Right (Preview)
- Document preview styling
- Print-like appearance
- Letterhead with logo
- Proper typography hierarchy
- Download button

## 🔄 Data Flow

1. User fills form
2. Watch form values for live preview
3. On submit → API call
4. Show loading spinner
5. Display preview on success
6. Allow download
7. Show error toast on failure

## 🎬 Animations

### Fade In
```css
@keyframes fadeIn { 
  from: { opacity: 0, transform: translateY(8px); }
  to: { opacity: 1; }
}
```

### Slide In
```css
@keyframes slideIn {
  from: { opacity: 0, transform: translateX(-8px); }
  to: { opacity: 1; }
}
```

### Smooth Transitions
- All components use transition-smooth (300ms)
- Buttons: 150ms for faster feedback
- Forms: 200ms for field changes

## ♿ Accessibility

### Focus States
- All interactive elements have focus:ring
- Outline: 2px solid offset: 2px

### Contrast
- Text on bg: WCAG AA minimum
- Buttons: High contrast borders on outline

### Keyboard Navigation
- Tab order follows visual flow
- Enter to submit forms
- Escape to close modals

### ARIA Labels
- Buttons: aria-label for icons
- Forms: Proper labels + error associations
- Navigation: aria-current="page"

## 🚀 Performance Optimizations

- Lazy load images in preview
- Memoize heavy components
- Debounce form watch
- Cache API responses
- Code split per page

## 📊 Design Tokens

Define in `src/lib/utils.js`:
```javascript
export const colors = { ... }
export const spacing = { ... }
export const transitions = { ... }
```

## 🔗 Component Usage Examples

See individual component files for JSDoc examples and usage patterns.
