const OwnerApp = artifacts.require("OwnerApp");

module.exports = function(deployer) {
    deployer.deploy(OwnerApp);
};