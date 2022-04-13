// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Dex {
    using SafeMath for uint256;
  uint256 public totalLiquidity;
  mapping (address => uint256) public liquidity;


  IERC20 drupee;

  constructor(address token_addr) {
    drupee = IERC20(token_addr);
  }
  

  //functions

function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public view returns (uint256) {
  uint256 input_amount_with_fee = input_amount.mul(997);
  uint256 numerator = input_amount_with_fee.mul(output_reserve);
  uint256 denominator = input_reserve.mul(1000).add(input_amount_with_fee);
  return numerator / denominator;
}

function get_drupees_reserve() public returns (uint256) {
      return drupee.balanceOf(address(this));
  }

function get_eth_reserve() public returns (uint256) {
      return address(this).balance;
  }

function init(uint256 drupees) public payable returns (uint256) {
      console.log("msg.sender",msg.sender);
  require(totalLiquidity==0,"DEX:init - already has liquidity");
  totalLiquidity = address(this).balance;
  liquidity[msg.sender] = totalLiquidity;
  require(drupee.transferFrom(msg.sender, address(this), drupees));
  return totalLiquidity;
}
function ethTodrupee() public payable returns (uint256) {
  uint256 drupees_reserve = drupee.balanceOf(address(this));
  console.log("Token_reserve=",drupees_reserve);
  uint256 tokens_bought = price(msg.value, address(this).balance-(msg.value), drupees_reserve);
  require(drupee.transfer(msg.sender, tokens_bought));
  console.log("Token_bought",drupees_reserve);
   console.log("msg.sender",msg.sender);
  return tokens_bought;
}

function drupeeToEth(uint256 tokens) public returns (uint256) {
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 eth_bought = price(tokens, drupee_reserve, address(this).balance);
  (bool sent, ) = msg.sender.call{value: eth_bought}("");
  require(sent, "Failed to send user eth.");
  require(drupee.transferFrom(msg.sender, address(this), tokens));
  return eth_bought;
}

function deposit() public payable returns (uint256) {
  uint256 eth_reserve = address(this).balance.sub(msg.value);
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 token_amount = (msg.value.mul(drupee_reserve) / eth_reserve).add(1);
  uint256 liquidity_minted = msg.value.mul(totalLiquidity) / eth_reserve;
  liquidity[msg.sender] = liquidity[msg.sender].add(liquidity_minted);
  totalLiquidity = totalLiquidity.add(liquidity_minted);
  require(drupee.transferFrom(msg.sender, address(this), token_amount));
  return liquidity_minted;
}
function withdraw(uint256 amount) public returns (uint256, uint256) {
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 eth_amount = amount.mul(address(this).balance) / totalLiquidity;
  uint256 token_amount = amount.mul(drupee_reserve) / totalLiquidity;
  liquidity[msg.sender] = liquidity[msg.sender].sub(eth_amount);
  totalLiquidity = totalLiquidity.sub(eth_amount);
  payable(msg.sender).transfer(eth_amount);
  require(drupee.transfer(msg.sender, token_amount));
  return (eth_amount, token_amount);
}

}