// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract File {
    struct FileInfo {
        uint fileId;
        string name;
        uint caseId;
        string fileAddress;
        string secretKey;
        string createdAt;
    }

    mapping(uint => FileInfo) public files;
    uint public lastFileId;

    constructor() {}

    function uploadFile(
        uint fileId,
        string memory name,
        uint caseId,
        string memory fileAddress,
        string memory secretKey,
        string memory createdAt
    ) public {
        require(files[fileId].fileId == 0, "File already exists"); // check if file already exists

        files[fileId] = FileInfo({
            fileId: fileId,
            name: name,
            caseId: caseId,
            fileAddress: fileAddress,
            secretKey: secretKey,
            createdAt: createdAt
        });
    }

    function getFileInfo(uint fileId) public view returns (FileInfo memory) {
        require(files[fileId].fileId != 0, "File does not exist"); // check if file exists
        return files[fileId];
    }

    function deleteFile(uint fileId) public {
        require(files[fileId].fileId != 0, "File does not exist"); // check if file exists
        delete files[fileId];
    }

    function getLastFileId() public view returns (uint) {
        return lastFileId;
    }

    function getAllFiles() public view returns (FileInfo[] memory) {
        FileInfo[] memory fileList = new FileInfo[](lastFileId);

        for (uint i = 1; i <= lastFileId; i++) {
            fileList[i - 1] = files[i];
        }

        return fileList;
    }
}
