pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Drupee is ERC20 {
    constructor() ERC20("Drupee", "DRU") {}

    function mint_drupee(address dex_address) public {
        _mint(dex_address, 10000000);
    }
}
