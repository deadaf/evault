from fastapi import APIRouter, HTTPException
from app.interact import get_user_contract, get_case_contract
from app.models import User, Case
from web3.exceptions import ContractLogicError

router = APIRouter()


@router.get("/{walletAddress}", response_model=User)
async def get_user(walletAddress: str):
    """Get user info from blockchain"""

    user_contract = get_user_contract()
    user_info = user_contract.functions.getUserInfo(walletAddress).call()

    if not user_info[3]:  # if UserType is 0 that means user does not exist.
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "walletAddress": user_info[0],
        "name": user_info[1],
        "email": user_info[2],
        "userType": user_info[3],
    }


@router.put("/")
async def add_user(user: User):
    """Add a new user to the blockchain"""
    try:
        user_contract = get_user_contract()
        user_contract.functions.addUser(
            user.walletAddress, user.name, user.email, user.userType
        ).transact()

        return {"message": "User added successfully"}

    except ContractLogicError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{walletAddress}")
async def delete_user(walletAddress: str):
    """Delete user from the blockchain"""
    try:
        user_contract = get_user_contract()
        user_contract.functions.deleteUser(walletAddress).transact()

        return {"message": "User deleted successfully"}

    except ContractLogicError as e:
        raise HTTPException(status_code=400, detail=str(e))
