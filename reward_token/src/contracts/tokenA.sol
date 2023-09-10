// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20("MyToken", "MTK") {
    constructor() {
        _mint(msg.sender, 1000000000000000000000000); // Mint 1,000,000 MTK tokens (18 decimal places)
    }

    /**
     * @dev Transfer tokens from the contract to a specified recipient.
     * @param recipient The address to which tokens will be transferred.
     * @param amount The amount of tokens to transfer.
     * @return A boolean value indicating whether the transfer was successful.
     */
    function transferTokens(address recipient, uint256 amount) public returns (bool) {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");
        require(amount <= balanceOf(address(this)), "Insufficient contract balance");

        _transfer(address(this), recipient, amount);
        return true;
    }
}
