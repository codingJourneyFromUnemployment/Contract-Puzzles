const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    let address
    let wallet
    const provider = await new ethers.getDefaultProvider();
    console.log(provider)

    while (true) {
      wallet = ethers.Wallet.createRandom(provider);
      address = wallet.address;
      console.log(address);
      if (address < threshold) {
        break;
      }
    }

    const walletTransfer = {
      to: wallet.address,
      value: ethers.parseEther('1.0'),
    };
    const signer = (await ethers.getSigners())[0];
    console.log(signer)
    await signer.sendTransaction(walletTransfer);
    console.log(await provider.getBalance(wallet.address));
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

