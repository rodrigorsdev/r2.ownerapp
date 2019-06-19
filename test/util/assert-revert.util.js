module.exports = async(promise) => {
    try {
        console.log('----------' + message);

        await promise;
        assert.fail('Expected revert not received');
    } catch (error) {

        console.log('----------' + error.message);

        const revertFound = error.message.search('revert') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
    }
};