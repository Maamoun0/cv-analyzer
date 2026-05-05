from typing import Dict
from uuid import UUID
import logging

# In-memory storage for MVP (Session-only)
# In a real app, this would be Redis or a DB
session_credits: Dict[str, int] = {}

def get_remaining_credits(session_id: str) -> int:
    return session_credits.get(session_id, 2)

def use_credit(session_id: str) -> bool:
    current = get_remaining_credits(session_id)
    if current > 0:
        session_credits[session_id] = current - 1
        logging.info(f"Session {session_id} used a credit. Remaining: {session_credits[session_id]}")
        return True
    return False

def reset_credits(session_id: str):
    session_credits[session_id] = 2
