"""
template_processor.py

Processes institutional document templates using docxtpl.
Provides functions to load templates and fill them with dynamic content.

This module handles all placeholder replacement and document generation.
"""

import os
from pathlib import Path
from docxtpl import DocxTemplate
from datetime import datetime

# Template path
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), '..', 'templates')
TEMPLATE_PATH = os.path.join(TEMPLATE_DIR, 'institutional_template.docx')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'generated')


class InstitutionalTemplateProcessor:
    """Process institutional document templates with dynamic content."""

    def __init__(self, template_path=TEMPLATE_PATH):
        """
        Initialize processor with template path.
        
        Parameters
        ----------
        template_path : str
            Path to the DOCX template file with placeholders
        """
        if not os.path.exists(template_path):
            raise FileNotFoundError(f"Template not found: {template_path}")
        
        self.template_path = template_path
        self.output_dir = OUTPUT_DIR

    def process(self, context, output_filename=None):
        """
        Process template with context data and generate DOCX.
        
        Parameters
        ----------
        context : dict
            Dictionary with placeholder keys and values
            Expected keys: DATE, TIME, VENUE, REF_NO, EVENT_TITLE, OBJECTIVE,
                         AI_CONTENT, TRAINER_LIST, SDG_NUMBER, SDG_TITLE,
                         SDG_DESCRIPTION, OUTCOME, FEEDBACK
        
        output_filename : str, optional
            Output filename. If not provided, auto-generates one.
        
        Returns
        -------
        str
            Absolute path to generated DOCX file
        """
        # Ensure output directory exists
        os.makedirs(self.output_dir, exist_ok=True)

        # Load template
        doc = DocxTemplate(self.template_path)

        # Prepare context with defaults
        context_data = self._prepare_context(context)

        # Render document
        doc.render(context_data)

        # Generate output path
        if output_filename is None:
            output_filename = self._generate_filename(context)

        output_path = os.path.join(self.output_dir, output_filename)

        # Save document
        doc.save(output_path)

        return output_path

    def _prepare_context(self, context):
        """
        Prepare and validate context dictionary.
        
        Parameters
        ----------
        context : dict
            Raw context from user
        
        Returns
        -------
        dict
            Validated context with defaults for missing values
        """
        defaults = {
            'REF_NO': '[Reference Number]',
            'DATE': datetime.now().strftime('%d-%m-%Y'),
            'TIME': '[Time not specified]',
            'VENUE': '[Venue not specified]',
            'EVENT_TITLE': '[Document Title]',
            'OBJECTIVE': '[Objectives to be added]',
            'AI_CONTENT': '[Content to be added]',
            'TRAINER_LIST': '[Resource persons to be added]',
            'SDG_NUMBER': '[SDG Number]',
            'SDG_TITLE': '[SDG Title]',
            'SDG_DESCRIPTION': '[SDG Description]',
            'OUTCOME': '[Expected outcomes to be added]',
            'FEEDBACK': '[Feedback and impact to be added]',
        }

        # Merge provided context with defaults
        final_context = {**defaults, **context}

        return final_context

    def _generate_filename(self, context):
        """
        Generate unique filename based on context.
        
        Parameters
        ----------
        context : dict
            Context dictionary
        
        Returns
        -------
        str
            Generated filename
        """
        title = context.get('EVENT_TITLE', 'Document').replace(' ', '_')[:20]
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return f"{title}_{timestamp}.docx"


def process_circular_template(title, date, time, venue, department, chief_guest, ai_content):
    """
    Process template for institutional circular.
    
    Parameters
    ----------
    title : str
        Circular title/event name
    date : str
        Event date (YYYY-MM-DD or DD-MM-YYYY)
    time : str
        Event time
    venue : str
        Event venue
    department : str
        Department name
    chief_guest : str
        Chief guest name (optional)
    ai_content : dict
        AI-generated content with keys: introduction, objectives, outcome, conclusion
    
    Returns
    -------
    str
        Path to generated DOCX file
    """
    processor = InstitutionalTemplateProcessor()

    context = {
        'EVENT_TITLE': title,
        'DATE': date,
        'TIME': time,
        'VENUE': venue,
        'REF_NO': f"ACAS/DCA/2025/{title[:3].upper()}",
        'OBJECTIVE': chief_guest if chief_guest else 'Faculty and Student event',
        'AI_CONTENT': ai_content.get('introduction', '') + ' ' + ai_content.get('objectives', ''),
        'OUTCOME': ai_content.get('outcome', ''),
        'FEEDBACK': ai_content.get('conclusion', ''),
        'TRAINER_LIST': f"Department Head - {department}",
    }

    return processor.process(context, output_filename=f"Circular_{title.replace(' ', '_')}.docx")


