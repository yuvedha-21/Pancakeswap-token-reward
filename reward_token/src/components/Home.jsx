import React from "react";
// import ReactDOM from 'react-dom';

// import { Link } from "react-router-dom";
// import { TbBusinessplan } from "react-icons/tb";
import * as blockchain from "./events";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// import { truncate } from "../store";
// import { useGlobalState } from "../store";
const Home = () => {
//   const [connectedAccount] = useGlobalState("connectedAccount");
  const handleStartButton = async () => {
    await blockchain.rewardToken();
  };
  return (
    <div className="flex space-x-2 justify-center">
      <button
        type="button"
        
        onClick={handleStartButton}
      >
        start
      </button>
     
    </div>
  );
};

export default Home;

//styles after this part will not be accounted as only the styles inside the Header() has been exported to routes.
