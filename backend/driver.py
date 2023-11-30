# This is a driver script to create sample users and cases.

import asyncio
import logging
from datetime import datetime
from app.interact import (
    get_user_contract,
    get_case_contract,
    get_file_contract,
)

LAWYER_ADDRESS = "0x7B8B828C32a5b314998EeB839A647e8D469D0206"
JUDGE_ADDRESS = "0x6555d84C76d0D1F2575ebf020bEf234B588b69c8"
CLIENT_ADDRESS = "0x14c5A9Bc75d142970C5021537aBA29041FbFC8AA"

USERNAME = "rohit gahlyan"
EMAIL = "rohit@abc.xyz"

USER_TYPE = {
    "lawyer": 1,
    "judge": 2,
    "client": 3,
}


async def create_users():
    user_contract = get_user_contract()
    user_contract.functions.addUser(
        LAWYER_ADDRESS, USERNAME, EMAIL, USER_TYPE["lawyer"]
    ).transact()

    logging.info("Created Lawyer account.")

    user_contract.functions.addUser(
        JUDGE_ADDRESS, USERNAME, EMAIL, USER_TYPE["judge"]
    ).transact()

    logging.info("Created Judge account.")

    user_contract.functions.addUser(
        CLIENT_ADDRESS, USERNAME, EMAIL, USER_TYPE["client"]
    ).transact()

    logging.info("Created Client account.")


async def create_cases():
    case_contract = get_case_contract()
    last_case_id = case_contract.functions.lastCaseId().call()

    case_contract.functions.addCase(
        last_case_id + 1,
        "Sample Case 1",
        "This is a sample description for a sample case.",
        1,
        1,
        CLIENT_ADDRESS,
        JUDGE_ADDRESS,
        LAWYER_ADDRESS,
        datetime.now().isoformat(),
    ).transact()

    logging.info("Created Sample Case 1.")

    case_contract.functions.addCase(
        last_case_id + 2,
        "Sample Case 2",
        "This is a sample description for a sample case.",
        1,
        1,
        CLIENT_ADDRESS,
        JUDGE_ADDRESS,
        LAWYER_ADDRESS,
        datetime.now().isoformat(),
    ).transact()


async def main():
    await create_users()
    logging.info("Created users.")

    await create_cases()
    logging.info("Created cases.")

    logging.info("Done.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.close()
