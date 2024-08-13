const CryptoLands = artifacts.require("../contracts/CryptoLands.sol");

module.exports = function (deployer) {
  deployer.deploy(CryptoLands);
};
