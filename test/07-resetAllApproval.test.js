const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - resetAllApproval test', (accounts) => {
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

    it('resetAllApproval should throw if is not owner', async() => {
        await Assert.reverts(
            contractInstance.resetAllApproval({ from: noOwnerAddress }),
            'address must be owner');
    });

    it('resetAllApproval should throw if is not approved', async() => {
        await Assert.reverts(
            contractInstance.resetAllApproval({ from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('resetAllApproval success', async() => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        var resultAfterApproval = await contractInstance.arrayApproval.call();
        // console.log('---------- resultAfterApproval: ' + resultAfterApproval);
        // await contractInstance.resetAllApproval({ from: ownerAddress0 });
    });

});