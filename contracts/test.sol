// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {

    address private owner;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        console.log("Owner contract deployed by:", msg.sender);
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
} 





// pragma solidity ^0.8.0;

// contract AssetRegistry {
//     struct Asset {
//         address owner;
//         string location;
//         string description;
//         uint256[] longitudes;
//         uint256[] latitudes;
//         bool isConflict;
//         bool hasLegalDocument;
//     }

//     uint256 public totalAssetsCounts;
//     mapping(address => Asset) public ownerAssets;
//     Asset[] public assetArray; // Array to store all assets

//     constructor() {
//         totalAssetsCounts = 0;
//     }

//     function assetExists(uint256[] memory _longitudes, uint256[] memory _latitudes) internal view returns (bool) {
//         // Check if an asset with the same longitudes and latitudes already exists
//         for (uint256 i = 0; i < assetArray.length; i++) {
//             Asset storage existingAsset = assetArray[i];
//             if (compareArrays(existingAsset.longitudes, _longitudes) && compareArrays(existingAsset.latitudes, _latitudes)) {
//                 return true; // Asset with the same longitudes and latitudes already exists
//             }
//         }
//         return false; // No matching asset found
//     }

//     function createAsset(
//         string memory _location,
//         string memory _description,
//         bool _hasLegalDocument,
//         uint256[] memory _longitudes,
//         uint256[] memory _latitudes
//     ) public {
//         require(!assetExists(_longitudes, _latitudes), "Asset with the same longitudes and latitudes already exists");

//         // Create a new Asset struct
//         Asset memory newAsset = Asset({
//             owner: msg.sender,
//             location: _location,
//             description: _description,
//             hasLegalDocument: _hasLegalDocument,
//             longitudes: _longitudes,
//             latitudes: _latitudes,
//             isConflict: false
//         });

//         // Store the new Asset in the landRegistry mapping using the sender's address as the key
//         ownerAssets[msg.sender] = newAsset;

//         // Push the new Asset to the assetArray
//         assetArray.push(newAsset);

//         // Increment the totalAssets count
//         totalAssetsCounts++;
//     }

//     function markAssetConflict() public {
//         Asset storage asset = ownerAssets[msg.sender];
//         require(asset.owner == msg.sender, "Only asset owner can mark asset as conflict");
//         require(asset.owner != address(0), "Asset not found");

//         // Update isConflict to true for the specified asset
//         asset.isConflict = true;

//         // Update isConflict for the corresponding asset in assetArray
//         for (uint256 i = 0; i < assetArray.length; i++) {
//             if (compareArrays(assetArray[i].longitudes, asset.longitudes) && compareArrays(assetArray[i].latitudes, asset.latitudes)) {
//                 assetArray[i].isConflict = true;
//                 break;
//             }
//         }
//     }

//     function getAllAssets() public view returns (Asset[] memory) {
//         return assetArray;
//     }

//     function getAssetByOwner(address _owner)
//         public
//         view
//         returns (
//             address owner,
//             string memory location,
//             string memory description,
//             bool hasLegalDocument,
//             uint256[] memory longitudes,
//             uint256[] memory latitudes,
//             bool isConflict
//         )
//     {
//         Asset storage asset = ownerAssets[_owner];
//         require(asset.owner != address(0), "Asset not found");

//         return (
//             asset.owner,
//             asset.location,
//             asset.description,
//             asset.hasLegalDocument,
//             asset.longitudes,
//             asset.latitudes,
//             asset.isConflict
//         );
//     }

//     // Helper function to compare two arrays of uint
//     function compareArrays(uint256[] memory arr1, uint256[] memory arr2) internal pure returns (bool) {
//         if (arr1.length != arr2.length) {
//             return false;
//         }
//         for (uint256 i = 0; i < arr1.length; i++) {
//             if (arr1[i] != arr2[i]) {
//                 return false;
//             }
//         }
//         return true;
//     }
// }

