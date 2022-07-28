import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3 from "web3";
import { networkParams } from "../utils/networks";
const APP_NAME = "MultiWallet";
const APP_LOGO_URL = "";
const DEFAULT_ETH_JSONRPC_URL =
  "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac";
const DEFAULT_CHAIN_ID = 1;

// Initialize Coinbase Wallet SDK
export const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

// on Connect to CoinBase wallet
const onConnect = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  try {
    const coinbase = coinbaseWallet.makeWeb3Provider(
      DEFAULT_ETH_JSONRPC_URL,
      DEFAULT_CHAIN_ID
    );
    await coinbase.enable();
    const library = new Web3(coinbase);
    const account = await library.eth.getAccounts();
    const chainId = await library.eth.getChainId();
    if (account && account.length > 0) {
      setWeb3Wallet("CoinBase");
      setWeb3Account(account[0]);
      setWeb3Library(library);
      setWeb3ChainId(chainId);
      closeModal();
    }
  } catch (error) {
    console.log("error", error);
  }
};

// on Change Network in CoinBase
const onChangeNetwork = async (chainId) => {
  let networkD = networkParams[Number(chainId)];
  const ethereum = coinbaseWallet.makeWeb3Provider(
    DEFAULT_ETH_JSONRPC_URL,
    DEFAULT_CHAIN_ID
  );
  if (networkD) {
    try {
      // attempt to switch to Harmony One network
      return await ethereum.send("wallet_switchEthereumChain", [
        { chainId: networkD.chainId },
      ]);
    } catch (switchError) {
      // 4902 indicates that the client does not recognize the Harmony One network
      if (switchError.code === 4902) {
        return await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networkParams[Number(chainId)],
            },
          ],
        });
      }
    }
  }
};

// on Send Transaction in CoinBase Wallet
const onEnableCoinBase = async (web3Library, web3Account) => {
  if (!web3Library) return;
  try {
    const amountToSend = "100000000000000"; // Convert to wei value
    await web3Library.eth.sendTransaction({
      from: web3Account,
      to: "0x61d63ceeafFa10D459549e80a8d5f7f69c5ce591",
      value: amountToSend,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const coinbase = {
  onConnect,
  onChangeNetwork,
  onEnableCoinBase,
};
