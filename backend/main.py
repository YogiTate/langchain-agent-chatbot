from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.engine import run_agent


app = FastAPI(
    title="LangChain Agent Backend",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class ChatRequest(BaseModel):
    sessionId: str
    prompt: str


@app.get("/")
def root():
    return {
        "message": "LangChain Backend Running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "provider": "ollama"
    }


@app.post("/api/chat")
async def chat(req: ChatRequest):

    return await run_agent(
        session_id=req.sessionId,
        user_input=req.prompt
    )