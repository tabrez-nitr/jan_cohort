from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import io
import re
from datetime import datetime


from models import Resume

router = APIRouter()

# --- Configuration ---
KNOWN_SKILLS = ["Python", "Java", "React", "Node.js", "FastAPI", "Docker", "Kubernetes", "SQL", "NoSQL", "AWS", "Git", "C++", "JavaScript"]

def extract_text_from_pdf(file_bytes):
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ""
            for page in pdf.pages:
                text += (page.extract_text() or "") + "\n"
            return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None

def extract_section(text, section_keywords):
    """
    Helper to grab text between a specific Header and the next blank line or next header.
    """
    lines = text.split('\n')
    capture = False
    content = []
    
    for line in lines:
        clean_line = line.strip().upper()
        
        # 1. Start capturing if we hit a header keyword (e.g., "EXPERIENCE")
        if any(keyword in clean_line for keyword in section_keywords):
            # strict check: header should be short (e.g. "WORK EXPERIENCE" not "I have experience in...")
            if len(clean_line) < 30: 
                capture = True
                continue # Skip the header line itself
        
        # 2. Stop capturing if we hit another likely header (e.g., "EDUCATION")
        # List of all common headers to detect "Stop" points
        common_headers = ["EDUCATION", "SKILLS", "PROJECTS", "EXPERIENCE", "WORK", "CERTIFICATIONS", "ACHIEVEMENTS"]
        if capture and any(header in clean_line for header in common_headers) and len(clean_line) < 30:
            break
            
        if capture:
            content.append(line.strip())
            
    return "\n".join(content)

def calculate_years_experience(exp_text):
    """
    Tries to find years (e.g., "2020 - 2022") and calculates total duration.
    """
    if not exp_text:
        return 0
        
    # Regex to find years like 2018, 2022
    years = re.findall(r'\b(20\d{2})\b', exp_text)
    
    if len(years) >= 2:
        # Convert to integers and sort
        year_ints = sorted([int(y) for y in years])
        # Simple math: Max Year - Min Year
        return year_ints[-1] - year_ints[0]
    elif len(years) == 1:
        # If only one year found (e.g., "2023"), assume < 1 year or current
        return 1
    return 0

def mock_parse_resume(text):
    data = {}
    
    # ---  Basic Fields (Name, Email, Phone) ---
    # (Same logic as before)
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    email_match = re.search(email_pattern, text)
    data["email"] = {"value": email_match.group(0) if email_match else "", "confidence": 100 if email_match else 0}

    phone_pattern = r'(?:\+91[-\s]?)?[6-9]\d{9}'
    phone_match = re.search(phone_pattern, text)
    data["phone"] = {"value": phone_match.group(0) if phone_match else "", "confidence": 95 if phone_match else 0}

    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        potential_name = lines[0]
        score = 85 if len(potential_name.split()) <= 3 else 40
        data["name"] = {"value": potential_name, "confidence": score}
    else:
        data["name"] = {"value": "", "confidence": 0}

    # ---  Skills Extraction ---
    found_skills = []
    for skill in KNOWN_SKILLS:
        if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE):
            found_skills.append(skill)
    data["skills"] = {"value": found_skills, "confidence": 90 if len(found_skills) > 2 else 50}


    # --- Work Experience (The Hard Part) ---
    # Step A: Extract the raw text block for "Experience"
    exp_text = extract_section(text, ["EXPERIENCE", "WORK HISTORY", "EMPLOYMENT"])
    
    # Step B: Calculate Years
    years = calculate_years_experience(exp_text)
    
    # Step C: Confidence Logic
    # If we found the section AND calculated years, we are very confident (90%)
    # If we found text but no dates, we are unsure (50%)
    # If text is empty, 0%
    if exp_text and years > 0:
        exp_conf = 90
    elif exp_text:
        exp_conf = 50  # Amber Alert: "We found text, but couldn't read the dates"
    else:
        exp_conf = 0
        
    data["work_experience"] = {
        "text": exp_text[:500], # Limit text length for DB
        "years": years,
        "confidence": exp_conf
    }


    # ---  Education Extraction ---
    edu_text = extract_section(text, ["EDUCATION", "QUALIFICATION", "ACADEMIC"])
    
    # Heuristic: Look for degree keywords
    degree_keywords = ["B.TECH", "M.TECH", "B.SC", "BACHELOR", "MASTER", "UNIVERSITY", "COLLEGE"]
    has_degree = any(k in edu_text.upper() for k in degree_keywords)
    
    data["education"] = {
        "text": edu_text[:500],
        "confidence": 85 if has_degree else (40 if edu_text else 0)
    }


    # ---  Projects Extraction ---
    proj_text = extract_section(text, ["PROJECTS", "PERSONAL PROJECTS"])
    
    data["projects"] = {
        "text": proj_text[:500],
        "confidence": 70 if len(proj_text) > 20 else 0
    }

    return data



@router.post("/api/upload")
async def upload_resume_endpoint(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF is supported.")

    content = await file.read()
    raw_text = extract_text_from_pdf(content)
    
    if not raw_text:
        raise HTTPException(status_code=400, detail="Could not extract text.")

    parsed_data = mock_parse_resume(raw_text)
    
    # Validate with Pydantic model
    try:
        resume_data = Resume(**parsed_data)
    except Exception as e:
        print(f"Validation Error: {e}")
        # In case of validation error, we can either raise HTTP error or return raw data.
        # For now, let's allow it but maybe with a warning, or strict validation?
        # Reverting to strict validation as before:
        raise HTTPException(status_code=500, detail="Error validating parsed data against schema.")

    # Return the validated data
    response_data = resume_data.dict()
    print(response_data)
    return response_data 

    