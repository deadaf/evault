from pydantic import BaseModel, validator

__all__ = ("User",)


class User(BaseModel):
    wallet_address: str
    name: str
    email: str
    userType: int

    @validator("userType", pre=True)
    def check_userType(cls, v):
        v = int(v)
        if v not in [1, 2, 3]:
            raise ValueError("User type must be either 1 , 2 or 3")
        return v
