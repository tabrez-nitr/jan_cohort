from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from routers.upload import router as upload_router
from routers.skills import router as skills_router
# for data validation (like schema)

app = FastAPI()

# allow all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, # allow cookies
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message" : "welcome to the jan cohort api"}

# includes file upload route
app.include_router(upload_router)
app.include_router(skills_router, prefix="/api/skills", tags=["skills"])
    


