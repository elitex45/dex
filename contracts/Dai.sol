pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dai is ERC20 {
    constructor() ERC20("Dai", "DRU") {}

    function mint_dai(address dex_address) public {
        _mint(dex_address, 10000000 * (10**18));
    }
}
