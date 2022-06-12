<<<<<<< HEAD
const hre = require("hardhat");
const ethers = hre.ethers;

// Run this command to deploy contract.
// npx hardhat run scripts/deploy.js --network mainnet
=======

const hre = require("hardhat");
>>>>>>> 97679f8d08126260ab2aa64e1530bad5322bd6f5

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
<<<<<<< HEAD

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ASOTT = await ethers.getContractFactory("ASignOfTheTimes");

    // The constructor layout baseURI, rootHash, Lead wallet address.
    // These 3 params should be placed into arguments.js this is used to verify our contract.
    // Unrevealed JSON ipfs://QmaUSmYpoD4SdnW8k9Pzsuz6s5bThTVRD12TYczB6oh6MB
    // Revealed JSON 
    const asott = await ASOTT.deploy("ipfs://QmaUSmYpoD4SdnW8k9Pzsuz6s5bThTVRD12TYczB6oh6MB/");
    await asott.deployed();

    console.log("A Sign Of The Times deployed to:", asott.address);
=======
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const ASSOTNFT = await hre.ethers.getContractFactory("ASignOfTheTimes");
    const assot = await ASSOTNFT.deploy("ipfs://Will-Simp-Watches-His-Wife-Get-Railed/");

    await assot.deployed();

    console.log("Assot Nft Deployed to:", assot.address);
>>>>>>> 97679f8d08126260ab2aa64e1530bad5322bd6f5
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
<<<<<<< HEAD
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
=======
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
>>>>>>> 97679f8d08126260ab2aa64e1530bad5322bd6f5
