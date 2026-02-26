"""
services/ai_service.py — OpenAI-compatible content generation.

Generates four formal document sections:
  - introduction
  - objectives
  - outcome
  - conclusion

Falls back to structured placeholder text if the API key is not configured,
so the rest of the system remains functional during local development.
"""

from __future__ import annotations
import os
import json
from dotenv import load_dotenv

load_dotenv()

_API_KEY   = os.getenv("OPENAI_API_KEY", "")
_BASE_URL  = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
_MODEL     = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def _build_client():
    """Lazily build the OpenAI client only when a key is available."""
    if not _API_KEY or _API_KEY.startswith("sk-xxx"):
        return None
    try:
        from openai import OpenAI
        return OpenAI(api_key=_API_KEY, base_url=_BASE_URL)
    except ImportError:
        return None


def _fallback_content(doc_type: str, context: dict) -> dict:
    """Return placeholder sections when the AI service is unavailable."""
    title = context.get("title") or context.get("event_name", "the event")
    return {
        "introduction": (
            f"This {doc_type} pertains to '{title}'. "
            "It has been prepared by the department in accordance with institutional guidelines "
            "to formally communicate relevant information to all stakeholders."
        ),
        "objectives": (
            "• To enhance academic and co-curricular excellence among students.\n"
            "• To foster interdisciplinary learning and collaboration.\n"
            "• To align institutional activities with national and global quality benchmarks."
        ),
        "outcome": (
            "Participants will gain practical exposure, develop critical thinking skills, "
            "and contribute meaningfully to the academic community. "
            "The activity is expected to yield measurable improvements in student engagement."
        ),
        "conclusion": (
            "The institution remains committed to organizing high-quality programs that promote "
            "holistic development. This initiative reflects our vision of academic excellence "
            "and community engagement."
        ),
    }


def generate_content(doc_type: str, context: dict) -> dict:
    """
    Generate formal document sections using the configured AI model.

    Parameters
    ----------
    doc_type : str
        Human-readable label, e.g. 'circular', 'proposal', 'event report'.
    context : dict
        Key facts to ground the generation (title, department, objectives, etc.).

    Returns
    -------
    dict with keys: introduction, objectives, outcome, conclusion
    """
    client = _build_client()
    if client is None:
        return _fallback_content(doc_type, context)

    context_text = "\n".join(f"- {k}: {v}" for k, v in context.items() if v)

    prompt = f"""You are an expert academic writer for an Indian institution.
Generate FOUR formal sections for a {doc_type} document using the details below.

Context:
{context_text}

Return ONLY valid JSON in this exact format (no markdown fences):
{{
  "introduction": "<2–3 formal sentences>",
  "objectives":   "<bullet-point list, each line starting with •>",
  "outcome":      "<2–3 sentences describing expected outcomes>",
  "conclusion":   "<2–3 sentences formal closing>"
}}"""

    try:
        response = client.chat.completions.create(
            model=_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=800,
        )
        raw = response.choices[0].message.content.strip()

        # Strip accidental markdown fences
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        return json.loads(raw)

    except Exception as exc:
        print(f"[AI Service] Error: {exc} — using fallback content.")
        return _fallback_content(doc_type, context)
