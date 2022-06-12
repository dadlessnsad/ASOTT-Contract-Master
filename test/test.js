const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { isType } = require("graphql");
const { ethers } = require("hardhat");

describe("ASOTT test", function () {

    let ASOTT;
    let asott;
    let owner;
    let greg ="0x33602B325F169741662cD33C3F693Eee8dbD20D5";
    let addr1;
    let addr2;

    beforeEach(async function () {
        ASOTT = await ethers.getContractFactory('ASignOfTheTimes');
        [owner, addr1, addr2, greg, addr3] = await ethers.getSigners();

        asott = await ASOTT.deploy("ipfs://QmaUSmYpoD4SdnW8k9Pzsuz6s5bThTVRD12TYczB6oh6MB/");
        await asott.deployed();

        await asott.connect(owner).togglePaused(false);
    })

    describe('Deployment', function () {

        it("Should Set correct Owner", async function () {
            expect(await asott.owner()).to.eq(owner.address);
        })

        it("Should have Gregs address", async function () {
            expect(await asott.GregoryBerg()).to.eq("0x33602B325F169741662cD33C3F693Eee8dbD20D5");
        })

        it("Should allow owner to set BaseURI", async function () {
            const setBaseURI = await asott.connect(owner).setBaseURI("NewBASEURI");

            expect(await  asott.baseURI()).to.eq("NewBASEURI");
        })

        it("Should allow owner to set BaseExtension", async function () {
            const setBaseExtension = await asott.connect(owner).setBaseExtension(".Json");

            expect( await asott.baseExtension()).to.eq(".Json");
        })

        it("Should allow owner to set Mint Cost", async function () {
            const setMintCost = await asott.connect(owner).setMintCost(1)

            expect(await asott.cost()).to.eq(1)
        })

        it("Should allow owner to set Royalties ", async function () {
            const setRoyalties = await asott.connect(owner).setRoyalties(owner.address, 1000);

            console.log(await asott.royaltyInfo(1, 1000))
        })

        it("Should allow owner to set Nft Per Address", async function () {
            const setNFTPerAddress = await asott.connect(owner).setNftPerAddress(5);

            expect(await asott.nftPerAddress()).to.eq(5)
        })

        it("Should not allow users to set BaseURI", async function () {
            expect(asott.connect(addr1).setBaseURI("hi")).to.be.revertedWith('Ownable: caller is not the owner');
        })

        it("Should not allow users to set BaseExtension", async function () {
            expect(asott.connect(addr1).setBaseExtension(".FuckU")).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it("Should not allow users to set Mint Cost", async function () {
            expect(asott.connect(addr1).setMintCost(ethers.utils.parseEther("0.01"))).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it("Should not allow users to set Royalties ", async function () {
            expect(asott.connect(addr1).setRoyalties(addr1.address, 10000)).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it("Should not allow users to set Nft Per Address", async function () {
            expect(asott.connect(addr1).setNftPerAddress(5)).to.be.revertedWith('Ownable: caller is not the owner')
        })

        it("Should Fail mint if contract Paused", async function () {
            await asott.connect(owner).togglePaused(true);

            expect(asott.connect(addr1).developNFT(1, {
                value: ethers.utils.parseEther("0.15")
            })).to.be.revertedWith('Contract paused')
        })

        it("Should Fail mint if Not enough Ether value sent", async function () {
            expect(asott.connect(addr1).developNFT(1,{
                value: ethers.utils.parseEther("0.1")
            })).to.be.revertedWith('not enough ether value')
        })

        it("Should Fail mint if Trying to mint more than NftPerAddress", async function () {
            expect(asott.connect(addr1).developNFT(3, {
                value: ethers.utils.parseEther("0.45")
            })).to.be.revertedWith('can only has 2');
        })

        it("Should allow user to mint one", async function () {
            const mint = await asott.connect(addr1).developNFT(1, {
                value: ethers.utils.parseEther("0.15")
            })

            expect(await asott.totalSupply()).to.eq(1)
        })

        it("Should allow user to mint Two tokens", async function () {
            const mint = await asott.connect(addr1).developNFT(2, {
                value: ethers.utils.parseEther("0.3")
            })
            expect(await asott.totalSupply()).to.eq(2)
        })

        it("Should show correct TokenURI", async function () {
            const mint = await asott.connect(addr1).developNFT(1, {
                value: ethers.utils.parseEther("0.15")
            })
            console.log(await asott.tokenURI(1))
            expect(await asott.tokenURI(1)).to.eq("ipfs://QmaUSmYpoD4SdnW8k9Pzsuz6s5bThTVRD12TYczB6oh6MB/1")
        })


        it("Should give greg profits", async function () {
            const mint = await asott.connect(addr1).developNFT(1, {
                value: ethers.utils.parseEther("0.15")
            })
            console.log(greg.address)
            expect(await asott.connect(owner).withdraw()).to.changeEtherBalance(0x33602B325F169741662cD33C3F693Eee8dbD20D5, parseEther("0.15"))
        })



    })

})
