from fastapi import APIRouter, HTTPException
from app.interact import get_file_contract
from app.models import File

router = APIRouter()


@router.get("/{fileId}", response_model=File)
async def get_file(fileId: str):
    """Get a file by Id."""
    file_contract = get_file_contract()
    file_info = file_contract.functions.getFileInfo(fileId).call()

    if not file_info[0]:  # if fileId is 0 that means file does not exist.
        raise HTTPException(status_code=404, detail="File not found.")

    # Convert the tuple to a dictionary
    return dict(zip(File.__annotations__.keys(), file_info))


@router.put("/")
async def upload_a_file(file: File):
    """Add a new file to the blockchain."""
    ...
