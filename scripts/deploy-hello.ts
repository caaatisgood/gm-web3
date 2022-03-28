import "@nomiclabs/hardhat-ethers"
import { ethers } from 'hardhat'

async function foo() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")
  const hello = await HelloWorld.deploy()
  await hello.deployed()
  return hello
}

async function deploy() {
  const hello = await foo()

  return hello
}

// @ts-ignore
async function sayHello(hello) {
  // `hello` method here acts like a proxy which can execute function on the contract (on the chain)
  console.log("Say Hello:", await hello.hello());
}

deploy().then(sayHello)
