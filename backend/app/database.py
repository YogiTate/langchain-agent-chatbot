from typing import Dict, List
from langchain_core.messages import BaseMessage

session_memory: Dict[str, List[BaseMessage]] = {}


def get_history(session_id: str):
    return session_memory.setdefault(session_id, [])


def save_messages(session_id: str, messages: List[BaseMessage]):
    session_memory.setdefault(session_id, []).extend(messages)