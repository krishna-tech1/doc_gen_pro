# 🚀 Institutional Document Automation System - Premium SaaS UI

A production-ready, SaaS-grade user interface for institutional document generation featuring a modern minimalist design inspired by Notion, Linear, and Stripe.

## ✨ Features

### 🎨 Design System
- **Professional Minimalist Theme**: Clean aesthetic with subtle shadows and rounded corners
- **Color System**: Carefully curated indigo primary, with emerald and gray accents
- **Typography**: Inter font family with proper hierarchy and spacing
- **Responsive**: Mobile-first design that scales beautifully
- **Dark Mode Ready**: Built with extensibility for dark theme support

### 📐 Layout Architecture
- **Collapsible Sidebar**: Fixed left navigation with smooth animations
- **Sticky Header**: Top navigation bar with page title and actions
- **Main Content Area**: Proper spacing and max-width constraints
- **Split-Screen Generators**: Form + Live Preview side-by-side layout
- **Dashboard Hub**: Central location for quick actions and recent documents

### 🎯 Components
- **Button**: 6 variants (primary, secondary, outline, ghost, success, danger)
- **Card**: Flexible container with header, content, and footer sections
- **Form Fields**: Input, Select, Textarea with integrated error handling
- **Badge**: Status indicators with 5 color variants
- **Sidebar**: Collapsible navigation with active states
- **Header**: Sticky top bar with title and action buttons
- **DocumentPreview**: Live document preview with print styling

### 📱 Pages
1. **Dashboard**: Central hub with quick actions and recent documents
2. **Circular Generator**: Form + preview split view
3. **Proposal Generator**: Form + preview split view
4. **Report Generator**: Image upload + preview with drag-drop

### ⚡ Interactions
- Smooth transitions on all interactive elements
- Loading states with spinners
- Error boundaries with alert components
- Drag & drop file upload
- Form validation with inline errors
- Toast-style notifications ready

## 🏗 Project Structure

```
frontend/src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx          # Multi-variant button component
│   │   ├── Card.jsx            # Card family (Header, Content, Footer)
│   │   ├── Badge.jsx           # Status & regular badges
│   │   ├── FormField.jsx       # Form controls (Input, Select, Textarea)
│   │   └── index.js            # UI exports
│   ├── Layout/
│   │   ├── Sidebar.jsx         # Collapsible navigation
│   │   ├── Header.jsx          # Top navigation bar
│   │   ├── MainLayout.jsx      # Main layout wrapper
│   │   └── index.js            # Layout exports
│   └── Common/
│       ├── DocumentPreview.jsx # Live document preview
│       └── index.js            # Common exports
├── pages/
│   ├── Dashboard.jsx           # Main dashboard (NEW)
│   ├── CircularGeneratorNew.jsx
│   ├── ProposalGeneratorNew.jsx
│   ├── ReportGeneratorNew.jsx
│   └── [Legacy pages...]       # Backward compatibility
├── lib/
│   └── utils.js               # Design tokens & helpers
├── api.js
├── App.jsx
└── index.css
```

## 🎨 Design System

### Colors
- **Primary**: `#4f46e5` (Indigo-600)
- **Success**: `#10b981` (Emerald-600)
- **Error**: `#ef4444` (Red-600)
- **Background**: `#f9fafb` (Gray-50)
- **Card**: `#ffffff` (White)

### Spacing Scale
```
xs: 0.25rem    sm: 0.5rem     md: 1rem       lg: 1.5rem
xl: 2rem       2xl: 2.5rem    3xl: 3rem
```

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Text**: 400 weight, 1.6 line-height
- **Labels**: 600 weight, uppercase, 0.05em tracking

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

### New UI Routes
```
/dashboard          → Main dashboard
/circular           → Circular generator (split layout)
/proposal           → Proposal generator (split layout)
/report             → Report generator (with image upload)
/circular-old       → Legacy circular page
/proposal-old       → Legacy proposal page
/report-old         → Legacy report page
/                   → Redirects to /dashboard
```

