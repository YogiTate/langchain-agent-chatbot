from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.engine import run_agent


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="LangChain Agent Backend",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

ALLOWED_ORIGINS = [
    # Local frontend
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Render frontend
    "https://langchain-agent-chatbot-frontend.onrender.com",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODEL
# =========================================================

class ChatRequest(BaseModel):
    session_id: str
    message: str
    provider: str = "ollama"


# =========================================================
# ROOT
# =========================================================

@app.get("/")
async def root():

    return {
        "message": "LangChain Backend Running"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/api/health")
async def health():

    return {
        "status": "healthy",
        "service": "LangChain Agent Backend",
        "providers": [
            "ollama",
            "nvidia"
        ]
    }


# =========================================================
# CHAT
# =========================================================

@app.post("/api/chat")
async def chat(req: ChatRequest):

    result = await run_agent(
        session_id=req.session_id,
        user_input=req.message,
        provider=req.provider
    )

    return result