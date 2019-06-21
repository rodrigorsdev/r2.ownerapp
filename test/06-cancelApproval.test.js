const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - cancelApproval test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const noOwnerAddress = accounts[1];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async () => {
        contractInstance = await OwnerApp.new();
    });

    it('cancelApproval should throw if is not owner', async () => {
        await Assert.reverts(
            contractInstance.cancelApproval({ from: noOwnerAddress }),
            'address must be owner');
    });

    it('cancelApproval should throw if is not owner', async () => {
        await Assert.reverts(
            contractInstance.cancelApproval({ from: ownerAddress0 }),
            'address not approved yet');
    });

    it('cancelApproval success', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        var resultAfterApproval = await contractInstance.mapApproval.call(ownerAddress0);
        await contractInstance.cancelApproval({ from: ownerAddress0 });
        var resultAfterCancelApproval = await contractInstance.mapApproval.call(ownerAddress0);
        assert.equal(resultAfterApproval, 1, 'resultAfterApproval is wrong');
        assert.equal(resultAfterCancelApproval, 0, 'resultAfterCancelApproval is wrong');
    });
});