## 💻 Component Usage

### Button Variants
```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>

// With loading state
<Button loading={isLoading}>Generate</Button>

// With icon
<Button><Save size={18} /> Save</Button>
```

### Card Layout
```jsx
<Card hover>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Form Fields
```jsx
<FormField label="Name" required error={errors.name?.message}>
  <Input {...register('name')} />
</FormField>

<FormField label="Category">
  <Select {...register('category')}>
    <option>Option 1</option>
  </Select>
</FormField>

<FormField label="Description">
  <Textarea {...register('description')} rows={4} />
</FormField>
```

### Main Layout Wrapper
```jsx
<MainLayout
  title="Page Title"
  subtitle="Optional subtitle"
  actions={[
    <Button key="action">Action Button</Button>
  ]}
>
  {/* Page content */}
</MainLayout>
```

## 🎬 Animations

### Built-in Animations
- **Fade In**: Content fade with slight upward movement
- **Slide In**: Sidebar/modal entrance from side
- **Smooth Transitions**: 300ms default for all interactive elements

```css
/* Usage */
<div className="animate-in">Content</div>
<div className="animate-slide-in">Sidebar</div>
```

## ♿ Accessibility

### Built-in Features
- ✅ WCAG AA contrast compliance
- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ Proper label associations
- ✅ Error message accessibility
- ✅ ARIA labels where needed
- ✅ Semantic HTML structure

### Guidelines
- All buttons have aria-label or text content
- Form inputs associated with labels
- Disabled states clearly visible
- Focus states prominent (2px ring)
- Color not sole indicator of status

## 📊 Dashboard Features

- **Welcome Hero**: Gradient banner with quick start
- **Quick Actions**: 3 feature cards for quick access
- **Analytics**: Summary stats (Total, This Month, Downloaded, Rate)
- **Recent Documents**: List of latest generated documents
- **Responsive Grid**: Adapts to screen size

## 🔧 Customization

### Change Primary Color
Update in `lib/utils.js`:
```javascript
export const colors = {
  primary: '#7c3aed', // Change to desired color
  // ... other colors
};
```

Then update Tailwind classes throughout components.

### Add Dark Mode
1. Update `index.css` with dark mode utilities
2. Add theme toggle in Header
3. Update color system for dark variants

### Extend Components
Each component file includes JSDoc comments and can be extended with new variants.

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.71.2",
  "react-router-dom": "^7.13.1",
  "lucide-react": "Latest",
  "framer-motion": "Latest",
  "tailwindcss": "^4.2.1",
  "@tailwindcss/vite": "^4.2.1",
  "clsx": "Latest",
  "class-variance-authority": "Latest"
}
```

## 🎯 Performance

- Lazy loading for images
- Code splitting per page
- Memoization for heavy components
- Debounced form watching
- Optimal CSS delivery with Tailwind

## 📝 Documentation

- **DESIGN_SYSTEM.md**: Complete design system reference
- **COMPONENT_USAGE.md**: Usage examples and best practices
- **Inline JSDoc**: Comments in all component files

## 🔐 Security

- Input sanitization ready
- XSS prevention through React
- CSRF token support in API calls
- Form validation on client and server

## 🚢 Production Checklist

- [ ] Review color contrast accessibility
- [ ] Test responsive breakpoints
- [ ] Verify all form validations
- [ ] Check API error handling
- [ ] Test keyboard navigation
- [ ] Browser compatibility testing
- [ ] Performance profiling
- [ ] SEO meta tags
- [ ] Build optimization

## 🤝 Contributing

When adding new components:
1. Create in appropriate `components/` folder
2. Add JSDoc comments
3. Export from appropriate `index.js`
4. Add usage example to COMPONENT_USAGE.md
5. Test accessibility

## 📄 License

Proprietary - Institutional Document Automation System

## 🎓 Credits

Designed with inspiration from:
- Notion (minimalist design)
- Linear (split layouts)
- Stripe Dashboard (professional components)
