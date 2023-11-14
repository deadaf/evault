from fastapi import APIRouter, HTTPException
from app.interact import get_user_contract

router = APIRouter()


@router.get("/{wallet_address}")
async def get_user(wallet_address: str):
    """Get user info from blockchain"""
    try:
        user_contract = get_user_contract()
        user_info = user_contract.functions.getUserInfo(wallet_address).call()

        if not user_info["exists"]:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "walletAddress": user_info["walletAddress"],
            "name": user_info["name"],
            "email": user_info["email"],
            "userType": user_info["userType"],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/")
async def add_user(wallet_address: str, name: str, email: str, user_type: int):
    """Add a new user to the blockchain"""
    try:
        user_contract = get_user_contract()
        user_contract.functions.addUser(
            wallet_address, name, email, user_type
        ).transact()

        return {"message": "User added successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{wallet_address}")
async def update_user(wallet_address: str, name: str, email: str, user_type: int):
    """Update user information on the blockchain"""
    try:
        user_contract = get_user_contract()
        user_contract.functions.updateUser(
            wallet_address, name, email, user_type
        ).transact()

        return {"message": "User updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{wallet_address}")
async def delete_user(wallet_address: str):
    """Delete user from the blockchain"""
    try:
        user_contract = get_user_contract()
        user_contract.functions.deleteUser(wallet_address).transact()

        return {"message": "User deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{wallet_address}/is_lawyer")
async def is_lawyer(wallet_address: str):
    """Check if the user is a lawyer"""
    try:
        user_contract = get_user_contract()
        return {"isLawyer": user_contract.functions.isLawyer(wallet_address).call()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{wallet_address}/is_judge")
async def is_judge(wallet_address: str):
    """Check if the user is a judge"""
    try:
        user_contract = get_user_contract()
        return {"isJudge": user_contract.functions.isJudge(wallet_address).call()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
