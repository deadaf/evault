// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Case {
    struct CaseInfo {
        uint caseId;
        string caseTitle;
        string judge;
        string lawyer;
        string client;
        bool exists; // add exists member
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
        require(!cases[caseId].exists);
        cases[caseId] = CaseInfo({
            caseId: caseId,
            caseTitle: caseTitle,
            judge: judge,
            lawyer: lawyer,
            client: client,
            exists: true // set exists to true
        });
    }

    function updateCase(
        uint caseId,
        string memory caseTitle,
        string memory judge,
        string memory lawyer,
        string memory client
    ) public {
        require(cases[caseId].exists);

        cases[caseId].caseTitle = caseTitle;
        cases[caseId].judge = judge;
        cases[caseId].lawyer = lawyer;
        cases[caseId].client = client;
    }

    function deleteCase(uint caseId) public {
        require(cases[caseId].exists);

        delete cases[caseId];
        cases[caseId].exists = false; // set exists to false
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
