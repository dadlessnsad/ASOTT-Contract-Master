//SPDX License-Identifier: UNLICENSED

/// @title A Sign Of The Times
/// @author @GBERGPHOTO
/// @notice ASOTT is a photographic diary by Gregory Berg
/// @dev @0xORPHAN x @TRANSMENTAL
/*
 █████╗     ███████╗██╗ ██████╗ ███╗   ██╗        
██╔══██╗    ██╔════╝██║██╔════╝ ████╗  ██║        
███████║    ███████╗██║██║  ███╗██╔██╗ ██║        
██╔══██║    ╚════██║██║██║   ██║██║╚██╗██║        
██║  ██║    ███████║██║╚██████╔╝██║ ╚████║        
╚═╝  ╚═╝    ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝        
 ██████╗ ███████╗    ████████╗██╗  ██╗███████╗    
██╔═══██╗██╔════╝    ╚══██╔══╝██║  ██║██╔════╝    
██║   ██║█████╗         ██║   ███████║█████╗      
██║   ██║██╔══╝         ██║   ██╔══██║██╔══╝      
╚██████╔╝██║            ██║   ██║  ██║███████╗    
 ╚═════╝ ╚═╝            ╚═╝   ╚═╝  ╚═╝╚══════╝    
████████╗██╗███╗   ███╗███████╗███████╗           
╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝           
   ██║   ██║██╔████╔██║█████╗  ███████╗           
   ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║           
   ██║   ██║██║ ╚═╝ ██║███████╗███████║           
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝                                                                                      
*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract ASignOfTheTimes is ERC721A, ReentrancyGuard, Ownable {



    string public baseURI;

    address payable public GregoryBerg =
        payable(0x33602B325F169741662cD33C3F693Eee8dbD20D5);

    bool public paused = true;

    uint256 public nftPerAddress = 1;
    uint256 public maxSupply = 100;
    uint256 cost = 0.15 ether;

    mapping(address => uint256) public addressMintedBalance;

    constructor(string memory _initBaseURI)
        ERC721A("A Sign Of The Times", "ASSOT")
    {
        baseURI = _initBaseURI;
    }

    modifier unPaused() {
        require(!paused, "Contract paused");
        _;
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract.");
        _;
    }

    modifier isCorrectPayment(uint256 price, uint256 _amount) {
        require(cost * _amount >= msg.value, "Incorrect ETH value sent");
        _;
    }

    function developNFT(uint256 _amount)
        public
        payable
        unPaused
        callerIsUser
        isCorrectPayment(cost, _amount)
    {
        require((_amount + totalSupply()) <= maxSupply, "Sold Out");
        require(
            _amount + addressMintedBalance[msg.sender] <= nftPerAddress,
            "Can only has 1"
        );

        for (uint256 i = 1; i <= _amount; i++) {
            addressMintedBalance[msg.sender]++;
            _safeMint(msg.sender, _amount);
        }
    }


    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function togglePaused(bool _state) external onlyOwner {
        paused = _state;
    }

    function setMintCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    function setNftPerAddress(uint256 _nftPerAddress) external onlyOwner {
        nftPerAddress = _nftPerAddress;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = GregoryBerg.call{value: address(this).balance}("");
        require(success, "Failed to send to lead.");
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist.");
        return
            string(
                abi.encodePacked(baseURI, Strings.toString(_tokenId), ".json")
            );
    }
}

/*
 █████╗     ███████╗██╗ ██████╗ ███╗   ██╗        
██╔══██╗    ██╔════╝██║██╔════╝ ████╗  ██║  
███████║    ███████╗██║██║  ███╗██╔██╗ ██║        
██╔══██║    ╚════██║██║██║   ██║██║╚██╗██║        
██║  ██║    ███████║██║╚██████╔╝██║ ╚████║        
╚═╝  ╚═╝    ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝        
 ██████╗ ███████╗    ████████╗██╗  ██╗███████╗    
██╔═══██╗██╔════╝    ╚══██╔══╝██║  ██║██╔════╝    
██║   ██║█████╗         ██║   ███████║█████╗      
██║   ██║██╔══╝         ██║   ██╔══██║██╔══╝      
╚██████╔╝██║            ██║   ██║  ██║███████╗    
 ╚═════╝ ╚═╝            ╚═╝   ╚═╝  ╚═╝╚══════╝    
████████╗██╗███╗   ███╗███████╗███████╗           
╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝           
   ██║   ██║██╔████╔██║█████╗  ███████╗           
   ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║           
   ██║   ██║██║ ╚═╝ ██║███████╗███████║           
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝                                                                                      
*/
