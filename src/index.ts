import { ethers } from 'ethers'
import Counter from '../artifacts/contracts/Counter.sol/Counter.json'

function getEth() {
  // @ts-ignore
  const eth = window.ethereum
  if (!eth) {
    throw new Error("get metamask and a positive attitude");
  }
  return eth;
}

async function hasAccounts() {
  const eth = getEth()
  const accounts = await eth.request({ method: 'eth_accounts' }) as string[]

  return accounts?.length
}

async function requestAccounts() {
  const eth = getEth()
  const accounts = await eth.request({ method: 'eth_requestAccounts' }) as string[]

  return accounts?.length
}

async function run() {
  if (!await hasAccounts() && !await requestAccounts()) {
    throw new Error("Please let me take your money")
  }

  // call the contract from the browser!
  const counter = new ethers.Contract(
    // address - WHERE on the network
    process.env.CONTRACT_ADDRESS,
    // interface to the contract
    Counter.abi,
    // provider (e.g. metamask) - HOW to contact the network
    // getSigner() - I want to have a provider with state changing transaction privileges
    new ethers.providers.Web3Provider(getEth()).getSigner()
  )
  const el = document.createElement("div")
  async function setCounter(count?) {
    el.innerHTML = count || await counter.getCounter();
  }
  setCounter()

  const button = document.createElement("button")
  button.innerText = 'increment'
  button.onclick = async function() {
    await counter.count()
  }

  counter.on(counter.filters.CounterInc(), function(count) {
    setCounter(count)
  })

  document.body.appendChild(el)
  document.body.appendChild(button)
};

run();
