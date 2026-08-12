import os

from dotenv import load_dotenv


load_dotenv()


class Settings:

    # =====================================================
    # NVIDIA
    # =====================================================

    NVIDIA_API_KEY = os.getenv(
        "NVIDIA_API_KEY",
        ""
    )

    NVIDIA_BASE_URL = (
        "https://integrate.api.nvidia.com/v1"
    )

    NVIDIA_MODEL = os.getenv(
        "NVIDIA_MODEL",
        "z-ai/glm-5.2"
    )


    # =====================================================
    # GOOGLE
    # =====================================================

    GOOGLE_API_KEY = os.getenv(
        "GOOGLE_API_KEY",
        ""
    )


    # =====================================================
    # STORAGE
    # =====================================================

    CHROMA_DB_DIR = os.getenv(
        "CHROMA_DB_DIR",
        "./chroma_db"
    )

    UPLOAD_DIR = os.getenv(
        "UPLOAD_DIR",
        "./uploads"
    )


settings = Settings()


# =========================================================
# CREATE DIRECTORIES
# =========================================================

os.makedirs(
    settings.CHROMA_DB_DIR,
    exist_ok=True
)

os.makedirs(
    settings.UPLOAD_DIR,
    exist_ok=True
)