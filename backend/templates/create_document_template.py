from docxtpl import DocxTemplate
from fastapi import APIRouter

router = APIRouter()

@router.post("/generate-circular")
def generate_circular(data: dict):

    doc = DocxTemplate("templates/circular_template.docx")

    context = {
        "REF_NO": "ACAS/BCA/EXT/25-26",
        "DATE": data["date"],
        "TITLE": data["title"],
        "TIME": data["time"],
        "VENUE": data["venue"],
        "DEPARTMENT": data["department"],
        "CHIEF_GUEST": data.get("chief_guest", "")
    }

    doc.render(context)

    file_path = "generated_circular.docx"
    doc.save(file_path)

    return {"file_url": file_path}