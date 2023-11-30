from fastapi import APIRouter, HTTPException, UploadFile, Depends
from fastapi.responses import StreamingResponse
from web3.exceptions import ContractLogicError

from app.interact import get_case_contract, get_file_contract
from app.models import Case, User, File
from app.utils import checks
from datetime import datetime, timedelta
import pyAesCrypt
import os
import secrets


router = APIRouter()


@router.get("/", response_model=list[Case])
async def get_all_cases(user: User = Depends(checks.is_user)):
    """
    Get all cases.
    """
    case_contract = get_case_contract()
    all_cases = case_contract.functions.getAllCases().call()

    cases = []
    for case in all_cases:
        case = dict(zip(Case.__annotations__.keys(), case))
        if any(
            [
                case["ownerAddress"] == user.walletAddress,
                case["judgeAddress"] == user.walletAddress,
                case["lawyerAddress"] == user.walletAddress,
            ]
        ):
            cases.append(case)

    return cases


@router.get("/{caseId}", response_model=Case)
async def get_case(caseId: int, user: User = Depends(checks.is_user)):
    """
    Get a case by Id.
    """

    case_contract = get_case_contract()
    case_info = case_contract.functions.getCaseInfo(caseId).call()

    if not case_info[0]:  # if caseId is 0 that means case does not exist.
        raise HTTPException(status_code=404, detail="Case not found.")

    if not any(
        [
            case_info[5] == user.walletAddress,
            case_info[6] == user.walletAddress,
            case_info[7] == user.walletAddress,
        ]
    ):
        raise HTTPException(status_code=401, detail="Unauthorized user.")

    # Convert the tuple to a dictionary
    return dict(zip(Case.__annotations__.keys(), case_info))


@router.put("/")
async def create_case(case: Case, user: User = Depends(checks.is_lawyer)):
    """
    Create a new case.
    """
    case_contract = get_case_contract()
    last_case_id = case_contract.functions.lastCaseId().call()
    print("Last Case ID: {}".format(last_case_id))

    if len({case.ownerAddress, case.lawyerAddress, case.judgeAddress}) != 3:
        raise HTTPException(
            status_code=401,
            detail="Client Address, Lawyer Address & Owner Address must all be unique.",
        )

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


@router.get("/{caseId}/files", response_model=list[File])
async def get_files_by_case(caseId: int, user: User = Depends(checks.is_user)):
    """Get a list of files associated with a case."""

    case_contract = get_case_contract()
    case_info = case_contract.functions.getCaseInfo(caseId).call()

    if not any(
        [
            case_info[5] == user.walletAddress,
            case_info[6] == user.walletAddress,
            case_info[7] == user.walletAddress,
        ]
    ):
        raise HTTPException(status_code=401, detail="Unauthorized user.")

    file_contract = get_file_contract()
    all_files = file_contract.functions.getAllFiles().call()

    case_files = []
    for file in all_files:
        file = dict(zip(File.__annotations__.keys(), file))

        print(file)
        if file["caseId"] == caseId:
            case_files.append(file)

    return case_files


@router.get("/{caseId}/files/{fileId}")
async def get_decrypted_file(
    caseId: int, fileId: int, user: User = Depends(checks.is_user)
):
    """
    Get the decrypted file from the blockchain.
    """
    case_contract = get_case_contract()
    case_info = case_contract.functions.getCaseInfo(caseId).call()

    if not any(
        [
            case_info[5] == user.walletAddress,
            case_info[6] == user.walletAddress,
            case_info[7] == user.walletAddress,
        ]
    ):
        raise HTTPException(status_code=401, detail="Unauthorized user.")

    file_contract = get_file_contract()
    file_info = file_contract.functions.getFileInfo(fileId).call()
    if any([file_info[0] == 0, file_info[2] != caseId]):
        raise HTTPException(status_code=404, detail="File not found.")

    bufferSize = 64 * 1024

    pyAesCrypt.decryptFile(
        file_info[3],
        f"./downloads/{file_info[1]}",
        file_info[4],
        bufferSize,
    )

    with open(f"./downloads/{file_info[1]}", "rb") as fIn:
        content = fIn.read()

    os.remove(f"./downloads/{file_info[1]}")

    return StreamingResponse(
        iter([content]),
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename={file_info[1]}"},
    )


@router.put("/{caseId}/files")
async def upload_a_file(
    caseId: int,
    file: UploadFile,
    user: User = Depends(checks.is_lawyer),
):
    """Add a new file to the blockchain."""

    case_contract = get_case_contract()
    case_info = case_contract.functions.getCaseInfo(caseId).call()

    if not case_info[0]:  # if caseId is 0 that means case does not exist.
        raise HTTPException(status_code=404, detail="Case not found.")

    if case_info[7] != user.walletAddress:
        raise HTTPException(status_code=401, detail="Unauthorized user.")

    content = await file.read()

    file_name = datetime.now().isoformat() + "~" + file.filename
    with open(f"./uploads/{file_name}", "wb") as fIn:
        fIn.write(content)

    bufferSize = 64 * 1024
    password = secrets.token_urlsafe(32)

    pyAesCrypt.encryptFile(
        f"./uploads/{file_name}",
        f"./uploads/{file_name}.aes",
        password,
        bufferSize,
    )

    os.remove(f"./uploads/{file_name}")

    file_contract = get_file_contract()
    file_contract.functions.uploadFile(
        file_name,
        caseId,
        "./uploads/{}.aes".format(file_name),
        password,
        datetime.now().isoformat(),
    ).transact()

    return {"status": "success"}
