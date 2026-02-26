from services.template_processor import process_circular_template

try:
    result = process_circular_template(
        title="Test Event",
        date="25-02-2026",
        time="10:00 AM",
        venue="Main Hall",
        department="Computer Applications",
        chief_guest="Dr. Test",
        ai_content={
            'introduction': 'This is a test event about technology.',
            'objectives': 'To learn and share knowledge.',
            'outcome': 'Successful completion of event.',
            'conclusion': 'Positive feedback from participants.'
        }
    )
    print(f"✅ Document generated: {result}")
except Exception as e:
    print(f"❌ Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
