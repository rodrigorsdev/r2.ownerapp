const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - constructor test', (accounts) => {
    let contractInstance;
    const ownerAddress = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async() => {
        contractInstance = await OwnerApp.new();
    });

    it('initialize with array approval with address zero', async() => {
        const result = await contractInstance.owner(ownerAddress);
        assert.equal(result, true, 'owner is wrong at create');
    });

    it('initialize with minApproval equals 1', async() => {
        const result = await contractInstance.minApproval();
        assert.equal(result, 1, 'minApproval is wrong at create');
    });

    it('initialize with quantOwner equals 1', async() => {
        const result = await contractInstance.quantOwner();
        assert.equal(result, 1, 'minApproval is wrong at create');
    });
});