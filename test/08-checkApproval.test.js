const OwnerApp = artifacts.require('../contracts/OwnerApp');

contract('OwnerApp - checkApproval test', (accounts) => {
    let contractInstance;
    const ownerAddress0 = accounts[0];
    const noOwnerAddress = accounts[1];

    before(() => {
        web3.eth.defaultAccount = ownerAddress0;
    });

    beforeEach(async () => {
        contractInstance = await OwnerApp.new();
    });

    it('checkApproval return 0 if not approved', async () => {
        var result = await contractInstance.checkApproval(noOwnerAddress);
        assert.equal(result, 0, 'result is wrong');
    });

    it('checkApproval return index position if approved', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        var result = await contractInstance.checkApproval(ownerAddress0);
        assert.equal(result, 1, 'result is wrong');
    });
});