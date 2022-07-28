import Web3 from "web3";
import { networkParams } from "../utils/networks";
import Toasty from "../utils/toasty";

// on Connect to Binance wallet
const onConnect = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  const { BinanceChain } = window;
  if (BinanceChain) {
    try {
      const library = new Web3(BinanceChain);
      const account = await library.eth.getAccounts();
      const chainId = await library.eth.getChainId();
      if (account && account.length > 0) {
        setWeb3Wallet("Binance");
        setWeb3Account(account[0]);
        setWeb3Library(library);
        setWeb3ChainId(chainId);
        closeModal();
      }
    } catch (error) {
      console.log("error", "Something went wrong !");
    }
  } else {
    console.log("error", "Please Install Binance Extention");
  }
};

// on Send Transaction from Binance wallet...
const onEnableBinance = async (web3Library, walletAddress) => {
  if (!web3Library) return;
  try {
    const amountToSend = "100000000000000"; // Convert to wei value
    await web3Library.eth.sendTransaction({
      from: walletAddress,
      to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
      value: amountToSend,
    });
  } catch (error) {
    console.log("error", error);
  }
};

// on Change Network in Binance wallet...
const onChangeNetwork = async (chainId) => {
  let networkD = networkParams[Number(chainId)];
  const { BinanceChain } = window;
  if (BinanceChain && networkD && networkD.bscNetworkId) {
    try {
      return await BinanceChain.switchNetwork(networkD.bscNetworkId);
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          return await BinanceChain.switchNetwork(networkD.bscNetworkId);
        } catch (error) {
          console.log("error", error);
        }
      }
      if (error && error.message) {
        return Toasty(error.message);
      }
      console.log("err", error);
    }
  } else {
    return Toasty("Chain Not Suppoted");
  }
};

export const binance = {
  onConnect,
  onEnableBinance,
  onChangeNetwork,
};
