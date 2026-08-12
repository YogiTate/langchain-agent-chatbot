from typing import Dict, List

from langchain_core.messages import BaseMessage


# =========================================================
# SESSION MEMORY
# =========================================================

session_memory: Dict[
    str,
    List[BaseMessage]
] = {}


# =========================================================
# GET HISTORY
# =========================================================

def get_history(
    session_id: str
) -> List[BaseMessage]:

    return session_memory.setdefault(
        session_id,
        []
    )


# =========================================================
# SAVE MESSAGES
# =========================================================

def save_messages(
    session_id: str,
    messages: List[BaseMessage]
):

    session_memory.setdefault(
        session_id,
        []
    ).extend(messages)