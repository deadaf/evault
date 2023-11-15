// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Case {
    struct CaseInfo {
        uint caseId;
        string caseTitle;
        string judge;
        string lawyer;
        string client;
    }

    mapping(uint => CaseInfo) public cases;

    constructor() {}

    function addCase(
        uint caseId,
        string memory caseTitle,
        string memory judge,
        string memory lawyer,
        string memory client
    ) public {
        require(cases[caseId].caseId == 0, "Case already exists");
        cases[caseId] = CaseInfo({
            caseId: caseId,
            caseTitle: caseTitle,
            judge: judge,
            lawyer: lawyer,
            client: client
        });
    }

    function updateCase(
        uint caseId,
        string memory caseTitle,
        string memory judge,
        string memory lawyer,
        string memory client
    ) public {
        require(cases[caseId].caseId != 0);

        cases[caseId].caseTitle = caseTitle;
        cases[caseId].judge = judge;
        cases[caseId].lawyer = lawyer;
        cases[caseId].client = client;
    }

    function deleteCase(uint caseId) public {
        require(cases[caseId].caseId != 0);

        delete cases[caseId];
    }

    function getCaseInfo(uint caseId) public view returns (CaseInfo memory) {
        return cases[caseId];
    }

    function getJudge(uint caseId) public view returns (string memory) {
        return cases[caseId].judge;
    }

    function getLawyer(uint caseId) public view returns (string memory) {
        return cases[caseId].lawyer;
    }

    function getClient(uint caseId) public view returns (string memory) {
        return cases[caseId].client;
    }
}
