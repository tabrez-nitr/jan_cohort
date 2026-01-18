from pydantic import BaseModel
from typing import List, Optional

class ConfidenceValue(BaseModel):
    value: str
    confidence: int

class SkillsValue(BaseModel):
    value: List[str]
    confidence: int

class ExperienceValue(BaseModel):
    text: str
    years: int
    confidence: int

class EducationValue(BaseModel):
    text: str
    confidence: int

class ProjectsValue(BaseModel):
    text: str
    confidence: int

class Resume(BaseModel):
    name: ConfidenceValue
    email: ConfidenceValue
    phone: ConfidenceValue
    skills: SkillsValue
    work_experience: ExperienceValue
    education: EducationValue
    projects: ProjectsValue
