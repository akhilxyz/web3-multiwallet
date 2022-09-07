import { walletConnectProvider } from "../walletServices/walletConnect";

// MetaMask Event Listner...
export const MetaMaskListner = async (reConnect, disconnect) => {
  let provider = window.ethereum;
  // edge case if MM and CBW are both installed
  if (window.ethereum.providers?.length) {
    window.ethereum.providers.forEach(async (p) => {
      if (p.isMetaMask) provider = p;
    });
  }
  if (provider) {
    provider.on("chainChanged", reConnect);
    provider?.on("accountsChanged", reConnect);
    provider?.on("disconnect", disconnect);
    return () => {
      provider.removeListener("chainChanged", reConnect);
      provider?.removeListener("accountsChanged", reConnect);
    };
  }
};

// Binance Event Listner...
export const BinanceListner = (reConnect, disconnect) => {
  const { BinanceChain } = window;
  if (BinanceChain) {
    BinanceChain?.on("chainChanged", reConnect);
    BinanceChain?.on("accountsChanged", reConnect);
    BinanceChain?.on("disconnect", disconnect);
  }
};

// WalletConnect Event Listner...
export const WalletConnectListner = (reConnect, disconnect) => {
  walletConnectProvider?.on("accountsChanged", reConnect);
  // Subscribe to chainId change
  walletConnectProvider?.on("chainChanged", reConnect);
  // Subscribe to session disconnection
  walletConnectProvider?.on("disconnect", async () => {
    await walletConnectProvider?.disconnect();
    disconnect();
  });
};

// CoinBase Event Listner...
export const coinBaseListner = (reConnect, disconnect) => {
  let provider = window.ethereum;
  // edge case if MM and CBW are both installed
  if (window.ethereum.providers?.length) {
    window.ethereum.providers.forEach(async (p) => {
      if (!p.isMetaMask) provider = p;
    });
  }
  if (provider) {
    provider.on("chainChanged", reConnect);
    provider?.on("accountsChanged", reConnect);
    provider?.on("disconnect", disconnect);
    return () => {
      provider.removeListener("chainChanged", reConnect);
      provider?.removeListener("accountsChanged", reConnect);
    };
  }
};

// WalletConnect Event Listner...
export const TrustWalletListner = (reConnect, disconnect, isTrust) => {
  if (isTrust) {
    let provider = window.ethereum;
    if (window.ethereum.providers?.length) {
      window.ethereum.providers.forEach(async (p) => {
        if (p.isTrust) provider = p;
      });
    }
    if (provider) {
      provider.on("chainChanged", reConnect);
      provider?.on("accountsChanged", reConnect);
      provider?.on("disconnect", disconnect);
      return () => {
        provider.removeListener("chainChanged", reConnect);
        provider?.removeListener("accountsChanged", reConnect);
      };
    }
  } else {
    walletConnectProvider?.on("accountsChanged", reConnect);
    // Subscribe to chainId change
    walletConnectProvider?.on("chainChanged", reConnect);
    // Subscribe to session disconnection
    walletConnectProvider?.on("disconnect", async () => {
      await walletConnectProvider?.disconnect();
      disconnect();
    });
  }
};
