// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./interfaces/ICollectible.sol";

contract NftFactory is Ownable {
  using Address for address;

  ICollectible public nftToken;
  string public tokenURI;
  mapping(address => bool) public claimedAccounts;

  constructor(address _nftToken, string memory _tokenURI) public {
    nftToken = ICollectible(_nftToken);
    tokenURI = _tokenURI;
  }

  function claimNft(address to) public returns (uint256 tokenId) {
    require(claimedAccounts[to] == false, "NftFactory: account already claimed");
    claimedAccounts[to] = true;
    tokenId = nftToken.mintItem(to, this.tokenURI());
  }
}