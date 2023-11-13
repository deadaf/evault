// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract User {
    struct UserInfo {
        address walletAddress;
        string name;
        string email;
        uint userType; // 1 = lawyer, 2 = judge, 3 = client
        bool exists; // added exists variable
    }

    mapping(address => UserInfo) public users;

    constructor() {}

    function addUser(
        address walletAddress,
        string memory name,
        string memory email,
        uint userType
    ) public {
        require(!users[walletAddress].exists, "User already exists");
        users[walletAddress] = UserInfo({
            walletAddress: walletAddress,
            name: name,
            email: email,
            userType: userType,
            exists: true // set exists to true
        });
    }

    function updateUser(
        address walletAddress,
        string memory name,
        string memory email,
        uint userType
    ) public {
        require(users[walletAddress].exists);

        users[walletAddress].name = name;
        users[walletAddress].email = email;
        users[walletAddress].userType = userType;
    }

    function deleteUser(address walletAddress) public {
        require(users[walletAddress].exists);

        delete users[walletAddress];
    }

    function getUserInfo(
        address walletAddress
    ) public view returns (UserInfo memory) {
        return users[walletAddress];
    }

    function isLawyer(address walletAddress) public view returns (bool) {
        return users[walletAddress].userType == 1;
    }

    function isJudge(address walletAddress) public view returns (bool) {
        return users[walletAddress].userType == 2;
    }
}
