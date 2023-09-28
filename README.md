# LayerZero Cross Message Tutorial

This is one example from LayerZero User Application example to demonstrate message sending.

OmniCounter.sol: is a classic example of a simple contract that increments a counter -- but there's a twist. This OmniCounter increments the counter on another chain.

## Guide

0. Set up the environments with yarn
   `yarn install`

1. Update the settings in .env.sample file. Change the .env.example filename to .env

   - DEPLOYER_PRIVATE_KEY to deploy smart contracts
   - TESTER_PRIVATE_KEY to send transaction to call smart contracts
   - GOERLI_RPC_URL and POLYGON_MUMBAI_RPC_URL the rpc urls on goerli or mumbai
   - ETHERSCAN_API_KEY and POL_ETHERSCAN_API_KEY to auto verify smart contract

2. Deploy the example contracts on goerli testnet and polygon testnet. Make sure the deployer have gas tokens on both chains

   - `npx hardhat --network polygonMumbai | goerli deploy`

3. Initialize the other settings of contracts

   - `npx hardhat run --network goerli | polygonMumbai scripts/initContracts.js`

4. Test the flow by running the below command.

   - `npx hardhat run --network goerli | polygonMumbai scripts/incrementCounter.js`

5. After send the transaction, you can use [LayerZeroScan](https://testnet.layerzeroscan.com/) to track the status of message transaction. Just search up the transaction hash from the execution transaction.
