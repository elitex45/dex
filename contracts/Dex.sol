pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Dex {
    using SafeMath for uint256;
  uint256 public totalLiquidity;
  mapping (address => uint256) public liquidity;

  uint256 public total_eth_derupee;
  uint256 public total_eth_dai;
  

  uint256 public eth_drupee_liquidity=0;
  mapping (address => uint256) public eth_drupe_liquidity;

  uint256 public eth_dai_liquidity=0;
  mapping (address => uint256) public eth_da_liquidity;

  
  IERC20 drupee;
  IERC20 dai;

  constructor(address drupee_addr,address dai_addr) {
    drupee = IERC20(drupee_addr);
    dai = IERC20(dai_addr);

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

  ///Dai
  function get_dai_reserve() public returns (uint256) {
      return dai.balanceOf(address(this));
  }
  ///

  function tokenize(uint256 amount,string  memory digest, string memory signature) public returns(bool){
        require(drupee.balanceOf(address(this)) >= amount);
        require((bytes(digest).length == bytes(signature).length) && (keccak256(bytes(digest)) == keccak256(bytes(signature))));
        drupee.transfer(msg.sender, amount);
        return true;
    }


  function init_drupee_eth(uint256 drupees) public payable returns (uint256) {
      console.log("msg.sender",msg.sender);
  require(eth_drupee_liquidity==0,"DEX:init - already has liquidity");
  eth_drupee_liquidity = address(this).balance-eth_dai_liquidity;
  total_eth_derupee = eth_drupee_liquidity;
  eth_drupe_liquidity[msg.sender] = eth_drupee_liquidity;
  require(drupee.transferFrom(msg.sender, address(this), drupees));
 
  return eth_drupee_liquidity;
}

function init_dai_eth(uint256 dais) public payable returns (uint256) {
      console.log("msg.sender",msg.sender);
  require(eth_dai_liquidity==0,"DEX:init - already has liquidity");
  eth_dai_liquidity = address(this).balance-eth_drupee_liquidity;
  eth_da_liquidity[msg.sender] = eth_dai_liquidity;
  total_eth_dai = eth_dai_liquidity;
  require(dai.transferFrom(msg.sender, address(this), dais));
 
  return eth_dai_liquidity;
}




function ethTodrupee() public payable returns (uint256) {
  uint256 drupees_reserve = drupee.balanceOf(address(this));
  console.log("Token_reserve=",drupees_reserve);
  uint256 tokens_bought = price(msg.value, address(this).balance-(msg.value)-eth_dai_liquidity, drupees_reserve);
  eth_drupee_liquidity +=msg.value;
  require(drupee.transfer(msg.sender, tokens_bought));
  console.log("Token_bought",drupees_reserve);
   console.log("msg.sender",msg.sender);
  return tokens_bought;
}

function ethTodai() public payable returns(uint256) {
    uint256 dai_reserve = dai.balanceOf(address(this));
  console.log("Token_reserve=",dai_reserve);
  uint256 tokens_bought = price(msg.value, address(this).balance-(msg.value)-eth_drupee_liquidity, dai_reserve);
  eth_dai_liquidity +=msg.value;
  require(dai.transfer(msg.sender, tokens_bought));
  console.log("Token_bought",dai_reserve);
   console.log("msg.sender",msg.sender);
  return tokens_bought;

}

function drupeeToEth(uint256 tokens) public returns (uint256) {
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 eth_bought = price(tokens, drupee_reserve, address(this).balance-eth_dai_liquidity);
  (bool sent, ) = msg.sender.call{value: eth_bought}("");
  eth_drupee_liquidity -= eth_drupee_liquidity;
  require(sent, "Failed to send user eth.");
  require(drupee.transferFrom(msg.sender, address(this), tokens));
  return eth_bought;
}

function daiToEth(uint256 tokens) public returns (uint256) {
  uint256 dai_reserve = dai.balanceOf(address(this));
  uint256 eth_bought = price(tokens, dai_reserve, address(this).balance-eth_drupee_liquidity);
  (bool sent, ) = msg.sender.call{value: eth_bought}("");
  eth_dai_liquidity -= eth_dai_liquidity;
  require(sent, "Failed to send user eth.");
  require(dai.transferFrom(msg.sender, address(this), tokens));
  return eth_bought;
}

function deposit_eth_drupee() public payable returns (uint256) {
  //uint256  eth_drupee_liquidity = address(this).balance.sub(msg.value);
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 token_amount = (msg.value.mul(drupee_reserve) /  eth_drupee_liquidity).add(1);
  uint256 liquidity_minted = msg.value.mul( eth_drupee_liquidity) / total_eth_derupee;
  eth_drupe_liquidity[msg.sender] =  eth_drupe_liquidity[msg.sender].add(liquidity_minted);
  total_eth_derupee = total_eth_derupee.add(liquidity_minted);
  eth_drupee_liquidity += msg.value;
  require(drupee.transferFrom(msg.sender, address(this), token_amount));
  return liquidity_minted;
}

function withdraw_eth_drupee(uint256 amount) public returns (uint256, uint256) {
  uint256 drupee_reserve = drupee.balanceOf(address(this));
  uint256 eth_amount = amount.mul(eth_drupee_liquidity) / total_eth_derupee;
  uint256 token_amount = amount.mul(drupee_reserve) / total_eth_derupee;
  eth_drupe_liquidity[msg.sender] = eth_drupe_liquidity[msg.sender].sub(eth_amount);
  eth_drupee_liquidity = eth_drupee_liquidity - eth_amount;
  total_eth_derupee = total_eth_derupee.sub(eth_amount);
  payable(msg.sender).transfer(eth_amount);
  require(drupee.transfer(msg.sender, token_amount));
  return (eth_amount, token_amount);
}





function deposit_eth_dai() public payable returns (uint256) {
  //uint256  eth_drupee_liquidity = address(this).balance.sub(msg.value);
  uint256 dai_reserve = dai.balanceOf(address(this));
  uint256 token_amount = (msg.value.mul(dai_reserve) / eth_dai_liquidity).add(1);
  uint256 liquidity_minted = msg.value.mul( eth_dai_liquidity) / total_eth_dai;
  eth_da_liquidity[msg.sender] =  eth_da_liquidity[msg.sender].add(liquidity_minted);
  total_eth_dai = total_eth_dai.add(liquidity_minted);
  eth_dai_liquidity += msg.value;
  require(dai.transferFrom(msg.sender, address(this), token_amount));
  return liquidity_minted;
}


function withdraw_eth_dai(uint256 amount) public returns (uint256, uint256) {
  uint256 dai_reserve = dai.balanceOf(address(this));
  uint256 eth_amount = amount.mul(eth_dai_liquidity) / total_eth_dai;
  uint256 token_amount = amount.mul(dai_reserve) / total_eth_dai;
  eth_da_liquidity[msg.sender] = eth_da_liquidity[msg.sender].sub(eth_amount);
  eth_dai_liquidity = eth_dai_liquidity - eth_amount;
  total_eth_dai = total_eth_dai.sub(eth_amount);
  payable(msg.sender).transfer(eth_amount);
  require(drupee.transfer(msg.sender, token_amount));
  return (eth_amount, token_amount);
}



function totaldeposit_eth_drupee(address user) public returns (uint256){
    console.log("liquidity of this user",liquidity[user]);
    return eth_drupe_liquidity[user];
} 

function totaldeposit_eth_dai(address user) public returns (uint256){
    console.log("liquidity of this user",liquidity[user]);
    return eth_da_liquidity[user];
} 


}
