const TruffleFactory = artifacts.require("TruffleFactory");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
  deployer.deploy(TruffleFactory, MarketPlace.address);
};