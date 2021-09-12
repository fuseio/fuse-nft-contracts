// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

interface ICollectible {

  function mintItem(address to, string memory tokenURI)
      external
      returns (uint256);
}