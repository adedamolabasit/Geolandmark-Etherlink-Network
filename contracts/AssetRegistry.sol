// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Registry {
    struct Asset {
        address owner;
        string location;
        string description;
        uint256[] longitudes;
        uint256[] latitudes;
        bool isConflict;
        bool hasLegalDocument;
    }

    uint256 public totalAssetsCounts;
    mapping(address => Asset) public ownerAssets;
    Asset[] public assetArray; // Array to store all assets

    constructor() {
        totalAssetsCounts = 0;
    }

    function assetExists(
        uint256[] memory _longitudes,
        uint256[] memory _latitudes
    ) internal view returns (bool) {
        // Iterate through all registered assets to check for existence of same longitudes and latitudes
        for (uint256 i = 0; i < totalAssetsCounts; i++) {
            Asset storage existingAsset = assetArray[i];
            if (
                compareArrays(existingAsset.longitudes, _longitudes) &&
                compareArrays(existingAsset.latitudes, _latitudes)
            ) {
                return true; // Asset with the same longitudes and latitudes already exists
            }
        }
        return false; // No matching asset found
    }

    function createAsset(
        string memory _location,
        string memory _description,
        bool _hasLegalDocument,
        uint256[] memory _longitudes,
        uint256[] memory _latitudes
    ) public {
        require(
            !assetExists(_longitudes, _latitudes),
            "Asset with the same longitudes and latitudes already exists"
        );

        // Create a new Asset struct
        Asset memory newAsset = Asset({
            owner: msg.sender,
            location: _location,
            description: _description,
            hasLegalDocument: _hasLegalDocument,
            longitudes: _longitudes,
            latitudes: _latitudes,
            isConflict: false
        });

        // Store the new Asset in the landRegistry mapping using the sender's address as the key
        ownerAssets[msg.sender] = newAsset;

        // Push the new Asset to the assetArray
        assetArray.push(newAsset);

        // Increment the totalAssets count
        totalAssetsCounts++;
    }

    function markAssetConflict(address _owner) public {
        require(
            msg.sender == _owner,
            "Only asset owner can mark asset as conflict"
        );
        require(ownerAssets[_owner].owner != address(0), "Asset not found");

        // Update isConflict to true for the specified asset in landRegistry
        ownerAssets[_owner].isConflict = true;

        // Update isConflict to true for the specified asset in assetArray
        for (uint256 i = 0; i < assetArray.length; i++) {
            if (assetArray[i].owner == _owner) {
                assetArray[i].isConflict = true;
                break;
            }
        }
    }

    function getAllAssets() public view returns (Asset[] memory) {
        return assetArray;
    }

    function getAssetByOwner(address _owner)
        public
        view
        returns (
            address owner,
            string memory location,
            string memory description,
            bool hasLegalDocument,
            uint256[] memory longitudes,
            uint256[] memory latitudes,
            bool isConflict
        )
    {
        Asset storage asset = ownerAssets[_owner];
        return (
            asset.owner,
            asset.location,
            asset.description,
            asset.hasLegalDocument,
            asset.longitudes,
            asset.latitudes,
            asset.isConflict
        );
    }

    // Helper function to compare two arrays of uint
    function compareArrays(uint256[] memory arr1, uint256[] memory arr2)
        internal
        pure
        returns (bool)
    {
        if (arr1.length != arr2.length) {
            return false;
        }
        for (uint256 i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
}
