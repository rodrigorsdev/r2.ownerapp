const OwnerApp = artifacts.require('../contracts/OwnerApp');
const Assert = require('truffle-assertions');

contract('OwnerApp - addOwner test', (accounts) => {
    let contractInstance;
    const ownerAddress = accounts[0];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async() => {
        contractInstance = await OwnerApp.new();
    });

    it('addOwner should throw if is not owner', async() => {

    });

    it('addOwner should throw if is not approved', async() => {

    });

    it('addOwner should throw if owner already exists', async() => {

    });
});