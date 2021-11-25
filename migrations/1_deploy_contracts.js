const TruffleFactory = artifacts.require("TruffleFactory");

module.exports = async function (deployer) {
  await deployer.deploy(TruffleFactory)
  const truffleFactory = await TruffleFactory.deployed()
  console.log(truffleFactory.address)
};