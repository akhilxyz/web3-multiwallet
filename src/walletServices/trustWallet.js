import Web3 from "web3";
import { metaMaskError } from "../utils/errorhandler";
import Toasty from "../utils/toasty";

// on Connect to Trust wallet...
const onConnect = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  if (window.ethereum.isTrust || window.trustwallet.solana.isTrust
  ) {
    try {
      const provider = window.trustwallet.ethereum || window.trustwallet.solana;
      const library = new Web3(provider);
      await provider.enable()
      const account = await library.eth.getAccounts();
      const chainId = await library.eth.getChainId();
      if (account && account.length > 0) {
        setWeb3Wallet("TrustWallet");
        setWeb3Account(account[0]);
        setWeb3Library(library);
        setWeb3ChainId(chainId);
        closeModal();
      }
    } catch (error) {
      window.alert(error);
      console.log("error", "Something went wrong !");
    }
  } else {
    console.log("error", "Please Install Trust Wallet Extention");
  }
};

const onConnectDesktop = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  if (window?.trustwallet?.isTrust
  ) {
    try {
      const provider = window.trustwallet
      const library = new Web3(provider);
      await provider.enable()
      const account = await library.eth.getAccounts();
      const chainId = await library.eth.getChainId();
      if (account && account.length > 0) {
        setWeb3Wallet("TrustWallet");
        setWeb3Account(account[0]);
        setWeb3Library(library);
        setWeb3ChainId(chainId);
        closeModal();
      }
    } catch (error) {
      window.alert(error);
      console.log("error", "Something went wrong !");
    }
  } else {
    Toasty("Please Install Trust Wallet Extention");
    console.log("error", "Please Install Trust Wallet Extention");
  }
};

// on SendTransection from Trust wallet...
const onEnableTrust = async (web3Library, web3Account) => {
  if (!web3Library) return;
  try {
    const amountToSend = "100000000000000"; // Convert to wei value
    await web3Library.eth.sendTransaction({
      from: web3Account,
      to: "0x61d63ceeafFa10D459549e80a8d5f7f69c5ce591",
      value: amountToSend,
    });
  } catch (error) {
    const errMsg = await metaMaskError(error);
    Toasty(errMsg);
    // console.log("error", errMsg)
  }
};

export const trustWallet = {
  onConnect,
  onConnectDesktop,
  onEnableTrust,
};
