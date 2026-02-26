/**
 * COMPONENT USAGE GUIDE
 * 
 * This file shows best practices and examples for using
 * the production components in the SaaS UI system.
 */

// ============================================================================
// 1. BUTTON COMPONENT
// ============================================================================

import { Button } from './components/ui/Button';

// Primary action buttons
<Button variant="primary" size="md">Create New</Button>

// Secondary actions
<Button variant="secondary" size="sm">Cancel</Button>

// Ghost (text-only) buttons
<Button variant="ghost">Learn More</Button>

// With icons and loading
<Button variant="primary" loading={isLoading}>
  <Save size={18} /> Save Changes
</Button>

// ============================================================================
// 2. CARD COMPONENT
// ============================================================================

import { Card, CardHeader, CardContent, CardFooter } from './components/ui/Card';

<Card hover>
  <CardHeader>
    <h3 className="font-semibold">Card Title</h3>
    <p className="text-sm text-gray-500">Optional subtitle</p>
  </CardHeader>
  
  <CardContent>
    {/* Main content goes here */}
  </CardContent>
  
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>

// ============================================================================
// 3. FORM FIELD COMPONENT
// ============================================================================

import { FormField, Input, Select, Textarea } from './components/ui/FormField';
import { useForm } from 'react-hook-form';

const { register, formState: { errors } } = useForm();

// Text input
<FormField label="Full Name" required error={errors.name?.message}>
  <Input
    placeholder="John Doe"
    {...register('name', { required: 'Name is required' })}
  />
</FormField>

// Select dropdown
<FormField label="Department" required error={errors.department?.message}>
  <Select {...register('department', { required: 'Select a department' })}>
    <option value="">Select Department</option>
    <option value="cs">Computer Science</option>
    <option value="ec">Electronics</option>
  </Select>
</FormField>

// Textarea
<FormField label="Description" helperText="Be concise and clear">
  <Textarea
    rows={4}
    placeholder="Describe your event..."
    {...register('description')}
  />
</FormField>

// ============================================================================
// 4. MAIN LAYOUT WRAPPER
// ============================================================================

import { MainLayout } from './components/Layout/MainLayout';

<MainLayout
  title="Circular Generator"
  subtitle="Create formal institutional circulars"
  actions={[
    <Button key="download" variant="secondary" size="md">
      Download Template
    </Button>,
    <Button key="save" variant="primary" size="md">
      Save & Generate
    </Button>,
  ]}
>
  {/* Page content */}
</MainLayout>

// ============================================================================
// 5. SPLIT-SCREEN GENERATOR LAYOUT
// ============================================================================

<MainLayout title="Proposal Generator">
  <div className="grid lg:grid-cols-2 gap-8">
    {/* Form on left */}
    <div>
      <Card>
        <CardHeader>Enter Details</CardHeader>
        <CardContent>
          {/* Form fields */}
        </CardContent>
        <CardFooter>
          <Button variant="primary">Generate</Button>
        </CardFooter>
      </Card>
    </div>

    {/* Preview on right */}
    <div>
      <Card className="h-full">
        <CardHeader>Live Preview</CardHeader>
        <CardContent className="overflow-y-auto">
          <DocumentPreview content={preview} />
        </CardContent>
      </Card>
    </div>
  </div>
</MainLayout>

// ============================================================================
// 6. BADGE COMPONENT
// ============================================================================

import { Badge, StatusBadge } from './components/ui/Badge';

// Simple badge
<Badge variant="primary">In Progress</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>

// Status badge with icon
<StatusBadge status="active" />
<StatusBadge status="completed" />

// ============================================================================
// 7. RESPONSIVE GRID LAYOUT
// ============================================================================

// Auto-responsive grid (1 col on mobile, 2 on tablet, 3 on desktop)
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>

// ============================================================================
// 8. ERROR HANDLING
// ============================================================================

import { AlertCircle } from 'lucide-react';

{apiError && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-red-700">{apiError}</p>
  </div>
)}

// ============================================================================
// 9. DRAG & DROP UPLOAD
// ============================================================================

const [dragActive, setDragActive] = useState(false);

const handleDrag = (e) => {
  e.preventDefault();
  setDragActive(e.type === 'dragenter' || e.type === 'dragover');
};

const handleDrop = (e) => {
  e.preventDefault();
  if (e.dataTransfer.files) {
    processFiles(e.dataTransfer.files);
  }
};

<div
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDrop={handleDrop}
  className={`border-2 border-dashed rounded-lg p-8 ${
    dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
  }`}
>
  <Upload size={32} className="mx-auto mb-2" />
  <p>Drag and drop files here</p>
</div>

// ============================================================================
// 10. ICON USAGE
// ============================================================================

import { 
  FileText, 
  BookOpen, 
  BarChart3, 
  Home,
  ChevronLeft,
  AlertCircle,
  Download,
  Upload,
} from 'lucide-react';

// Size convention: 18px for inline, 24px for standalone
<FileText size={18} className="text-gray-600" />
<BarChart3 size={24} className="text-indigo-600" />

// ============================================================================
// STYLE GUIDELINES
// ============================================================================

/**
 * Padding Conventions:
 * - Card sections: px-6 py-5
 * - Form sections: space-y-6
 * - Button groups: gap-3
 * 
 * Border Colors:
 * - Default: border-gray-200
 * - Muted: border-gray-100
 * - Active: border-indigo-500
 * - Error: border-red-500
 * 
 * Text Colors:
 * - Primary: text-gray-900
 * - Secondary: text-gray-600
 * - Muted: text-gray-500
 * - Disabled: text-gray-400
 * 
 * Background Colors:
 * - Light: bg-gray-50
 * - Lighter: bg-gray-100
 * - Danger: bg-red-50
 * - Success: bg-emerald-50
 * 
 * Transitions:
 * - Always use transition-all duration-300
 * - Buttons: transition-all (built in)
 * - Hovers: add hover:shadow-lg
 * 
 * Focus States:
 * - All interactive: focus:outline-none focus:ring-2 focus:ring-offset-2
 * - Primary: focus:ring-indigo-500
 * - Inputs: focus:ring-indigo-100
 */

// ============================================================================
// ACCESSIBILITY CHECKLIST
// ============================================================================

/**
 * [ ] All buttons have descriptive labels or aria-label
 * [ ] Form inputs have associated labels
 * [ ] Color is not the only indicator of status
 * [ ] Focus states are visible
 * [ ] Contrast ratio meets WCAG AA (4.5:1 for text)
 * [ ] Interactive elements are keyboard accessible
 * [ ] Error messages are linked to inputs
 * [ ] Loading states are announced to screen readers
 * [ ] Images have alt text
 * [ ] Links are distinguishable from text
 */
