from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional, Any

router = APIRouter()

#  The "Brain" (Skill Taxonomy Database)
SKILL_TAXONOMY = {
    "HTML": {
        "category": "Frontend",
        "difficulty": "Easy",
        "time_months": 0.5,
        "prereqs": [],
        "completion_rate_percentage": 95
    },
    "JavaScript": {
        "category": "Frontend",
        "difficulty": "Medium",
        "time_months": 1.5,
        "prereqs": ["HTML"],
        "completion_rate_percentage": 82
    },
    "React": {
        "category": "Frontend",
        "difficulty": "Hard",
        "time_months": 2.0,
        "prereqs": ["JavaScript"],
        "completion_rate_percentage": 70
    },
    "Python": {
        "category": "Backend",
        "difficulty": "Easy",
        "time_months": 1.0,
        "prereqs": [],
        "completion_rate_percentage": 88
    },
    "FastAPI": {
        "category": "Backend",
        "difficulty": "Medium",
        "time_months": 1.0,
        "prereqs": ["Python"],
        "completion_rate_percentage": 75
    },
    "Docker": {
        "category": "DevOps",
        "difficulty": "Medium",
        "time_months": 1.0,
        "prereqs": ["Linux Basics"],
        "completion_rate_percentage": 65
    },
    "Kubernetes": {
        "category": "DevOps",
        "difficulty": "Hard",
        "time_months": 2.5,
        "prereqs": ["Docker"],
        "completion_rate_percentage": 45
    },
    "System Design": {
        "category": "Architecture",
        "difficulty": "Expert",
        "time_months": 3.0,
        "prereqs": ["Backend", "Database"],
        "completion_rate_percentage": 30
    }
}

# --- Pydantic Models ---
class Candidate(BaseModel):
    current_role: str
    current_skills: List[str]
    experience_years: int
    education: str

class TargetRole(BaseModel):
    title: str
    required_skills: List[str]
    typical_experience: str

class CareerPathRequest(BaseModel):
    candidate: Candidate
    target_role: TargetRole

class Analysis(BaseModel):
    matching_skills: List[str]
    missing_skills: List[str]
    skill_gap_percentage: float
    readiness_score: float
    estimated_learning_time_months: float

class RoadmapPhase(BaseModel):
    phase: int
    duration_months: float
    focus: str
    skills_to_learn: List[str]
    priority: str
    reasoning: str

class SimilarTransitions(BaseModel):
    success_rate: str
    avg_transition_time_months: float

class RoadmapResponse(BaseModel):
    analysis: Analysis
    learning_roadmap: List[RoadmapPhase]
    recommended_resources: List[str]
    similar_transitions: SimilarTransitions


# The Logic (Gap Analysis Algorithm)
def generate_roadmap(current_skills: List[str], target_skills: List[str]) -> RoadmapResponse:
    # Identify the Gap
    current_set = set(current_skills)
    target_set = set(target_skills)
    
    matching_skills = list(target_set.intersection(current_set))
    missing_skills = list(target_set - current_set)
    
    total_target = len(target_set)
    if total_target > 0:
        gap_percentage = (len(missing_skills) / total_target) * 100
    else:
        gap_percentage = 0.0

    # Enrich & Topological Sort
    enriched_missing = []
    for skill in missing_skills:
        details = SKILL_TAXONOMY.get(skill)
        if not details:
            enriched_missing.append({
                "skill": skill,
                "category": "General",
                "difficulty": "Unknown",
                "time_months": 1.0, 
                "prereqs": [],
            })
        else:
            enriched_missing.append({
                "skill": skill,
                **details
            })

    roadmap_phases = []
    pending = enriched_missing[:]
    current_phase_num = 1
    
    # Track completed so far (starts with current skills)
    # We only care about names for dependency checking
    completed_skills = set(current_skills)

    while pending:
        # Identify convertible skills this round
        this_phase_items = []
        remaining = []
        
        for item in pending:
            # Check prereqs
            prereqs = item.get("prereqs", [])
            is_ready = True
            for p in prereqs:
                if p not in completed_skills:
                    is_ready = False
                    break
            
            if is_ready:
                this_phase_items.append(item)
            else:
                remaining.append(item)
        
        if not this_phase_items and remaining:
            # Circular or blocked: Force break 1 item
            this_phase_items = [remaining[0]]
            remaining = remaining[1:]
        
        if this_phase_items:
            # Aggregate for this phase
            skills_names = [item["skill"] for item in this_phase_items]
            
            # Determine Focus (Majority category)
            categories = [item.get("category", "General") for item in this_phase_items]
            focus = max(set(categories), key=categories.count) if categories else "General Skills"
            
            # Determine Priority/Reasoning
            reasoning = f"Critical for {focus} mastery"
            priority = "High" if current_phase_num == 1 else "Medium"
            
            # Sum Duration
            phase_duration = sum([item.get("time_months", 1.0) for item in this_phase_items])
            
            roadmap_phases.append(RoadmapPhase(
                phase=current_phase_num,
                duration_months=phase_duration,
                focus=f"{focus} Foundations" if current_phase_num == 1 else f"Advanced {focus}",
                skills_to_learn=skills_names,
                priority=priority,
                reasoning=reasoning
            ))
            
            # Update completed set
            completed_skills.update(skills_names)
            current_phase_num += 1
            
        pending = remaining

    # 4. Final Estimates
    total_duration = sum([p.duration_months for p in roadmap_phases])
    readiness_score = max(0.0, 100.0 - gap_percentage)
    
    return RoadmapResponse(
        analysis=Analysis(
            matching_skills=matching_skills,
            missing_skills=missing_skills,
            skill_gap_percentage=round(gap_percentage, 1),
            readiness_score=round(readiness_score, 1),
            estimated_learning_time_months=total_duration
        ),
        learning_roadmap=roadmap_phases,
        recommended_resources=["Official Documentation", "Udemy: Full Stack Bootcamp", "FreeCodeCamp"],
        similar_transitions=SimilarTransitions(
            success_rate="75%",
            avg_transition_time_months=round(total_duration * 1.2, 1) # Mock logic
        )
    )


@router.post("/analyze", response_model=RoadmapResponse)
async def analyze_skills_gap(request: CareerPathRequest):
    return generate_roadmap(request.candidate.current_skills, request.target_role.required_skills)
