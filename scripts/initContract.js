const { getContractAddresses } = require("./getContractAddresses.js");
const { config } = require("./config.js");

async function setTrustedRemote() {
  const network = hre.network.name;
  console.log(`Running script on network: ${network}`);
  const contractName = "OmniCounter";
  const srcAddress = getContractAddresses(network, contractName)[contractName];
  console.log(`Source contract address on ${network}: ${srcAddress}`);
  const contract = await ethers.getContractAt(contractName, srcAddress);

  let dstAddress, dstChain;
  switch (network) {
    case "goerli":
      dstChain = "polygonMumbai";
      dstAddress = getContractAddresses(dstChain, contractName)[contractName];
      break;
    case "polygonMumbai":
      dstChain = "goerli";
      dstAddress = getContractAddresses(dstChain, contractName)[contractName];
      break;
    default:
      throw new Error(`Network ${network} not supported`);
  }
  console.log(`Destination contract address on ${dstChain}: ${dstAddress}`);

  const encodeRemoteAddressPath = hre.ethers.solidityPacked(
    ["address", "address"],
    [dstAddress, srcAddress]
  );
  const { dstChainId } = config[network];
  let res = await contract.setTrustedRemote(
    dstChainId,
    encodeRemoteAddressPath
  );
  console.log(`setTrustedRemote tx hash: ${res.hash}`);
  await res.wait();
}

setTrustedRemote().catch((err) => {
  console.log(err);
  process.exit(1);
});
