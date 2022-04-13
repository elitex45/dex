// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract drupee is ERC20 {
  constructor() ERC20("drupee", "DRU") {
  }

  function mint_drupee(address dex_address) public{
    _mint(dex_address,10000000*(10**18));
  }
}