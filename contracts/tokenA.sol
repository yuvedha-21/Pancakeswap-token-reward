// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20("MyToken", "MTK") {
    constructor() {
        _mint(msg.sender, 1000000000000000000000000); // Mint 1,000,000 MTK tokens (18 decimal places)
    }
}
