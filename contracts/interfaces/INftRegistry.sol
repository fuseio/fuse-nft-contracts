// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

interface INftRegistry {
    function addToken(address token) external;
    function removeToken(address token) external;
    function isRegistered(address token) external view returns(bool);
}
