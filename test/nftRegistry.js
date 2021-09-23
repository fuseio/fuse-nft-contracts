const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NftRegistry', () => {
    let registry, mockNft, addr1
    
    beforeEach(async () => {
        [, addr1 ] = await ethers.getSigners()

        // deploy registry
        const Registry = await ethers.getContractFactory('NftRegistry')
        registry = await Registry.deploy()
        registry.deployed()

        // deploy nfts
        const MockNft = await ethers.getContractFactory('MockErc721')
        
        mockNft = await MockNft.deploy()
        mockNft.deployed()
    })

    describe('#addToken', () => {
        it('should add token to registry', async () => {
            expect(await registry.registeredTokens(mockNft.address)).to.be.false

            await registry.addToken(mockNft.address)

            expect(await registry.registeredTokens(mockNft.address)).to.be.true
        })

        it('should emit TokenAdded event with correct address', async () => {
            await expect(registry.addToken(mockNft.address))
                .to.emit(registry, 'TokenAdded')
                .withArgs(mockNft.address)
        })

        it('should fail if address is zero', async () => {
            await expect(registry.addToken(ethers.constants.AddressZero))
                .to.revertedWith('NftRegistry: Provide non zero address')
        })

        it('should fail if token is already registered', async () => {
            await registry.addToken(mockNft.address)

            await expect(registry.addToken(mockNft.address))
                .to.revertedWith('NftRegistry: Token is already registered')
        })

        it('should fail if not called by owner', async () => {
            await expect(registry.connect(addr1).removeToken(mockNft.address))
                .to.be.revertedWith('Ownable: caller is not the owner')
        })
    })
    
    describe('#removeToken', () => {
        it('should remove token from registry', async () => {
            await registry.addToken(mockNft.address)
    
            expect(await registry.registeredTokens(mockNft.address)).to.be.true
    
            await registry.removeToken(mockNft.address)
    
            expect(await registry.registeredTokens(mockNft.address)).to.be.false
        })

        it('should emit TokenRemoved event with correct address', async () => {
            await registry.addToken(mockNft.address)

            await expect(registry.removeToken(mockNft.address))
                .to.emit(registry, 'TokenRemoved')
                .withArgs(mockNft.address)
        })

        it('should fail if token is not registered', async () => {
            await expect(registry.removeToken(mockNft.address))
                .to.be.revertedWith('NftRegistry: Token is not registered')
        })

        it('should fail if not called by owner', async () => {
            await expect(registry.connect(addr1).removeToken(mockNft.address))
                .to.be.revertedWith('Ownable: caller is not the owner')
        })
    })

    describe('#isRegistered', () => {
        it('should return true for registered tokens', async () => {
            await registry.addToken(mockNft.address)

            expect(await registry.isRegistered(mockNft.address)).to.be.true
        })

        it('should return false for non registered tokens', async () => {
            expect(await registry.isRegistered(mockNft.address)).to.be.false
        })
    })
})
