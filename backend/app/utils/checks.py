from fastapi import Header, HTTPException, Depends
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

    return User(**dict(zip(User.__annotations__.keys(), user_info)))


async def is_lawyer(user: User = Depends(is_user)) -> User:
    """
    Check if the user is a lawyer.
    """
    if user.userType != 1:
        raise HTTPException(status_code=401, detail="User is not a Lawyer.")

    return user
