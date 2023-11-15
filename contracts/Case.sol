// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Case {
    struct CaseInfo {
        uint caseId;
        string title;
        string description;
        uint caseType; // 1: Civil, 2: Criminal, 3: Family, 4: Labour, 5: Consumer, 6: Others
        uint status; // 1: Pending, 2: Ongoing, 3: Closed
        string ownerName;
        string ownerAddress;
        string ownerEmail;
        string ownerPhone;
        string ownerHomeAddress;
        string judgeName;
        string judgeAddress;
        string judgeEmail;
        string lawyerAddress;
        string createdAt;
    }

    mapping(uint => CaseInfo) public cases;

    constructor() {}

    function addCase(
        uint caseId,
        string memory title,
        string memory description,
        uint caseType,
        uint status,
        string memory ownerName,
        string memory ownerAddress,
        string memory ownerEmail,
        string memory ownerPhone,
        string memory ownerHomeAddress,
        string memory judgeName,
        string memory judgeAddress,
        string memory judgeEmail,
        string memory lawyerAddress,
        string memory createdAt
    ) public {
        require(cases[caseId].caseId == 0, "Case already exists");
        cases[caseId] = CaseInfo({
            caseId: caseId,
            title: title,
            description: description,
            caseType: caseType,
            status: status,
            ownerName: ownerName,
            ownerAddress: ownerAddress,
            ownerEmail: ownerEmail,
            ownerPhone: ownerPhone,
            ownerHomeAddress: ownerHomeAddress,
            judgeName: judgeName,
            judgeAddress: judgeAddress,
            judgeEmail: judgeEmail,
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
}
