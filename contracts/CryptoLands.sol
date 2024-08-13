// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CryptoLands is ERC721, Ownable, ERC721URIStorage  {
       constructor() ERC721("CryptoLands", "CYD") Ownable(msg.sender) {}

    // Modifier to check if the caller is the land inspector
    modifier onlyLandInspector() {
        require(msg.sender == owner(), "Caller is not the land inspector");
        _;
    }
       function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view  override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
// QmZGCZH9KRCSU2SzWbwoEQgqQPrFnH4zZEFvYfRYfdUeEu
// QmQLTeuWfMMNw7muGfBqwccHfhj9hA8VjjsyixTQXzPkW5
// QmSVga8yRaFAaFgep7JYGM2eXaVVtQGFGMQPQp2GcH8uHm
// QmbX3iQEsqJDVymhUGjXhXv7VLvNC52D3wWDiwJ1nSTiEx
// QmYtYXLD3UD5i4sPYeMe5fczdV7dKT9Zy2R2gFqQwvPUQB
    struct Property {
        address owner;
        uint256 Price;
        string detailsCID;
        bool verified;
        bool saleStatus;
        uint256 tokenID;//this is the reg id
        string ownerName;
        string ownerCnic;
    }

    struct TokenizedProperty {
        address owner;
        uint256 Price;
        string detailsCID;
        bool verified;
        bool saleStatus;
        uint256 tokenID;
        string ownerName;
        string ownerCnic;
    }

    mapping(uint256 => Property) public properties;   //both registered and unregistered properties 
    mapping(uint256 => TokenizedProperty) public TokenizedProperties; //registered properties only 
    mapping (uint256 => uint256) public RegIDtoTokenID;
    mapping(uint256 => bool) private _propertyApprovalStatus;
    mapping(string => bool) private _usedCIDs;
    mapping(uint256 => bool) public PropertyStatus_available;
     uint256 private _RegID;
uint256 private _nextTokenId;
    event PropertyRegistered(uint256 indexed tokenId, address indexed owner);
    event PropertyApproved(uint256 indexed tokenId);
    event PropertyRejected(uint256 indexed tokenId,string  message);
    event PropertySold(uint256 indexed tokenId, address indexed newOwner);

    modifier propertyAvailable(uint256 tokenId) {
        require(PropertyStatus_available[tokenId], "Property is not available for sale");
        _;
    }

    function registerProperty(string memory propertyURI, uint256 _price, string memory _name, string memory _cnic) public returns (uint256) {
        require(!_usedCIDs[propertyURI], "Property with this CID already exists");
     
        address propOwner = msg.sender;
        bool _verified = false;
        bool _saleStatus = false;
        uint256 RegID = _RegID++;
        properties[RegID] = Property(propOwner, _price, propertyURI, _verified, _saleStatus, RegID, _name, _cnic); 
        PropertyStatus_available[RegID] = true;
        emit PropertyRegistered(RegID, propOwner);
        return RegID;
        
    }
    //sets the property for sale
    function sell(uint256 tokenId) public   {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this property");
        require(_propertyApprovalStatus[tokenId], "Property has not been approved yet");
        PropertyStatus_available[tokenId]=true;
        
          properties[tokenId].saleStatus=true;
           TokenizedProperties[tokenId].saleStatus=true;
    
        
    }

    function _BuyProperty(uint256 tokenId,string memory _buyername,string memory _buyercnic) public  payable {
      address buyer = msg.sender;
    address payable seller = payable(ownerOf(tokenId));
    // Ensure the buyer is not the owner of the property
    require(ownerOf(tokenId) != buyer, "You can't buy your own property");
    // Ensure the property has been approved for sale
    require(_propertyApprovalStatus[tokenId]==true, "Property has not been approved yet");
  require(PropertyStatus_available[tokenId]==true,"NOT FOR SALE");
    // Ensure the buyer sent enough funds to purchase the property
    require(msg.value >= properties[tokenId].Price, "Insufficient funds to buy this property");

// approving buyer to sell the token id 
     _approve(buyer, tokenId, seller);
//escrow mechanisim
    // Transfer funds to the seller
    // Transfer token from seller to buyer
    seller.transfer(msg.value); //msg.value
    safeTransferFrom(seller, buyer, tokenId);
   //sold properties availibity setting to false
updatePropertyStatus(tokenId, buyer, false);
    // Emit event for property sold

TokenizedProperties[tokenId] = TokenizedProperty(buyer, TokenizedProperties[tokenId].Price, TokenizedProperties[tokenId].detailsCID, true, false, tokenId, _buyername, _buyercnic);
        


    emit PropertySold(tokenId, buyer);
}

