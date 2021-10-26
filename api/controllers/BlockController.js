const Web3 = require('web3');
const web3 = new Web3('https://polygon-rpc.com/');

module.exports = {
    getLatestBlock: async function (req, res) {
        let response;

        await web3.eth.getBlock('latest', true, (error, result) => { // TO DO: handle error
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.json(response);
    },

    getPendingBlocks: async function (req, res) {
        let response;

        await web3.eth.getBlock('pending', true, (error, result) => { // TO DO: handle error
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.json(response);
    },

    getBlockByIdentifier: async function (req, res) {
        let response;

        const searchArgument = req.params.id;

        console.log(searchArgument);
        console.log(searchArgument === null);
        console.log(searchArgument.startsWith('0x'));
        console.log(isNaN(parseInt(searchArgument)));

        // block hash starts with 0x; block number is digits only
        if (searchArgument === null ||
            (!searchArgument.startsWith('0x') && isNaN(parseInt(searchArgument)))) {
            return res.json("Invalid path.");
        }

        /* if it contains both chars and numbers and doesn't start with 0x (block hash),
         then it is invalid block number. For example: 1000a
         */
        if (searchArgument.match(/^(?=.*[A-Za-z])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/)) {
            if (!searchArgument.startsWith('0x')){
                return res.json("Invalid path.");
            }
        }

        await web3.eth.getBlock(searchArgument, true, (error, result) => { // TO DO: handle error
        }).then(value => {
            response = JSON.parse(JSON.stringify(value));
        });

        res.json(response);
    },

    getMultipleBlocksAfterThreshold: async function (req, res) {
        let response = [];
        let latestBlock;

        const blockNumberFrom = req.params.from;
        const count = req.params.count;

        if (count <= 0) {
            return res.json("Count cannot be negative.");
        } else if (isNaN(parseInt(blockNumberFrom))) {
            return res.json("Invalid block number.");
        }

        await web3.eth.getBlock('latest', false, (error, result) => { }).then(value => {
            latestBlock = JSON.parse(JSON.stringify(value));
        });

        const startBlockNumber = latestBlock.number - blockNumberFrom; // get latest block number for calculations
        const blockCount = count;

        let fetchedBlocks = [];

        for (let i = startBlockNumber; i >= startBlockNumber - blockCount; i--) {
            await web3.eth.getBlock(i, false, (error, result) => { }).then((value) => {
                fetchedBlocks.push(value);

                if (i == startBlockNumber - blockCount) {
                    response = JSON.parse(JSON.stringify(fetchedBlocks));
                }
            });
        }

        res.json(response);

    }
}