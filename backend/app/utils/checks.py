from fastapi import Header, HTTPException
from app.interact import get_user_contract
from app.models import User


async def is_user(walletAddress: str = Header()) -> User:
    """
    Check if the user is valid.
    """
    user_contract = get_user_contract()
    user_info = user_contract.functions.getUserInfo(walletAddress).call()
    if not user_info[3]:
        raise HTTPException(status_code=401, detail="Invalid user.")

    return dict(zip(User.__annotations__.keys(), user_info))
