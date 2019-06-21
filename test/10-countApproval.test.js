const OwnerApp = artifacts.require('../contracts/OwnerApp');

contract('OwnerApp - countApproval test', (accounts) => {
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

    it('countApproval must return 0 if not exist approval', async () => {
        var result = await contractInstance.countApproval();
        assert.equal(result, 0, 'result is wrong');
    });

    it('countApproval must return number of approval', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        var result = await contractInstance.countApproval();
        assert.equal(result, 1, 'result is wrong');
    });
});