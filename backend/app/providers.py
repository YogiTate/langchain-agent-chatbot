from langchain_ollama import ChatOllama
from langchain_openai import ChatOpenAI

from app.config import settings


def get_ollama_model():

    return ChatOllama(
        model="qwen2.5:1.5b",
        temperature=0
    )


def get_nvidia_model():

    if not settings.NVIDIA_API_KEY:
        raise ValueError(
            "NVIDIA_API_KEY is not configured."
        )

    return ChatOpenAI(
        model=settings.NVIDIA_MODEL,
        api_key=settings.NVIDIA_API_KEY,
        base_url=settings.NVIDIA_BASE_URL,
        temperature=0
    )


def get_model(provider: str):

    provider = provider.lower().strip()

    if provider == "ollama":
        return get_ollama_model()

    if provider == "nvidia":
        return get_nvidia_model()

    raise ValueError(
        f"Unsupported AI provider: {provider}"
    )