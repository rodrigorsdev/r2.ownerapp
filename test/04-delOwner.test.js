const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - delOwner test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const ownerAddress1 = accounts[1];
    const noOwnerAddress = accounts[2];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async () => {
        contractInstance = await OwnerApp.new();
    });

    it('delOwner should throw if is not owner', async () => {
        await Assert.reverts(
            contractInstance.delOwner(ownerAddress1, { from: noOwnerAddress }),
            'address must be owner');
    });

    it('delOwner should throw if is not approved', async () => {
        await Assert.reverts(
            contractInstance.delOwner(ownerAddress1, { from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('delOwner should throw if owner not exists', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await Assert.reverts(
            contractInstance.delOwner(ownerAddress1, { from: ownerAddress0 }),
            'owner not exists');
    });

    it('delOwner should throw if quantOwner is greather than or equals to minApproval', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.changeMinApproval(2, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress1 });
        await Assert.reverts(
            contractInstance.delOwner(ownerAddress1, { from: ownerAddress0 }),
            'quantOwner must be equal or greater than minApproval');
    });

    it('delOwner should throw if addres try to remove yourself', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        await Assert.reverts(
            contractInstance.delOwner(ownerAddress0, { from: ownerAddress0 }),
            'address can not remove yourself');
    });

    it('delOwner success', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        var result = await contractInstance.delOwner(ownerAddress1, { from: ownerAddress0 });
        Assert.eventEmitted(result, 'OwnerDeleted');
    });
});