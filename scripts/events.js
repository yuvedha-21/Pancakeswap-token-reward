import abi from "./abi.json"
const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
// const { mnemonic } = require("./abi.json");

async function main(){
    const txHash = "0x39bafd6389eff4c4dc5c8298a405c21dbf3ae763f9f324b83dc133b050620933";
    const tx = await provider.getTransaction(txHash);
    const abi_=abi.abi
    console.log(abi_);
    const iface = new ethers.utils.Interface(abi);
const logs = await provider.getLogs({ address: tx.to, topics: tx.logs });
console.log(logs);

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });