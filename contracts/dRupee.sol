pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Drupee is ERC20 {
    constructor() ERC20("Drupee", "DRU") {
        _mint(msg.sender, 10000000);
    }
}
