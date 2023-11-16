from pydantic import BaseModel

__all__ = ("Case",)


class Case(BaseModel):
    caseId: int = 0
    title: str
    description: str
    caseType: int
    status: int

    ownerAddress: str
    judgeAddress: str
    lawyerAddress: str

    createdAt: str = None
