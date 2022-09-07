import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SelectWalletModal from "./Modal";
import { metaMask } from "./walletServices/metamask";
import Toasty from "./utils/toasty";
import { binance } from "./walletServices/binance";
import { walletConnect } from "./walletServices/walletConnect";
import { formatic } from "./walletServices/formatic";
import { coinbase } from "./walletServices/coinBase";
import { ClearStorage } from "./utils/clearStorage";
import { walletAddress } from "./utils/utils";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [show, setShow] = useState(false);
  const [web3Library, setWeb3Library] = useState();
  const [web3ChainId, setWeb3ChainId] = useState();
  const [web3Account, setWeb3Account] = useState();
  const [web3Wallet, setWeb3Wallet] = useState();

  // onclose Modal...
  const closeModal = () => setShow(false);

  // onSwitch Network...
  const handleNetwork = async (e) => {
    const id = e.target.value;
    await switchNetwork(id);
  };

  const refreshState = () => {
    setWeb3Library("");
    setWeb3Account("");
    setWeb3ChainId("");
    setWeb3Wallet("");
  };



  useEffect(() => {
    if (web3Wallet) {
      Toasty(`You are connected to ${web3Wallet}`);
    }
  }, [web3Wallet]);

  const disconnect = async () => {
    // let arr = [1, 2, 4, 4, 4, 2, 1, 6]
    // console.log(removeArr)
    // let r = removeArrayDuplicates(arr)
    // console.log("rrrrrrr", r)
    await ClearStorage(); // clearing all local storage
    refreshState();
  };

  const enableWallet = async () => {
    if (!web3Library) return Toasty("No Wallet Connected");
    switch (web3Wallet) {
      case "MetaMask":
        await metaMask.onEnableEthereum(web3Library, web3Account);
        break;
      case "Binance":
        await binance.onEnableBinance(web3Library, web3Account);
        break;
      case "WalletConnect":
        await walletConnect.onEnableWalletConnect(web3Library, web3Account);
        break;
      case "TrustWallet":
        await walletConnect.onEnableWalletConnect(web3Library, web3Account);
        break;
      case "Formatic":
        await formatic.onEnableFormatic(web3Library, web3Account);
        break;
      case "CoinBase":
        await coinbase.onEnableCoinBase(web3Library, web3Account);
        break;
      default:
      // code block
    }
  };

  const switchNetwork = async (chain) => {
    if (!web3Library) return Toasty("No Wallet Connected");
    switch (web3Wallet) {
      case "MetaMask":
        await metaMask.onChangeNetwork(chain);
        break;
      case "Binance":
        await binance.onChangeNetwork(chain);
        // code block
        break;
      case "Formatic": // supports only Ethereum networks
        if (chain === "56" || chain === "1") {
          await formatic.onChangeNetwork(
            chain,
            setWeb3ChainId,
            setWeb3Account,
            setWeb3Wallet,
            setWeb3Library
          );
        } else {
          Toasty("Chian Not Supported");
        }
        break;
      case "CoinBase":
        await coinbase.onChangeNetwork(chain);
        // code block
        break;
      // more props because we dont've window listner
      // code block
      // break;
      default:
        Toasty("Feature Not Supported");
      // code block
    }
  };

  return (
    <div className="App mt-4 ">
      <div className="d-flex justify-content-center">
        <SelectWalletModal
          web3Wallet={web3Wallet}
          setWeb3Account={setWeb3Account}
          setWeb3ChainId={setWeb3ChainId}
          setWeb3Wallet={setWeb3Wallet}
          setWeb3Library={setWeb3Library}
          isOpen={show}
          disconnect={disconnect}
          closeModal={closeModal}
        />
        <div className="select ">
          {!web3Wallet ? (
            <Button onClick={() => setShow(true)}>Connect Wallet</Button>
          ) : (
            <Button variant="danger" onClick={disconnect}>
              Disconnect
            </Button>
          )}
          <select
            placeholder="Select network"
            className="ms-1"
            value={web3ChainId}
            onChange={handleNetwork}
          >
            <option value="1">Ethereum</option>
            <option value="137">Polygon</option>
            <option value="56">BSC</option>
          </select>
        </div>
      </div>
      <div className="mt-5 text-black">
        <h5>
          Account:{" "}
          <span className="text-muted">{walletAddress(web3Account)}</span>{" "}
        </h5>
        <h5>
          Wallet:{" "}
          <span className="text-muted">{web3Wallet || "Not Connected"}</span>
        </h5>
        <h5>
          ChainId:{" "}
          <span className="text-muted">{web3ChainId || "Not Connected"}</span>
        </h5>
        <Button
          variant={"success"}
          disabled={web3Account ? false : true}
          onClick={enableWallet}
        >
          Send Transaction
        </Button>
      </div>
    </div>
  );
}

export default App;
