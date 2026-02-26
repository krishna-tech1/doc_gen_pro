"""
INSTITUTIONAL DOCUMENT TEMPLATE SYSTEM
Avichi College of Arts and Science

Architecture
============

The template system uses a professional, reusable DOCX design with dynamic
placeholder support via docxtpl. This allows separation of document design
from content generation logic.

Files
=====

1. create_document_template.py
   - Generates the institutional template with official college branding
   - Creates DOCX file with placeholders ready for docxtpl processing
   - Handles professional formatting and layout

2. template_processor.py
   - Loads templates and renders them with dynamic content
   - Provides high-level functions for document types (circular, proposal, report)
   - Automatically handles placeholder replacement

3. setup_templates.py
   - One-time setup script to initialize templates
   - Run once after backend installation

Placeholder Reference
====================

The institutional template contains these placeholders (use double braces):

METADATA
--------
{{REF_NO}}          - Reference/Document number
{{DATE}}            - Document date (auto-filled if not provided)
{{TIME}}            - Event time

CONTENT
-------
{{EVENT_TITLE}}     - Main document/event title
{{VENUE}}           - Location/venue
{{OBJECTIVE}}       - Event objectives or description
{{AI_CONTENT}}      - Main document content (AI-generated)
{{TRAINER_LIST}}    - Resource persons or participants list

SDG SECTION
-----------
{{SDG_NUMBER}}      - Sustainable Development Goal number (e.g., "4")
{{SDG_TITLE}}       - SDG title (e.g., "Quality Education")
{{SDG_DESCRIPTION}} - SDG description

CONCLUSIONS
-----------
{{OUTCOME}}         - Expected outcomes or impact
{{FEEDBACK}}        - Feedback, assessment, or conclusions

Template Features
=================

✓ Official College Branding
  - Fixed logo at top center
  - College name: "AVICHI COLLEGE OF ARTS AND SCIENCE"
  - Department: "DEPARTMENT OF COMPUTER APPLICATIONS"
  - Professional header with horizontal line

✓ Professional Formatting
  - Font: Times New Roman, 12pt
  - Headings: Bold, 12pt
  - Title: Bold, 14pt, Colored
  - Proper spacing between sections
  - Justified body text
  - Professional signature section

✓ Flexible Layout
  - Metadata section with reference number and date
  - Dynamic content sections
  - Optional SDG information
  - Standard signature block

✓ docxtpl Compatible
  - All placeholders use {{KEY}} syntax
  - Supports both single values and complex content
  - Clean, minimal styling for proper rendering

Usage Examples
==============

Example 1: Using InstitutionalTemplateProcessor
-----------------------------------------------

from services.template_processor import InstitutionalTemplateProcessor

processor = InstitutionalTemplateProcessor()

context = {
    'EVENT_TITLE': 'Annual Science Symposium 2025',
    'DATE': '20-03-2025',
    'TIME': '10:00 AM',
    'VENUE': 'Main Auditorium',
    'REF_NO': 'ACAS/DCA/2025/ASS',
    'OBJECTIVE': 'Promote research culture among students',
    'AI_CONTENT': 'The symposium provides a platform...',
    'TRAINER_LIST': 'Dr. A (HOD), Prof. B (Coordinator)',
    'SDG_NUMBER': '4',
    'SDG_TITLE': 'Quality Education',
    'SDG_DESCRIPTION': 'This event promotes inclusive education...',
    'OUTCOME': 'Students developed research and presentation skills',
    'FEEDBACK': 'Highly successful with 150+ participants',
}

output_path = processor.process(context)
# Returns: /path/to/generated/Annual_Science_Symposium_2025_20250320_101500.docx


Example 2: Using Document-Specific Functions
-----------------------------------------

from services.template_processor import process_circular_template

ai_content = {
    'introduction': 'The annual circular is issued...',
    'objectives': '1. Enhance awareness\n2. Foster participation',
    'outcome': 'Increased student engagement',
    'conclusion': 'Thank you for the support',
}

output = process_circular_template(
    title='Annual Sports Day',
    date='15-03-2025',
    time='09:00 AM',
    venue='Sports Complex',
    department='Physical Education',
    chief_guest='Dr. Ramesh, Principal',
    ai_content=ai_content
)
# Returns: /path/to/generated/Circular_Annual_Sports_Day.docx


Example 3: From FastAPI Route
------------------------------

@router.post("/generate-circular")
def create_circular(payload: CircularRequest, db: Session = Depends(get_db)):
    # Generate AI content
    ai_content = generate_content("circular", {...})
    
    # Use template processor
    from services.template_processor import process_circular_template
    
    doc_path = process_circular_template(
        title=payload.title,
        date=payload.date,
        time=payload.time,
        venue=payload.venue,
        department=payload.department,
        chief_guest=payload.chief_guest,
        ai_content=ai_content
    )
    
    filename = os.path.basename(doc_path)
    return {
        'message': 'Document generated',
        'preview': ai_content,
        'download_url': f'/generated/{filename}'
    }


Setup Instructions
==================

1. Install dependencies:
   pip install -r requirements.txt  # docxtpl will be included

2. Generate templates (one-time):
   python backend/setup_templates.py

3. Verify template created:
   ls backend/templates/institutional_template.docx

4. Start using in your routes:
   from services.template_processor import process_circular_template

Template Customization
======================

To customize the template:

1. MODIFY LAYOUT:
   Edit create_document_template.py to change section order, spacing, etc.
   Regenerate: python backend/setup_templates.py

2. ADD PLACEHOLDERS:
   Add new lines in create_document_template.py:
   new_field = doc.add_paragraph('{{NEW_FIELD}}')
   
   Then use in template_processor.py context dictionary

3. CHANGE STYLING:
   - Logo size: Modify run.add_picture(width=Inches(0.8))
   - Font: Change 'Times New Roman' to desired font
   - Colors: Modify HEADER_COLOR and ACCENT_COLOR constants
   - Spacing: Adjust _add_paragraph_spacing() values

4. ADD COLLEGE SPECIFICS:
   - Logo path: Ensure logo.png exists in backend/ directory
   - College name, department: Update in create_document_template.py
   - Colors: Match to college brand guidelines

Integration with Existing Services
==================================

The template system can replace or complement existing document_service.py:

OPTION 1: Full Replacement
   - Completely use template-based approach
   - Remove python-docx buildup code
   - Cleaner, more consistent documents

OPTION 2: Gradual Integration
   - Use templates for some document types
   - Keep existing code for others
   - Migrate route by route

Recommended: Full Replacement (cleaner architecture)

Troubleshooting
===============

Q: Template not found error
A: Run: python backend/setup_templates.py

Q: Placeholders not rendering
A: Ensure context dictionary uses exact uppercase keys

Q: Font looks wrong
A: Verify Times New Roman is installed on system

Q: Logo not showing
A: Ensure logo.png exists at backend/logo.png

Q: Template file too large
A: Normal for DOCX with embedded formatting

Q: Dynamic content not breaking properly
A: Add '\n' characters in AI_CONTENT for line breaks

Performance Notes
=================

- Template loading: ~100ms
- Rendering: ~50ms per document
- File writing: ~100ms
- Total: ~250ms per document

Suitable for:
✓ On-demand generation (few documents)
✓ Background task processing
✓ Dynamic content
✓ Professional institutional use

Advanced Features
=================

1. CONDITIONAL CONTENT
   Use logic in template_processor.py to conditionally set values:
   
   if include_sdg:
       context['SDG_TITLE'] = sdg_title
   else:
       context['SDG_TITLE'] = '[Not Applicable]'

2. NESTED CONTENT
   Pass formatted strings with line breaks:
   
   context['TRAINER_LIST'] = 'Dr. A (Coordinator)\nProf. B\nMs. C'

3. BATCH PROCESSING
   Generate multiple documents:
   
   for event in events:
       context = build_context(event)
       processor.process(context)

4. TEMPLATE VARIANTS
   Create multiple templates for different document types:
   - institutional_template_circular.docx
   - institutional_template_proposal.docx
   - institutional_template_report.docx

Technical Details
=================

docxtpl Rendering:
- Uses Jinja2 template syntax
- Processes text within {{}} placeholders
- Preserves formatting
- Handles encoding properly
- Works with images and tables

Security:
- Templates are static DOCX files
- No code execution in placeholders
- Safe for user-provided content

Limitations:
- Cannot add new pages programmatically (design-time only)
- Complex formulas not supported
- Headers/footers must be template-based

References
==========

docxtpl Documentation:
https://docxtpl.readthedocs.io/

python-docx Documentation:
https://python-docx.readthedocs.io/

FAQ
===

Q: Can I use this with other tools?
A: Yes, the DOCX files are standard format. Use MS Word, LibreOffice, etc.

Q: How do I track document versions?
A: Include REF_NO in reference, store in database with metadata

Q: Multi-language support?
A: Yes, just provide translated content in context dictionary

Q: Digital signatures?
A: Can be added post-generation or via additional libraries

Q: Print quality?
A: Professional DOCX formatting, prints exactly as displayed
"""

__version__ = "1.0.0"
__author__ = "Document Automation System"
__institution__ = "Avichi College of Arts and Science"
