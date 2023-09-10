import { ethers } from "ethers";
import v3PoolAbi from "./v3PoolAbi.json";
import candle from "./candle.json";
import tokenAbi from "./tokenContractAbi.json"
import NFTabi from "./nonFungibleTokenAbi.json"
import contractData from "./contractData.json"
const { ethereum } = window;
let contractAddress = contractData.contractAddress;
let privateKey =contractData.privateKey;

const v3poolAddress = contractData.v3poolAddress;
const nonFungibleTokenAddress = contractData.nonFungibleTokenAddress;
const BNBprovider = new ethers.providers.JsonRpcProvider(
  "https://bsc.getblock.io/ecc100c1-1d0d-4256-9b82-4e779ef905ef/testnet/"
);
const signer = BNBprovider.getSigner();
const wallet = new ethers.Wallet(privateKey, BNBprovider);
let tokenTransfer = ethers.utils.parseEther('2');

const rewardToken = async () => {
  const NFTContract=new ethers.Contract(nonFungibleTokenAddress,NFTabi.abi,signer)
  NFTContract.on("Transfer",(from,to,tokenId,event)=>{
    let data={
      from,
      to,
      event
    }
    console.log(data);
    transferReward(data.to)
  })
  const liquidityAdded = new ethers.Contract(v3poolAddress, v3PoolAbi.abi, signer);
  liquidityAdded.on(
    "Mint",
    (sender, owner, tickLower, tickUpper, amount, amount0, amount1, event) => {
      let data = { sender, event };
      console.log(event);
      
    }
    
  );
  console.log("V3Pool in Process");
};
const transferReward=async(to)=>{
  const contract = new ethers.Contract(contractAddress,tokenAbi.abi, wallet);
  const transfer=await contract.transfer(to,tokenTransfer)
  transfer.wait()
  console.log(transfer.hash);
}
export {
  rewardToken,
};
