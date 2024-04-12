// // SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract AssetRegistry{


    struct Asset  {
        string location;
        string description;
        uint256[] longitudes;
        uint256[] latitudes;
        bool hasLegalDocument;
    }
    Asset[] public Registry;
    mapping(address => Asset[]) UserAssets;


    function createAsset(string memory _location, string memory _description, uint256[] memory _long, uint256[] memory _lat , bool _hasLegalDocument) public {
        Asset memory assets =  Asset({
            location: _location,
            description: _description,
            longitudes: _long,
            latitudes: _lat,
            hasLegalDocument: _hasLegalDocument
        });

         Registry.push(assets);
    }

    function retrieveAllAsset() public view returns(Asset[] memory) {
         return Registry;
    }
    function retrieveAnAsset() public view returns(Asset[] memory) {
         return Registry;
    }

}
