
const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    const ASSOTNFT = await hre.ethers.getContractFactory("ASignOfTheTimes");
    const assot = await ASSOTNFT.deploy("ipfs://Will-Simp-Watches-His-Wife-Get-Railed/");

    await assot.deployed();

    console.log("Assot Nft Deployed to:", assot.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
