import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  return counter;
}

async function count(counter) {
  await counter.count()
  console.log("counter", await counter.getCounter());
}

deploy().then(count)
