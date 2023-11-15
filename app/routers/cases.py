from fastapi import APIRouter, HTTPException
from web3.exceptions import ContractLogicError

from app.interact import get_case_contract
from app.models import Case
from datetime import datetime, timedelta

router = APIRouter()


@router.get("/{caseId}", response_model=Case)
async def get_case(caseId: int):
    """
    Get a case by Id.
    """

    case_contract = get_case_contract()
    case_info = case_contract.functions.getCaseInfo(caseId).call()

    if not case_info[0]:  # if caseId is 0 that means case does not exist.
        raise HTTPException(status_code=404, detail="Case not found.")

    # Convert the tuple to a dictionary
    return dict(zip(Case.__annotations__.keys(), case_info))


@router.put("/")
async def create_case(case: Case):
    """
    Create a new case.
    """
    case_contract = get_case_contract()
    last_case_id = case_contract.functions.lastCaseId().call()

    try:
        case_contract.functions.addCase(
            last_case_id + 1,
            case.title,
            case.description,
            case.caseType,
            case.status,
            case.ownerAddress,
            case.judgeAddress,
            case.lawyerAddress,
            str(datetime.utcnow() + timedelta(hours=5, minutes=30)),
        ).transact()

        return {"message": "Case created successfully"}

    except ContractLogicError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{caseId}")
async def delete_case(caseId: int):
    """
    Delete a case.
    """
    try:
        case_contract = get_case_contract()
        case_contract.functions.deleteCase(caseId).transact()

        return {"message": "Case deleted successfully"}

    except ContractLogicError as e:
        raise HTTPException(status_code=400, detail=str(e))
