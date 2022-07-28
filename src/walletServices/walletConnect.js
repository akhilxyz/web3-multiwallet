import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
export let walletConnectProvider;

// on Connect to WalletConnect...
const onConnect = async ({
  closeModal,
  setWeb3ChainId,
  setWeb3Account,
  setWeb3Wallet,
  setWeb3Library,
}) => {
  try {
    const walletConnect = new WalletConnectProvider({
      rpc: {
        1: "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79",
        137: "https://polygon-rpc.com",
        56: "https://bsc-dataseed.binance.org/",
        // ...
      },
    });
    walletConnectProvider = walletConnect;
    await walletConnect.enable();
    const library = new Web3(walletConnect);
    const account = await library.eth.getAccounts();
    const chainId = await library.eth.getChainId();
    if (account && account.length > 0) {
      setWeb3Wallet("WalletConnect");
      setWeb3Account(account[0]);
      setWeb3Library(library);
      setWeb3ChainId(chainId);
      closeModal();
    }
  } catch (error) {
    console.log("error", error);
  }
};

// on SendTransaction from WalletConnect...
const onEnableWalletConnect = async (web3Library, web3Account) => {
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

export const walletConnect = {
  onConnect,
  onEnableWalletConnect,
};
