const User = artifacts.require("User");
const Case = artifacts.require("Case");
const File = artifacts.require("File");

module.exports = function (deployer) {
	deployer.deploy(User);
	deployer.deploy(Case);
	deployer.deploy(File);
};
