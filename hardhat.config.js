require("@nomiclabs/hardhat-waffle");


// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  defaultNetwork: "ganache",
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      gasLimit: 6000000000,
      defaultBalanceEther: 10,
    },
  },
};
