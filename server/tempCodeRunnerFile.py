from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
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

from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

app = FastAPI()

# ---------------- DATABASE ----------------
DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    email = Column(String, unique=True)
    phone = Column(String)
    password = Column(String)

Base.metadata.create_all(bind=engine)

# ---------------- PASSWORD ----------------
pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

# ---------------- JWT ----------------
SECRET_KEY = "hackathon_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ---------------- LOGOUT STORAGE ----------------
# (In-memory, perfect for hackathon)
revoked_tokens = set()

# ---------------- HOME ----------------
@app.get("/")
def home():
    return {"message": "Backend running"}

# ---------------- SIGNUP (NO JSON) ----------------
@app.post("/signup")
def signup(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    password: str = Form(...)
):
    db = SessionLocal()

    if db.query(User).filter(User.name == name).first():
        db.close()
        raise HTTPException(status_code=400, detail="Name already exists")

    if db.query(User).filter(User.email == email).first():
        db.close()
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        name=name,
        email=email,
        phone=phone,
        password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.close()

    return {"message": "Signup successful"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = db.query(User).filter(User.name == form_data.username).first()

    if not user or not verify_password(form_data.password, user.password):
        db.close()
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.name})
    db.close()

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ---------------- CURRENT USER ----------------
def get_current_user(token: str = Depends(oauth2_scheme)):
    if token in revoked_tokens:
        raise HTTPException(status_code=401, detail="Token revoked (logged out)")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username, token
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------------- PROTECTED ROUTE ----------------
@app.get("/profile")
def profile(data: tuple = Depends(get_current_user)):
    user, _ = data
    return {
        "message": "This data is protected",
        "user": user
    }

# ---------------- LOGOUT ----------------
@app.post("/logout")
def logout(data: tuple = Depends(get_current_user)):
    _, token = data
    revoked_tokens.add(token)
    return {"message": "Logged out successfully"}


