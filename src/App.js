import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import SelectWalletModal from './Modal';
import { metaMask } from './walletServices/metamask';
import Toasty from './utils/toasty';
import { binance } from './walletServices/binance';
import { walletConnect } from './walletServices/walletConnect';
import { formatic } from './walletServices/formatic';
import { coinbase } from './walletServices/coinBase';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false)
  const [web3Library, setWeb3Library] = useState();
  const [web3ChainId, setWeb3ChainId] = useState();
  const [web3Account, setWeb3Account] = useState();
  const [web3Wallet, setWeb3Wallet] = useState();

  const closeModal = () => setShow(false)

  const handleNetwork = (e) => {
    const id = e.target.value;
    switchNetwork(id)
  };

  const refreshState = () => {
    setWeb3Library("");
    setWeb3Account("");
    setWeb3ChainId("")
    setWeb3Wallet("");
    // setVerified(undefined);
  };

  useEffect(() => {
    if (web3Wallet) {
      Toasty(`You are connected to ${web3Wallet}`)
    }
  }, [web3Wallet]);

  const disconnect = () => {
    refreshState();
  };

  const enableWallet = async () => {
    if (!web3Library) return Toasty("No Wallet Connected");
    switch (web3Wallet) {
      case 'MetaMask':
        await metaMask.onEnableEthereum(web3Library, web3Account)
        break;
      case 'Binance':
        await binance.onEnableBinance(web3Library, web3Account)
        break;
      case 'WalletConnect':
        await walletConnect.onEnableWalletConnect(web3Library, web3Account)
        break;
      case 'TrustWallet':
        await walletConnect.onEnableWalletConnect(web3Library, web3Account)
        break;
      case 'Formatic':
        await formatic.onEnableFormatic(web3Library, web3Account)
        break;
      case 'CoinBase':
        await coinbase.onEnableCoinBase(web3Library, web3Account)
        break;
      // onEnableCoinBase
      // onEnableFormaticConnect
      default:
      // code block
    }
  }

  const switchNetwork = async (chain) => {
    if (!web3Library) return Toasty("No Wallet Connected");
    switch (web3Wallet) {
      case 'MetaMask':
        await metaMask.onChangeNetwork(chain)
        break;
      case 'Binance':
        await binance.onChangeNetwork(chain)
        // code block
        break;
      case 'Formatic': // supports only Ethereum networks
        if (chain === '56' || chain === '1') {
          await formatic.onChangeNetwork(chain, setWeb3ChainId, setWeb3Account, setWeb3Wallet, setWeb3Library)
        } else {
          Toasty("Chian Not Supported")
        }
        break;
      case 'CoinBase':
        await coinbase.onChangeNetwork(chain)
        // code block
        break;
      // more props because we dont've window listner
      // code block
      // break;
      default:
        Toasty("Feature Not Supported")
      // code block
    }
  }


  return (
    <div className="App mt-4">
      <SelectWalletModal
        setWeb3Account={setWeb3Account}
        setWeb3ChainId={setWeb3ChainId}
        setWeb3Wallet={setWeb3Wallet}
        setWeb3Library={setWeb3Library}
        isOpen={show}
        disconnect={disconnect}
        closeModal={closeModal}
      />

      {!web3Wallet ? (
        <Button onClick={() => setShow(true)}>Connect Wallet</Button>
      ) : (
        <Button onClick={disconnect}>Disconnect</Button>
      )}

      <select placeholder="Select network" className='ms-1' value={web3ChainId} onChange={handleNetwork}>
        <option value="1">Ethereum</option>
        <option value="137">Polygon</option>
        <option value="56">BSC</option>
      </select>

      <Card className='mt-4'>
        <Card.Body>
          <h5>Account: {web3Account}</h5>
          <h5>Wallet: {web3Wallet}</h5>
          <h5>ChainId: {web3ChainId}</h5>
          <Button variant='success' disabled={web3Account ? false : true} onClick={enableWallet}>
            Send Transaction
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
