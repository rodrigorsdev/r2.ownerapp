const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - changeMinApproval test', (accounts) => {
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

    it('changeMinApproval should throw if is not owner', async() => {
        await Assert.reverts(
            contractInstance.changeMinApproval(2, { from: noOwnerAddress }),
            'address must be owner');
    });

    it('changeMinApproval should throw if is not approved', async() => {
        await Assert.reverts(
            contractInstance.changeMinApproval(2, { from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('changeMinApproval should throw if min approval is less than owner', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await Assert.reverts(
            contractInstance.changeMinApproval(2, { from: ownerAddress0 }),
            'minApproval must be equal or less than quantOwner');
    });

    it('changeMinApproval success', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.changeMinApproval(2, { from: ownerAddress0 });
        var result = await contractInstance.minApproval();
        assert.equal(result, 2, 'minApproval is wrong');
    });
});