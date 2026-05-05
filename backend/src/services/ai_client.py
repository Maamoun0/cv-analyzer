import asyncio
import logging
from typing import Callable, Any

async def with_retry(func: Callable, max_retries: int = 3, initial_delay: float = 1.0) -> Any:
    """
    Executes a function with exponential backoff retry logic.
    """
    retries = 0
    delay = initial_delay
    
    while retries < max_retries:
        try:
            return await func()
        except Exception as e:
            retries += 1
            if retries == max_retries:
                logging.error(f"Failed after {max_retries} attempts: {e}")
                raise
            
            logging.warning(f"Attempt {retries} failed. Retrying in {delay}s... Error: {e}")
            await asyncio.sleep(delay)
            delay *= 2  # Exponential backoff
