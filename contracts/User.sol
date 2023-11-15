// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract User {
    struct UserInfo {
        string walletAddress;
        string name;
        string email;
        uint userType; // 1 = lawyer, 2 = judge, 3 = client
    }

    mapping(string => UserInfo) public users;

    constructor() {}

    function addUser(
        string memory walletAddress,
        string memory name,
        string memory email,
        uint userType
    ) public {
        require(users[walletAddress].userType == 0, "User already exists");
        users[walletAddress] = UserInfo({
            walletAddress: walletAddress,
            name: name,
            email: email,
            userType: userType
        });
    }

    function updateUser(
        string memory walletAddress,
        string memory name,
        string memory email,
        uint userType
    ) public {
        require(users[walletAddress].userType != 0);

        users[walletAddress].name = name;
        users[walletAddress].email = email;
        users[walletAddress].userType = userType;
    }

    function deleteUser(string memory walletAddress) public {
        require(users[walletAddress].userType != 0);

        delete users[walletAddress];
    }

    function getUserInfo(
        string memory walletAddress
    ) public view returns (UserInfo memory) {
        return users[walletAddress];
    }

    function isLawyer(string memory walletAddress) public view returns (bool) {
        return users[walletAddress].userType == 1;
    }

    function isJudge(string memory walletAddress) public view returns (bool) {
        return users[walletAddress].userType == 2;
    }
}
