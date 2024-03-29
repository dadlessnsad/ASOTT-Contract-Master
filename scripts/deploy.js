const hre = require("hardhat");
const ethers = hre.ethers;

// Run this command to deploy contract.
// npx hardhat run scripts/deploy.js --network mainnet

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ASOTT = await ethers.getContractFactory("ASignOfTheTimes");

    // The constructor layout baseURI, rootHash, Lead wallet address.
    // These 3 params should be placed into arguments.js this is used to verify our contract.
    // Unrevealed JSON ipfs://Qma6gAUZxAY6xPZGZY2gHN5Wj3u8KGLoVbbBt4Msrpjeuu/
    // Revealed JSON ipfs://QmWZ8HV6eUi83Q6HLq4gKwHPZHkRbHEjamYXp4Kzyqcpoe/
    const asott = await ASOTT.deploy("ipfs://Qma6gAUZxAY6xPZGZY2gHN5Wj3u8KGLoVbbBt4Msrpjeuu/");
    await asott.deployed();

    console.log("A Sign Of The Times deployed to:", asott.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});