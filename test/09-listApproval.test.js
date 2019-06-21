const OwnerApp = artifacts.require('../contracts/OwnerApp');

contract('OwnerApp - listApproval test', (accounts) => {
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

    it('listApproval return everyone who approved', async () => {
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.addOwner(ownerAddress1, { from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress0 });
        await contractInstance.doApproval({ from: ownerAddress1 });

        var result = await contractInstance.listApproval();

        var resultCheck0 = await contractInstance.checkApproval(ownerAddress0);
        var resultCheck1 = await contractInstance.checkApproval(ownerAddress1);
        var resultCheck2 = await contractInstance.checkApproval(noOwnerAddress);

        const resultApproval0 = await contractInstance.arrayApproval(resultCheck0);
        const resultApproval1 = await contractInstance.arrayApproval(resultCheck1);

        assert.notEqual(resultCheck0, 0, 'resultCheck01 is wrong');
        assert.notEqual(resultCheck1, 0, 'resultCheck02 is wrong');
        assert.equal(resultCheck2, 0, 'resultCheck03 is wrong');
        assert.equal(resultApproval0, ownerAddress0, 'resultApproval0 is wrong');
        assert.equal(resultApproval1, ownerAddress1, 'resultApproval1 is wrong');
        assert.equal(result.length, 3, 'result legth is wrong');
    });
});