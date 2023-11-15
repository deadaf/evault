from pydantic import BaseModel

__all__ = ("Case",)


class Case(BaseModel):
    caseId: int
    title: str
    description: str
    caseType: int
    status: int
    ownerName: str
    ownerAddress: str
    ownerEmail: str
    ownerPhone: str
    ownerHomeAddress: str

    judgeName: str
    judgeAddress: str
    judgeEmail: str

    lawyerAddress: str

    createdAt: str = None
