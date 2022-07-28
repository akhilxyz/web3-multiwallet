import Fortmatic from "fortmatic";
import RPC from "../constants/extraRpcs.json";
import { formaticApiKey } from "../constants/walletList";
import Web3 from "web3";

// on Connect to Formatic wallet...
const onConnect = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  try {
    const fm = new Fortmatic(formaticApiKey);
    const library = new Web3(fm.getProvider());
    const account = await library.eth.getAccounts();
    const chainId = await library.eth.getChainId();
    if (account && account.length > 0) {
      setWeb3Wallet("Formatic");
      setWeb3Account(account[0]);
      setWeb3Library(library);
      setWeb3ChainId(chainId);
      closeModal();
    }
  } catch (error) {
    console.log("error", "Something went wrong !");
  }
};

// on SendTransection from Formatic wallet...
const onEnableFormatic = async (web3Library, web3Account) => {
  if (!web3Library) return;
  try {
    const amountToSend = "100000000000000"; // Convert to wei value
    await web3Library.eth.sendTransaction({
      from: web3Account,
      to: "0xb159752065EA68Ef0B22249Df25864E624fec45D",
      value: amountToSend,
    });
  } catch (error) {
    console.log("error", error);
  }
};

// on Change Network in Formatic wallet...
const onChangeNetwork = async (
  networkId,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library
) => {
  try {
    let fm = new Fortmatic(formaticApiKey);
    if (networkId === "54") {
      let networkD = RPC[networkId];
      if (networkD && networkD.rpcs) {
        const customNodeOptions = {
          rpcUrl: networkD.rpcs[0], // your own node url
          chainId: Number(networkId), // chainId of your own node
        };
        fm = new Fortmatic(formaticApiKey, customNodeOptions);
      }
      const library = new Web3(fm.getProvider());
      const account = await library.eth.getAccounts();
      const chainId = await library.eth.getChainId();
      if (account && account.length > 0) {
        setWeb3Wallet("Formatic");
        setWeb3Account(account[0]);
        setWeb3Library(library);
        setWeb3ChainId(chainId);
      }
      return true;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const formatic = {
  onConnect,
  onEnableFormatic,
  onChangeNetwork,
};
