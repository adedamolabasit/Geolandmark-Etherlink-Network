import "@nomicfoundation/hardhat-toolbox";
// import 'dotenv/config';


export const config =  {
  solidity: "0.8.24",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.MY_PRIVATE_KEY],
    }
  }
};


module.exports = {
  solidity: {
    version: "0.8.24", // Specify the Solidity compiler version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
