const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game1', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game1');
    const game = await Game.deploy();
    const [player] = await ethers.getSigners();

    return { game, player };
  }

  it('should be a winner', async function () {
    // leave this as-is
    const { game, player } = await loadFixture(deployContractAndSetVariables);

    // you must call unlock before you can win
    await game.connect(player).unlock();

    // leave this call to game.win() as-is
    await game.win();

    // leave this testing assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

