const hre = require("hardhat");
const { config } = require("../scripts/config.js");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const network = hre.network.name;
  console.log("Deploying to network: ", network);

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { endpoint } = config[network];

  await deploy("OmniCounter", {
    from: deployer,
    args: [endpoint],
    log: true,
  });
};
const name = `OmniCounterOn${network}`;
module.exports.tags = [name];
