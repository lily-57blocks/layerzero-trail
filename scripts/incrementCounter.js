const { getContractAddresses } = require("./getContractAddresses.js");
const { config } = require("./config.js");

async function incrementCounter() {
  const network = hre.network.name;
  console.log(`Running script on network: ${network}`);
  const contractName = "OmniCounter";
  const contractAddress = getContractAddresses(network, contractName)[
    contractName
  ];
  console.log(`Contract address on ${network}: ${contractAddress}`);
  const contract = await ethers.getContractAt(contractName, contractAddress);
  const { dstChainId } = config[network];
  const estFees = await contract.estimateFee(dstChainId, false, "0x");
  const nativeRelayerFee = estFees[0];
  console.log(`nativeRelayerFee: ${nativeRelayerFee}`);
  let res = await contract.incrementCounter(dstChainId, {
    value: `${nativeRelayerFee}`,
  });
  console.log(`incrementCounter tx hash: ${res.hash}`);
  await res.wait();
}

async function getCounter() {
  const network = hre.network.name;
  console.log(`Running script on network: ${network}`);
  const contractName = "OmniCounter";
  const contractAddress = getContractAddresses(network, contractName)[
    contractName
  ];
  console.log(`Contract address on ${network}: ${contractAddress}`);
  const contract = await ethers.getContractAt(contractName, contractAddress);
  const counter = await contract.counter();
  console.log(`counter: ${counter}`);
}

incrementCounter().catch((err) => {
  console.log(err);
  process.exit(1);
});
