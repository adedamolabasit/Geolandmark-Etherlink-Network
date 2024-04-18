const { ethers } = require("hardhat");

async function deployMyContract() {
  const [deployer] = await ethers.getSigners();
  const contractArguments = ['0x48C3762fF86e96559b5C09047b1Df5882160eB4C'];

  console.log("Deploying contract with the account:", deployer.address);

  // Get the ContractFactory for AssetRegistry
  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");

  const assetRegistry = await AssetRegistry.deploy();

  await assetRegistry.waitForDeployment();

  const GeoToken = await ethers.getContractFactory("GeolandMarkToken");

  const geoToken = await GeoToken.deploy(...contractArguments);

  console.log(geoToken.target,"geoTokenContractAddress")
  console.log(assetRegistry.target,"assetRegistryContractAddress")

}

deployMyContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
  // 0xeec5c2639C0DF7DeEf9d69D4741933dc7042d9c3 geoTokenContractAddress
  // 0x8dd5c67d093624c9A3779687651F3007646Bc231 assetRegistryContractAddress