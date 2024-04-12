const  { ethers } =  require("hardhat");


const retrieveAllAssets = async () => {
  try {
    const contractAddress = "0x5359bAe7654ED1C646d4E7d9801AD423bfc27DCf"; // Address of deployed AssetRegistry contract
    const signer = (await ethers.getSigners())[0]; // Get the first signer account

    // Attach to the deployed contract
    const assetRegistry = new ethers.Contract(
      contractAddress,
      [
        // ABI of AssetRegistry contract (include necessary functions)
        "function retrieveAllAsset() view returns (tuple(string, string, uint256[], uint256[], bool)[])"
      ],
      signer
    );

    // Retrieve all existing assets
    const assets = await assetRegistry.retrieveAllAsset();
    console.log("Existing Assets:");
    assets.forEach((asset) => {
      console.log(
        `Location: ${asset[0]}, Description: ${
          asset[1]
        }, Longitudes: [${asset[2].join(", ")}], Latitudes: [${asset[3].join(
          ", "
        )}], Has Legal Document: ${asset[4]}`
      );
    });
  } catch (error) {
    console.error("Retrieve all assets error:", error);
    process.exitCode = 1;
  }
};

const createNewAsset = async (loct, desc, long, lat, hasLegalDocs) => {
  try {
    const contractAddress = "0x5359bAe7654ED1C646d4E7d9801AD423bfc27DCf"; // Address of deployed AssetRegistry contract
    const signer = (await ethers.getSigners())[0]; // Get the first signer account

    // Attach to the deployed contract
    const assetRegistry = new ethers.Contract(
      contractAddress,
      [
        // ABI of AssetRegistry contract (include necessary functions)
        "function createAsset(string memory _location, string memory _description, uint256[] memory _long, uint256[] memory _lat, bool _hasLegalDocument) public"
      ],
      signer
    );

    // Create a new asset
    const loct = "New Location";
    const desc = "New Description";
    const long = [12345, 67890];
    const lat = [54321, 98765];
    const hasLegalDocs = true;

    const tx = await assetRegistry.createAsset(
      loct,
      desc,
      long,
      lat,
      hasLegalDocs
    );
    await tx.wait(); // Wait for transaction to be mined

    console.log("Asset created successfully!");
  } catch (error) {
    console.error("Create new asset error:", error);
    process.exitCode = 1;
  }
};

// Uncomment the function you want to call
retrieveAllAssets();
// createNewAsset();
