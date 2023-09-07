const abi = require("./abi.json");
const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
const abi_=abi.abi
      const contractAddress = "0x427bF5b37357632377eCbEC9de3626C71A5396c1"; // Replace with the actual contract address
      const contract = new ethers.Contract(contractAddress, abi_, provider);
   
async function main(){
   
   // setInterval(rewardToken, 100);

   rewardToken()

}
async function rewardToken(){
   // try {
      
   //    //  const txHash = "0x39bafd6389eff4c4dc5c8298a405c21dbf3ae763f9f324b83dc133b050620933";
   //    const promise=await contract.on("Mint", (sender, owner, tickLower,tickUpper,amount,amount0,amount1) => {
   //       console.log(amount1);
   //       console.log("found the mint");
   //       process.exit();
   //   });

   //   console.log("ended");
   // //   process.exit();
     
   //  } catch (error) {
   //     console.log("mint event not found");
   //  }
   
//   const events = await contract.getPastEvents("Mint", {
//    topics: [
//      "0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde",
//      "0x000000000000000000000000427bf5b37357632377ecbec9de3626c71a5396c1",
//      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5",
//      "0x0000000000000000000000000000000000000000000000000000000000000008"
//    ]
//  });

try {
   const filter = {
      address: contractAddress, // Contract address
      topics: [ethers.utils.id("Mint")], // Event topic (hashed event name)
    };
   
    const logs = await provider.getLogs(filter);
    logs.forEach((log) => {
      const event = contract.interface.parseLog(log);
      console.log(`Event Data: ${JSON.stringify(event.values, null, 2)}`);
    });
} catch (error) {
   if (error.code === -32005 && error.reason === 'limit exceeded') {
      console.log('Rate limit exceeded. Retrying in 5 seconds...');
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      return rewardToken();
   } else {
      console.log(error);
   }
}
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });