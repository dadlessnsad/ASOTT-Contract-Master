const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ASSOT test", function () {

  let ASSOT;
  let assot;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    ASSOT = await ethers.getContractFactory('ASignOfTheTimes');
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    assot = await ASSOT.deploy("Ipfs://gfdhgf/");
    await assot.deployed();

  })

  describe('Deployment', function () {

    it("should set right owner", async function () {
      expect(await assot.owner()).to.be.equal(owner.address);
    });

    it("should set paused false", async function () {
      const pause = await assot.togglePaused(false);

      expect(await assot.paused()).to.equal(false);
    });

    it("should fail mint cause paused", async function () {
      expect(assot.connect(addr1).developNFT(1, {
        value: ethers.utils.parseEther('0.15')
      })).to.be.revertedWith('Contract paused')
    });

    it("should allow mint", async function () {
      const pause = await assot.togglePaused(false);

      const mint = await assot.connect(addr1).developNFT(1, {
        value: ethers.utils.parseEther("0.15")
      })

      expect(await assot.totalSupply()).to.equal(1);
    })

    it("should only allow one mint", async function () {
      const pause = await assot.togglePaused(false);

      const mint = await assot.connect(addr1).developNFT(1, {
        value: ethers.utils.parseEther("0.15")
      })

      expect(assot.connect(addr1).developNFT(1, {
        value: ethers.utils.parseEther('0.15')
      })).to.be.revertedWith('one NFT Per Address');

    })

    it("Should fail if wrong value sent", async function () {
      const pause = await assot.togglePaused(false);

      expect(assot.connect(addr1).developNFT(1, {
        value: ethers.utils.parseEther('0.12')
      })).to.be.revertedWith('Incorrect ETH value sent');

    })
    

  })
})
