const { ethers } = require("hardhat");

async function deployMyContract() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Get the ContractFactory for AssetRegistry
  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");

  // Deploy the contract
  const assetRegistry = await AssetRegistry.deploy();
  // Wait for deployment to be confirmed
  await assetRegistry.waitForDeployment();

  console.log(assetRegistry,"yeyy>>")

  console.log("AssetRegistry deployed to:", ``);
}

deployMyContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
