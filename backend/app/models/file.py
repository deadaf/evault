from pydantic import BaseModel, validator
from datetime import datetime

__all__ = ("File",)


class File(BaseModel):
    fileId: int = 0
    name: str
    caseId: int
    fileAddress: str
    secretKey: str
    createdAt: str = None

    @validator("created_at", pre=True)
    def default_created_at(cls, v):
        return v or datetime.now().isoformat()
