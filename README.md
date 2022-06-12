#A Sign Of The Time Contract

##Contracts Functions
    
    modifier unPaused()
    - Checks the state of paused reverts if contract is paused.

    modifier callerIsUSer()
    - Only allows EOA to mint from contract
    - stops contracts from spam minting

    developNFT()
    -Takes a param of amount of tokens
    -Mints a Asott token to msg.sender

    mapping addressMintedBalance
    -Tracks how many tokens a address has minted.

    setBaseURI()
    -Allows owner to change the contracts baseURI

    togglePaused()
    -Allows owner to change paused state of contract

    setMintCost()
    -Allows owner to change the mint cost for each token

    setNftPerAddress()
    -Allows owner to change the amount of tokens a address can mint.

    setRoyalties()
    -Allows owner to change the Royalties address and value

    withdraw()
    -Allows owner of contract to withdraw funds to Gregs address 

    tokenURI()
    -Endpoint to Images

    stateTokenId()
    -Override function to start indexing token count @ 1 instead of 0

##Deploy Instructions

    1.  Install deps, run in terminal  ``npm i``
    2.  Double check tests run in terminal 
        ``npx hardhat compile``
        ``npx hardhat test``
        ``npx hardhat coverage``

        -Then you can check test on a web browser by opening *coverage/index.html*
        
    3.  Set all ENV vars in a .env file
    4.  to deploy run in terminal 
            ``npx hardhat --network mainnet run scripts/deploy.js``

    5.  To verify contract run in terminal after contract has been deployed
            ``npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "ipfs://Qma6gAUZxAY6xPZGZY2gHN5Wj3u8KGLoVbbBt4Msrpjeuu/" ``
