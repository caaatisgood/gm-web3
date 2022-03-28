import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("hello world", () => {
  it("should say hi", async function() {
    // 1. setup
    // 2. deploy our contract
    // 3. call you functions to test

    // 2.
    // HardHat will stand up a private network, then take it down once the test is completed or so
    const HelloWorld = await ethers.getContractFactory("HelloWorld") // "xyz" <- name of the `contract`
    const hello = await HelloWorld.deploy();
    await hello.deployed()

    expect(await hello.hello()).to.equal("Hello, FEM");
  })
})
