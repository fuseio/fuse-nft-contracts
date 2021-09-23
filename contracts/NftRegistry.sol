// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/INftRegistry.sol";

contract NftRegistry is Ownable, INftRegistry {
    mapping(address => bool) public registeredTokens;

    /**
     * @dev Emitted when a token is added to the registry.
     */
    event TokenAdded(address token);

    /**
     * @dev Emitted when a token is removed from the registry.
     */
    event TokenRemoved(address token);

    /**
     * @dev Add token to registry.
     * 
     * @param token address of token to add to registry. 
     * 
     * Emits a {TokenAdded} event.
     */
    function addToken(address token) onlyOwner public override {
        require(token != address(0), "NftRegistry: Provide non zero address");
        require(registeredTokens[token] != true, "NftRegistry: Token is already registered");
        registeredTokens[token] = true;
        emit TokenAdded(token);
    }

    /**
     * @dev Remove token from registry.
     * 
     * @param token address of token to remove from registry. 
     * 
     * Emits a {TokenRemoved} event.
     */
    function removeToken(address token) onlyOwner public override {
        require(registeredTokens[token] != false, "NftRegistry: Token is not registered");
        registeredTokens[token] = false;
        emit TokenRemoved(token);
    }

    /**
     * @dev Add token to registry.
     * 
     * @param token address of token to check in registry. 
     *
     * @return Returns whether the token is in the registry or not.
     */
    function isRegistered(address token) public override view returns(bool) {
        return registeredTokens[token];
    }
}
