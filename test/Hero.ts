import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe('Hero', function() {
  async function createHero() {
    const Hero = await ethers.getContractFactory("TestHero");
    const hero = await Hero.deploy()
    await hero.deployed()

    return hero
  }

  let hero

  before(async function() {
    hero = await createHero()
  })

  it('should fail at creating hero cause of payment', async function() {
    let e;
    try {
      await hero.createHero(
        0,
        // additional info for the contract
        {
          value: ethers.utils.parseEther("0.049999999")
        }
      )
    } catch(err) {
      e = err
    }
    expect(e.message.includes("Please send more money")).to.equal(true)
  })

  it('should get a zero hero array', async function() {
    expect(await hero.getHeroes()).to.deep.equal([])
  })

  it('should return expected hero', async function() {
    const hero = await createHero();

    await hero.setRandom(69)
    await hero.createHero(0, {
      value: ethers.utils.parseEther("0.05")
    });
    const h = (await hero.getHeroes())[0];

    // [S, H, D, I, M]

    // pos  : 69 % 5 = 4 ("magic")
    // value: 69 % (13 + 5) + 1 = 16
    // [S, H, D, I]
    expect(await hero.getMagic(h)).to.equal(16)

    // pos  : 69 % 4 = 1 ("health")
    // value: 69 % (13 + 4) + 1 = 2
    // [S, I, D]
    expect(await hero.getHealth(h)).to.equal(2)

    // pos  : 69 % 3 = 0 ("strength")
    // value: 69 % (13 + 3) + 1 = 6
    // [D, I]
    expect(await hero.getStrength(h)).to.equal(6)

    // pos  : 69 % 2 = 1 ("dex")
    // value: 69 % (13 + 2) + 1 = 10
    // [I]
    expect(await hero.getIntellect(h)).to.equal(10)

    // pos  : 69 % 1 = 0 ("intellect")
    // value: 69 % (13 + 1) + 1 = 14
    // []
    expect(await hero.getDexterity(h)).to.equal(14)
  })
})
