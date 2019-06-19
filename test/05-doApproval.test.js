const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - doApproval test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const ownerAddress1 = accounts[1];
    const noOwnerAddress = accounts[4];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async() => {
        contractInstance = await OwnerApp.new();
    });

    it('doApproval should throw if is not owner', async() => {
        await Assert.reverts(
            contractInstance.doApproval({ from: noOwnerAddress }),
            'address must be owner');
    });

    it('doApproval should throw if is not approved', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await Assert.reverts(
            contractInstance.doApproval({ from: ownerAddress0 }),
            'address already approved');
    });

    it('doApproval success', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        var result = await contractInstance.mapApproval.call(ownerAddress0);
        var listApproval = await contractInstance.listApproval();
        assert.equal(result, 1, 'mapApproval is wrong');
        assert.equal(listApproval[1], ownerAddress0, 'ownerAddress is wrong');
    });
});