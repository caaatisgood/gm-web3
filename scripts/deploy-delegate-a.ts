import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy(name, ...args) {
  const A = await ethers.getContractFactory(name);
  const a = await A.deploy(...args)
  await a.deployed();

  console.log(a.address);

  return a;
}

async function fallback() {
  const a = await deploy("A");
  const b = await deploy("B", a.address);

  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("------");

  await a.setA(42);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("------");

  await b.setB(60);
  console.log("A", await a.getA());
  console.log("B", await b.getB());
  console.log("------");
}

fallback()
