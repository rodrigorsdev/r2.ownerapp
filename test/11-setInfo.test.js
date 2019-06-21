const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - setInfo test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async () => {
        contractInstance = await OwnerApp.new();
    });

    it('setInfo should throw if approvals is less then minimum', async () => {
        await Assert.reverts(
            contractInstance.setInfo('test info', { from: ownerAddress0 }),
            'current approvals is less then minimum');
    });

    it('setInfo success', async () => {
        const info = 'test info';
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.setInfo('test info', { from: ownerAddress0 });
        var result = await contractInstance.info.call();
        assert.equal(result, info, 'result is wrong');
    });

    it('clear approvals after setInfo success', async () => {
        const info = 'test info';
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.setInfo('test info', { from: ownerAddress0 });
        var result = await contractInstance.info.call();
        var resultCountApproval = await contractInstance.countApproval();
        assert.equal(result, info, 'result is wrong');
        assert.equal(resultCountApproval, 0, 'resultCountApproval is wrong');
    });
});