function updatePropertyStatus(uint256 tokenId, address newOwner, bool newSaleStatus) private {
        properties[tokenId].owner = newOwner;
        properties[tokenId].saleStatus = newSaleStatus;
    }
  
//land Inspector
    function approveProperty(uint256 Reg_ID) public onlyLandInspector {
        require(properties[Reg_ID].owner != address(0), "Property does not exist");
        uint256 tokenId = _nextTokenId++;
        _mint(properties[Reg_ID].owner, tokenId);
        // properties[Reg_ID].tokenID = tokenId;
        TokenizedProperties[tokenId] = TokenizedProperty(properties[Reg_ID].owner, properties[Reg_ID].Price, properties[Reg_ID].detailsCID, true, false, tokenId, properties[Reg_ID].ownerName, properties[Reg_ID].ownerCnic);
       properties[Reg_ID] = Property( properties[Reg_ID].owner,  properties[Reg_ID].Price,  properties[Reg_ID].detailsCID , true, false, Reg_ID, properties[Reg_ID].ownerName, properties[Reg_ID].ownerCnic); 
        _setTokenURI(tokenId, properties[Reg_ID].detailsCID);
         _propertyApprovalStatus[tokenId] = true;
        RegIDtoTokenID[tokenId]=Reg_ID;
Cidstatus(properties[Reg_ID].detailsCID);
        // emit PropertyApproved(tokenId);


    }
    function Cidstatus(string memory PropertURI) private {
         _usedCIDs[PropertURI] = true;
    }


function RejectProperty(uint256 Reg_ID) public onlyLandInspector {
    require(properties[Reg_ID].owner != address(0), "Property does not exist");
    require(properties[Reg_ID].verified == false, "The property has already been verified");
    
    // Reset the values of the property
    properties[Reg_ID].owner = address(0);
    properties[Reg_ID].Price = 0;
    // properties[Reg_ID].detailsCID = "";
   
    properties[Reg_ID].tokenID = 0;
    properties[Reg_ID].ownerName = "";
    properties[Reg_ID].ownerCnic = "";

    // Emit event for property rejection
    emit PropertyRejected(Reg_ID, "Your property has not valid information");
}


    function getAllProperties() public view returns (Property[] memory) {
        Property[] memory allProperties = new Property[](_RegID);
        for (uint256 i = 0; i < _RegID; i++) {
            allProperties[i] = properties[i];
        }
        return allProperties;
    }
     function getTokenizedProperties() public view returns (TokenizedProperty[] memory) {
        TokenizedProperty[] memory allProperties = new TokenizedProperty[](_nextTokenId);
        for (uint256 i = 0; i < _nextTokenId; i++) {
            allProperties[i] = TokenizedProperties[i];
        }
        return allProperties;
    }


    function updatePropertyDetails(uint256 tokenId, string memory UpdatedCid) public  {
        require(msg.sender==ownerOf(tokenId));
        address propOwner = ownerOf(tokenId);
        uint256 regId= RegIDtoTokenID[tokenId];
        TokenizedProperties[tokenId] = TokenizedProperty(propOwner, TokenizedProperties[tokenId].Price, UpdatedCid, true, false, tokenId, TokenizedProperties[tokenId].ownerName, TokenizedProperties[tokenId].ownerCnic);
        properties[regId] = Property(propOwner, TokenizedProperties[tokenId].Price, UpdatedCid, true, false, regId, TokenizedProperties[tokenId].ownerName, TokenizedProperties[tokenId].ownerCnic);
      _usedCIDs[UpdatedCid]=true;
        _setTokenURI(tokenId, UpdatedCid);  
    }

    function OwnedProperties(address owner) public view returns (TokenizedProperty[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _RegID; i++) {
            if (TokenizedProperties[i].owner == owner) {
                count++;
            }
        }
        TokenizedProperty[] memory ownedProperties = new TokenizedProperty[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _RegID; i++) {
            if (TokenizedProperties[i].owner == owner) {
                ownedProperties[index] = TokenizedProperties[i];
                index++;
            }
        }
        return ownedProperties;
    }
}
