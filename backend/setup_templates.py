#!/usr/bin/env python
"""
setup_templates.py

Initialize and create all institutional document templates.
Run this once after setup to generate the template files.

Usage:
    python setup_templates.py
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from templates.create_document_template import create_template

if __name__ == '__main__':
    print("Initializing institutional document templates...")
    print("=" * 60)
    
    try:
        template_path = create_template()
        print("=" * 60)
        print("✅ Template setup completed successfully!")
        print(f"   Template location: {template_path}")
        print("\n📝 Next steps:")
        print("   1. The template can now be used with template_processor.py")
        print("   2. Update document services to use the template system")
        print("   3. Use docxtpl to render templates with dynamic content")
    except Exception as e:
        print(f"❌ Error setting up templates: {e}")
        sys.exit(1)
