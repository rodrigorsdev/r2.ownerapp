const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - addOwner test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const ownerAddress1 = accounts[1];
    const noOwnerAddress = accounts[2];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async() => {
        contractInstance = await OwnerApp.new();
    });

    it('addOwner should throw if is not owner', async() => {
        await Assert.reverts(
            contractInstance.addOwner(ownerAddress1, { from: noOwnerAddress }),
            'address must be owner');
    });

    it('addOwner should throw if is not approved', async() => {
        await Assert.reverts(
            contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('addOwner should throw if owner already exists', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await Assert.reverts(
            contractInstance.addOwner(ownerAddress0, { from: ownerAddress0 }),
            'owner exists');
    });

    it('addOwner success', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        var result = await contractInstance.quantOwner();
        assert.equal(result, 2, 'quantOwner is wrong');
    });
});