def process_proposal_template(event_name, objectives, target_audience, budget, ai_content):
    """
    Process template for event proposal.
    
    Parameters
    ----------
    event_name : str
        Event/proposal name
    objectives : str
        Event objectives
    target_audience : str
        Target audience
    budget : str or float
        Event budget (can be string like '₹5,00,000' or float)
    ai_content : dict
        AI-generated content
    
    Returns
    -------
    str
        Path to generated DOCX file
    """
    processor = InstitutionalTemplateProcessor()
    
    # Handle budget as string or float
    if isinstance(budget, (int, float)):
        budget_str = f"₹{budget:,.2f}"
    else:
        budget_str = str(budget)

    context = {
        'EVENT_TITLE': f"Event Proposal: {event_name}",
        'DATE': datetime.now().strftime('%d-%m-%Y'),
        'REF_NO': f"ACAS/DCA/PROP/{datetime.now().strftime('%Y%m%d')}",
        'OBJECTIVE': objectives,
        'AI_CONTENT': ai_content.get('proposal_intro', '') + '\n' + ai_content.get('detailed_plan', ''),
        'TRAINER_LIST': f"Target Audience: {target_audience}\nProposed Budget: {budget_str}",
        'OUTCOME': ai_content.get('expected_outcome', ''),
        'FEEDBACK': ai_content.get('conclusion', ''),
    }

    return processor.process(context, output_filename=f"Proposal_{event_name.replace(' ', '_')}.docx")


def process_report_template(event_title, summary, num_participants, sdg_info, ai_content, location=None):
    """
    Process template for event report.
    
    Parameters
    ----------
    event_title : str
        Event title
    summary : str
        Event summary
    num_participants : int
        Number of participants
    sdg_info : dict
        SDG info with keys: number, title, description (optional)
    ai_content : dict
        AI-generated content
    location : str, optional
        Event location
    
    Returns
    -------
    str
        Path to generated DOCX file
    """
    processor = InstitutionalTemplateProcessor()

    sdg_number = sdg_info.get('number', '')
    sdg_title = sdg_info.get('title', 'Not specified')
    sdg_description = sdg_info.get('description', '')

    context = {
        'EVENT_TITLE': f"Event Report: {event_title}",
        'DATE': datetime.now().strftime('%d-%m-%Y'),
        'VENUE': location or 'On Campus',
        'REF_NO': f"ACAS/DCA/RPT/{datetime.now().strftime('%Y%m%d')}",
        'OBJECTIVE': f"Event: {event_title}\nParticipants: {num_participants}\nSummary: {summary}",
        'AI_CONTENT': ai_content.get('introduction', '') + '\n' + ai_content.get('objectives', ''),
        'SDG_NUMBER': sdg_number,
        'SDG_TITLE': sdg_title,
        'SDG_DESCRIPTION': sdg_description,
        'OUTCOME': ai_content.get('outcome', ''),
        'FEEDBACK': ai_content.get('conclusion', '') + '\n\nImpact Assessment: Already detailed above',
    }

    return processor.process(context, output_filename=f"Report_{event_title.replace(' ', '_')}.docx")


if __name__ == '__main__':
    # Example usage
    sample_context = {
        'EVENT_TITLE': 'Annual Cultural Fest 2025',
        'DATE': '15-03-2025',
        'TIME': '10:00 AM',
        'VENUE': 'Main Auditorium',
        'REF_NO': 'ACAS/DCA/2025/ACF',
        'OBJECTIVE': 'To celebrate cultural diversity and promote student talents',
        'AI_CONTENT': 'The annual cultural festival is a platform for students to showcase their talents in various performing arts, visual arts, and cultural activities.',
        'TRAINER_LIST': 'Faculty Coordinators: Ms. A, Mr. B',
        'SDG_NUMBER': '4',
        'SDG_TITLE': 'Quality Education',
        'SDG_DESCRIPTION': 'This event promotes lifelong learning and inclusive education.',
        'OUTCOME': 'Students developed confidence, creativity, and teamwork skills.',
        'FEEDBACK': 'Highly successful event with positive feedback from all participants.',
    }

    processor = InstitutionalTemplateProcessor()
    output = processor.process(sample_context)
    print(f"✅ Document generated: {output}")
