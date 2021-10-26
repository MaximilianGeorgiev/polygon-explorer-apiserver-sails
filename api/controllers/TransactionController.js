const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

module.exports = {
    getLatestTransaction: async function (req, res) {
        let response;
        let latestBlock;

        await web3.eth.getBlock('latest', true, () => { })
            .then(value => {
                latestBlock = JSON.parse(JSON.stringify(value));
            });

        const transactionsCount = latestBlock.transactions.length - 1; // last TX
        const blockNumber = latestBlock.number;

        await web3.eth.getTransactionFromBlock(blockNumber, transactionsCount).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.send(response);
    },

    getPendingTransactions: async function (req, res) {
        let response;

        await web3.eth.getPendingTransactions().then((value) => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.send(response);
    },

    getTransactionByHash: async function (req, res) {
        let response = {};

        const hash = req.params.hash;

        if (hash === null || !hash.startsWith('0x')) {
            return res.json("Invalid hash.");
        }

        await web3.eth.getTransaction(hash).then((value) => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.send(response);
    },

    getAddressTxCount: async function (req, res) {
        let response = {};

        const address = req.params.address;

        if (address === null || !address.startsWith('0x')) {
            return res.json("Invalid address.");
        }

        await web3.eth.getTransactionCount(address).then((value) => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.json(response);
    }
}