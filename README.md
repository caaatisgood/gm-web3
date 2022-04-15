# gm-web3

My smart practices of writing smart contract during FEM course - ["A Tour of Web 3: Ethereum & Smart Contracts with Solidity"](https://frontendmasters.com/courses/web3-smart-contracts/)

## Not random notes

### Basics

ABI - Application Binary Interface

Q: What operation would cost Gas?
A: If it doesn't alter that state of the Ethereum network, it's free, won't cost any Gas.

Def. of "provider", from Ethers doc:
> "A Provider abstracts a connection to the Ethereum blockchain, for issuing queries and sending state changing transactions."

There's no difference between Contract address and Wallet address.

`ethers` is kind of a abstraction for the Ethereum network.

`hardhat` is the testing backbone/infra

Types
- unit = 256 bit number unit8, unit16, unit32, ...
- strings suck
- arrays
  - dynamic - as a member of a contract
  - static/fixed - inside the function
- maps: something a bit different, cannot be iterated
```solidity
contract Foo {
  mapping(uint => address[]) mymap;
}
```
- structs: just like c, go
```solidity
struct Foo {
  unit a;
  unit16 b;
  unit8 c;
}
mapping(unit => Foo) mymap;
Foo[] myarr;
```

The Read Only Function
- `view` function are functions that do not change the contract state
- `pure` cannot read or write state on the contract

The Internal Function
- Can be called by the contract itself and subclasses

Fallback Function
- Cannot be called by the contract itself, it may only be called from the outside

[Rinkeby Testnet](https://faucets.chain.link/rinkeby)

### Game Contract

```solidity
function getSomething() public view returns (uint[] memory) {
  // `memory`: memory that's created within a function
  // `storage`: memory that's stored on the contract
  // ...
}
```

[Chainlink VRF (Verifiable Random Function)](https://docs.chain.link/docs/chainlink-vrf/)

mod: modulo 😂

bit operations:
- `&` AND: for selecting something out
- `|` OR: for putting something in
- `^` XOR: for something cool like swapping values

`import "hardhat/console.sol";` to `console.log` in `.sol`
