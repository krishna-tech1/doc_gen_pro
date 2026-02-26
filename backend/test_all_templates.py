"""Test all three document generation endpoints"""
from services.template_processor import (
    process_circular_template,
    process_proposal_template,
    process_report_template
)

print("=" * 70)
print("🧪 TESTING TEMPLATE SYSTEM - ALL THREE ENDPOINTS")
print("=" * 70)

# Test 1: Circular
print("\n1️⃣  Testing Circular Template...")
try:
    circular_result = process_circular_template(
        title="Annual Tech Conference",
        date="25-02-2026",
        time="10:00 AM",
        venue="Main Auditorium",
        department="Computer Applications",
        chief_guest="Dr. Rajesh Kumar",
        ai_content={
            'introduction': 'Annual technology conference featuring latest innovations in AI and cloud computing.',
            'objectives': 'To explore emerging technologies and foster collaboration among students and faculty.',
            'outcome': 'Participants gained knowledge on modern tech trends and networking opportunities.',
            'conclusion': 'Event was highly appreciated with positive feedback from 200+ attendees.'
        }
    )
    print(f"   ✅ Circular generated: {circular_result}")
except Exception as e:
    print(f"   ❌ Error: {e}")
    import traceback
    traceback.print_exc()

# Test 2: Proposal
print("\n2️⃣  Testing Proposal Template...")
try:
    proposal_result = process_proposal_template(
        event_name="Summer Internship Program",
        objectives="Provide practical experience to students in latest technologies",
        target_audience="3rd and 4th year students",
        budget="₹5,00,000",
        ai_content={
            'proposal_intro': 'A comprehensive internship program designed to bridge the gap between academic learning and industry practice.',
            'detailed_plan': '4-week program covering Python, Web Development, and Database Management with hands-on projects.',
            'expected_outcome': 'Students will gain practical skills and industry exposure, enhancing their employability.',
            'conclusion': 'This program will significantly benefit students in their career development.'
        }
    )
    print(f"   ✅ Proposal generated: {proposal_result}")
except Exception as e:
    print(f"   ❌ Error: {e}")
    import traceback
    traceback.print_exc()

# Test 3: Report
print("\n3️⃣  Testing Report Template...")
try:
    report_result = process_report_template(
        event_title="Programming Workshop Report",
        summary="Successfully conducted a 2-day programming workshop on Python and Web Development.",
        num_participants=85,
        sdg_info={
            'number': 4,
            'title': 'Quality Education',
            'description': 'Promoting quality education and lifelong learning opportunities.'
        },
        ai_content={
            'introduction': 'A comprehensive report of the programming workshop.',
            'objectives': 'Covered basic to advanced concepts with practical coding sessions and projects.',
            'outcome': 'Participants developed practical programming skills applicable to real-world projects.',
            'conclusion': 'Excellent feedback received regarding course content and delivery methodology.'
        },
        location="Main Computer Lab"
    )
    print(f"   ✅ Report generated: {report_result}")
except Exception as e:
    print(f"   ❌ Error: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
print("✅ ALL TESTS COMPLETED!")
print("=" * 70)
print("\n📁 Generated files location: backend/generated/")
print("\nYou can now:")
print("  1. Download these DOCX files from the backend/generated/ folder")
print("  2. Open them in MS Word or Google Docs")
print("  3. Verify all placeholders are filled and formatting is correct")
