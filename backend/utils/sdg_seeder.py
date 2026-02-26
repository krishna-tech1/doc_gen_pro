"""
utils/sdg_seeder.py — seeds the sdg_goals table with all 17 UN SDGs.
Called once at application startup; skips if data already exists.
"""

from sqlalchemy.orm import Session
from models import SDGGoal

SDG_DATA = [
    (1,  "No Poverty",
     "End poverty in all its forms everywhere by 2030."),
    (2,  "Zero Hunger",
     "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture."),
    (3,  "Good Health and Well-being",
     "Ensure healthy lives and promote well-being for all at all ages."),
    (4,  "Quality Education",
     "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."),
    (5,  "Gender Equality",
     "Achieve gender equality and empower all women and girls."),
    (6,  "Clean Water and Sanitation",
     "Ensure availability and sustainable management of water and sanitation for all."),
    (7,  "Affordable and Clean Energy",
     "Ensure access to affordable, reliable, sustainable, and modern energy for all."),
    (8,  "Decent Work and Economic Growth",
     "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all."),
    (9,  "Industry, Innovation and Infrastructure",
     "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation."),
    (10, "Reduced Inequalities",
     "Reduce inequality within and among countries."),
    (11, "Sustainable Cities and Communities",
     "Make cities and human settlements inclusive, safe, resilient and sustainable."),
    (12, "Responsible Consumption and Production",
     "Ensure sustainable consumption and production patterns."),
    (13, "Climate Action",
     "Take urgent action to combat climate change and its impacts."),
    (14, "Life Below Water",
     "Conserve and sustainably use the oceans, seas and marine resources for sustainable development."),
    (15, "Life on Land",
     "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and biodiversity loss."),
    (16, "Peace, Justice and Strong Institutions",
     "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels."),
    (17, "Partnerships for the Goals",
     "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development."),
]


def seed_sdg_goals(db: Session) -> None:
    """Insert all 17 SDG goals if the table is empty."""
    if db.query(SDGGoal).count() > 0:
        return  # already seeded

    for number, name, description in SDG_DATA:
        db.add(SDGGoal(number=number, name=name, description=description))

    db.commit()
    print("[Seeder] SDG goals seeded successfully.")
