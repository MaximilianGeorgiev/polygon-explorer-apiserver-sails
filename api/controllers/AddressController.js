const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

module.exports = {
    getAccountBalance: async function (req, res) {
        let response;

        const address = req.params.address;

        if (address === null || !address.startsWith('0x')) {
            return res.json("Invalid address.");
        }

        await web3.eth.getBalance(address).then(value => {
            response = JSON.parse(JSON.stringify(web3.utils.fromWei(value)));
        });

        return res.json(response);
    }
}
