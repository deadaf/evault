// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract File {
    struct FileInfo {
        uint fileId;
        string fileName;
        string fileType;
        uint caseId;
        bytes32 fileHash; // SHA-256 hash of the file
        bool exists; // added member to track existence of file
    }

    mapping(uint => FileInfo) public files;

    constructor() {}

    function uploadFile(
        uint fileId,
        string memory fileName,
        string memory fileType,
        uint caseId,
        bytes32 fileHash
    ) public {
        require(!files[fileId].exists, "File already exists"); // check if file already exists

        files[fileId] = FileInfo({
            fileId: fileId,
            fileName: fileName,
            fileType: fileType,
            caseId: caseId,
            fileHash: fileHash,
            exists: true // set exists to true
        });
    }

    function downloadFile(uint fileId) public view returns (FileInfo memory) {
        require(files[fileId].exists, "File does not exist"); // check if file exists
        return files[fileId];
    }

    function deleteFile(uint fileId) public {
        require(files[fileId].exists, "File does not exist"); // check if file exists
        delete files[fileId];
    }

    function getFileHash(uint fileId) public view returns (bytes32) {
        require(files[fileId].exists, "File does not exist"); // check if file exists
        return files[fileId].fileHash;
    }

    function getCaseId(uint fileId) public view returns (uint) {
        require(files[fileId].exists, "File does not exist"); // check if file exists
        return files[fileId].caseId;
    }
}