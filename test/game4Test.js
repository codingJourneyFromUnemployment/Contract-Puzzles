const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const [player] = await ethers.getSigners();

    return { game, player };
  }
  it('should be a winner', async function () {
    const { game, player } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(player).write(player.getAddress());

    await game.win(player.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
