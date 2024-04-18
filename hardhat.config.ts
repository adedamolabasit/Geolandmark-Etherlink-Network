require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      gas: 100,
      gasPrice: 5000000000,
      timeout: 30000,
      chainId: 128123,
    },
  },
};
