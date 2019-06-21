const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - resetAllApproval test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const noOwnerAddress = accounts[1];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async () => {
        contractInstance = await OwnerApp.new();
    });

    it('resetAllApproval should throw if is not owner', async () => {
        await Assert.reverts(
            contractInstance.resetAllApproval({ from: noOwnerAddress }),
            'address must be owner');
    });

    it('resetAllApproval should throw if is not approved', async () => {
        await Assert.reverts(
            contractInstance.resetAllApproval({ from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('resetAllApproval success', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        const resultAfterApproval = await contractInstance.arrayApproval(1);
        const resultLengthAfterapproval = await contractInstance.countApproval();
        await contractInstance.resetAllApproval({ from: ownerAddress0 });
        var resultLengthAfterReset = await contractInstance.countApproval();
        assert.equal(resultAfterApproval, ownerAddress0, 'resultAfterApproval is wrong');
        assert.equal(resultLengthAfterapproval, 1, 'resultLengthAfterapproval is wrong');
        assert.equal(resultLengthAfterReset, 0, 'resultLengthAfterReset is wrong');
    });
});