pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IFallback {
  function count() external;
}

contract Fallback {
  function foo() internal view {
    console.log("Hello World");
  }

  fallback() external payable {
    foo();
    console.log("fallback");

    revert("You shouldn't be here");
  }
}
