// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Case {
    struct CaseInfo {
        uint caseId;
        string title;
        string description;
        uint caseType; // 1: Civil, 2: Criminal, 3: Family, 4: Labour, 5: Consumer, 6: Others
        uint status; // 1: Pending, 2: Ongoing, 3: Closed
        string ownerAddress;
        string judgeAddress;
        string lawyerAddress;
        string createdAt;
    }

    mapping(uint => CaseInfo) public cases;
    uint public lastCaseId;

    constructor() {}

    function addCase(
        uint caseId,
        string memory title,
        string memory description,
        uint caseType,
        uint status,
        string memory ownerAddress,
        string memory judgeAddress,
        string memory lawyerAddress,
        string memory createdAt
    ) public {
        require(cases[caseId].caseId == 0, "Case already exists");
        lastCaseId++;

        cases[caseId] = CaseInfo({
            caseId: caseId,
            title: title,
            description: description,
            caseType: caseType,
            status: status,
            ownerAddress: ownerAddress,
            judgeAddress: judgeAddress,
            lawyerAddress: lawyerAddress,
            createdAt: createdAt
        });
    }

    function deleteCase(uint caseId) public {
        require(cases[caseId].caseId != 0);

        delete cases[caseId];
    }

    function getCaseInfo(uint caseId) public view returns (CaseInfo memory) {
        return cases[caseId];
    }

    function getLastCaseId() public view returns (uint) {
        return lastCaseId;
    }

    function getAllCases() public view returns (CaseInfo[] memory) {
        CaseInfo[] memory caseList = new CaseInfo[](lastCaseId);

        for (uint i = 1; i <= lastCaseId; i++) {
            caseList[i - 1] = cases[i];
        }

        return caseList;
    }
}
