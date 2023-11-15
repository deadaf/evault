from pydantic import BaseModel

__all__ = ("File",)


class File(BaseModel):
    fileId: int = 0
    name: str
    caseId: int
    fileAddress: str
    secretKey: str
    createdAt: str
