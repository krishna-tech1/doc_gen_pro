"""
INTEGRATION EXAMPLE
How to integrate the template system into existing routes

This file shows before/after examples for updating your API routes.
"""

# ============================================================================
# EXAMPLE 1: CIRCULAR ROUTE INTEGRATION
# ============================================================================

# BEFORE: Using python-docx directly
OLD_APPROACH = """
from services.document_service import generate_circular

@router.post("/generate-circular")
def create_circular(payload: CircularRequest, db: Session = Depends(get_db)):
    # Generate AI content
    ai_content = generate_content("circular", context)
    
    # Use old document service (complex python-docx code)
    doc_path = generate_circular(payload.model_dump(), ai_content)
    filename = os.path.basename(doc_path)
    
    return {
        'message': 'Circular generated',
        'event_id': event_id,
        'preview': ai_content,
        'download_url': f'/generated/{filename}'
    }
"""

# AFTER: Using template system
NEW_APPROACH_CIRCULAR = """
from services.template_processor import process_circular_template

@router.post("/generate-circular")
def create_circular(payload: CircularRequest, db: Session = Depends(get_db)):
    context = {
        'title': payload.title,
        'date': payload.date,
        'venue': payload.venue,
        'department': payload.department,
        'chief_guest': payload.chief_guest,
    }
    
    # Generate AI content (same as before)
    ai_content = generate_content("circular", context)
    
    # Use template system (much cleaner!)
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
        'message': 'Circular generated successfully',
        'event_id': event_id or 0,
        'preview': ai_content,
        'download_url': f'/generated/{filename}'
    }
"""

# ============================================================================
# EXAMPLE 2: PROPOSAL ROUTE INTEGRATION
# ============================================================================

NEW_APPROACH_PROPOSAL = """
from services.template_processor import process_proposal_template

@router.post("/generate-proposal")
def create_proposal(payload: ProposalRequest, db: Session = Depends(get_db)):
    context = {
        'event_name': payload.event_name,
        'objectives': payload.objectives,
        'target_audience': payload.target_audience,
        'budget': str(payload.budget),
    }
    
    # Generate AI content
    ai_content = generate_content("event proposal", context)
    
    # Use template system
    doc_path = process_proposal_template(
        event_name=payload.event_name,
        objectives=payload.objectives,
        target_audience=payload.target_audience,
        budget=payload.budget,
        ai_content=ai_content
    )
    
    filename = os.path.basename(doc_path)
    event_id = None  # From DB if persisted
    
    return {
        'message': 'Proposal generated successfully',
        'event_id': event_id or 0,
        'preview': ai_content,
        'download_url': f'/generated/{filename}'
    }
"""

# ============================================================================
# EXAMPLE 3: REPORT ROUTE INTEGRATION
# ============================================================================

NEW_APPROACH_REPORT = """
from services.template_processor import process_report_template

@router.post("/generate-report")
async def create_report(
    event_title: str = Form(...),
    summary: str = Form(...),
    num_participants: int = Form(...),
    sdg_id: int = Form(...),
    date: Optional[str] = Form(None),
    images: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    # Save images (existing code)
    saved_images = []
    for upload in images:
        # ... save logic ...
        saved_images.append({'path': dest, 'latitude': lat, 'longitude': lon})
    
    # Get SDG info from DB
    sdg = db.query(SDGGoal).filter(SDGGoal.id == sdg_id).first()
    
    # Get location from GPS or default
    location_name = "On Campus"  # from images or default
    
    context = {
        'event_title': event_title,
        'summary': summary,
        'num_participants': str(num_participants),
        'sdg_goal': f"SDG {sdg.number} – {sdg.name}" if sdg else "",
        'location': location_name,
    }
    
    # Generate AI content
    ai_content = generate_content("event report", context)
    
    # Use template system
    doc_path = process_report_template(
        event_title=event_title,
        summary=summary,
        num_participants=num_participants,
        sdg_info={
            'number': sdg.number if sdg else '',
            'title': sdg.name if sdg else '',
            'description': sdg.description if sdg else ''
        },
        ai_content=ai_content,
        location=location_name
    )
    
    filename = os.path.basename(doc_path)
    
    return {
        'message': 'Report generated successfully',
        'event_id': event_id or 0,
        'preview': ai_content,
        'download_url': f'/generated/{filename}'
    }
"""

# ============================================================================
# STEP-BY-STEP MIGRATION
# ============================================================================

MIGRATION_STEPS = """
STEP 1: Add import
-----
at top of routes/circular.py:
    from services.template_processor import process_circular_template

STEP 2: Replace document generation
-----
Change:
    doc_path = generate_circular(payload.model_dump(), ai_content)

To:
    doc_path = process_circular_template(
        title=payload.title,
        date=payload.date,
        time=payload.time,
        venue=payload.venue,
        department=payload.department,
        chief_guest=payload.chief_guest,
        ai_content=ai_content
    )

STEP 3: Test
-----
1. Run server: python main.py
2. Go to http://localhost:8000/api/docs
3. Try POST /generate-circular
4. Download and verify DOCX file

STEP 4: Repeat for other routes
-----
Repeat steps 1-3 for:
- routes/proposal.py (use process_proposal_template)
- routes/report.py (use process_report_template)

STEP 5: Remove old document_service code (optional)
-----
Once all routes migrated, can remove unused functions from
services/document_service.py
"""

# ============================================================================
# TESTING EXAMPLE
# ============================================================================

TEST_TEMPLATE_RENDERING = """
# Test the template processor directly

from services.template_processor import InstitutionalTemplateProcessor

# Create test context
context = {
    'EVENT_TITLE': 'Test Event 2025',
    'DATE': '20-03-2025',
    'TIME': '10:00 AM',
    'VENUE': 'Main Auditorium',
    'REF_NO': 'TEST/2025/001',
    'OBJECTIVE': 'To test the template system',
    'AI_CONTENT': 'This is a test document generated from the template.',
    'TRAINER_LIST': 'Dr. A, Prof. B, Ms. C',
    'SDG_NUMBER': '4',
    'SDG_TITLE': 'Quality Education',
    'SDG_DESCRIPTION': 'This event promotes inclusive and equitable quality education.',
    'OUTCOME': 'Participants gained new knowledge and skills',
    'FEEDBACK': 'Very successful event with excellent feedback',
}

# Process
processor = InstitutionalTemplateProcessor()
output_path = processor.process(context)

print(f"Document generated: {output_path}")

# Verify file exists
import os
assert os.path.exists(output_path), "Document was not created!"
print("✅ Document successfully generated and saved!")
"""

# ============================================================================
# COMPARISON: OLD VS NEW
# ============================================================================

COMPARISON = """
METRIC              | OLD (python-docx)  | NEW (Template System)
─────────────────────────────────────────────────────────────
Code complexity     | High (+100 lines)   | Low (3-5 lines)
Maintainability     | Difficult           | Easy
Consistency         | Variable            | Guaranteed
Template reuse      | Not possible        | Yes
Formatting control  | Custom code         | Template-based
Migration effort    | ~2 hours            | ~30 minutes
Testing             | Complex             | Simple
Customization       | Code changes        | Template edit
Team collaboration  | Requires coding     | Edit template/docs
College branding    | Manual setup        | Built-in
"""

if __name__ == '__main__':
    print(__doc__)
    print("\n" + "="*70)
    print("BEFORE vs AFTER")
    print("="*70)
    print(COMPARISON)
