// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import SelectWalletModal from './Modal';
import { useWeb3React } from "@web3-react/core";
import { networkParams } from "./networks";
import { connectors } from "./connectors";
import { toHex, truncateAddress } from "./utils";


function App() {
  const [show, setShow] = useState(false)
  const [web3Library, setWeb3Library] = useState();
  const [web3ChainId, setWeb3ChainId] = useState();
  const [web3Account, setWeb3Account] = useState();
  const [web3Wallet, setWeb3Wallet] = useState();


  const closeModal = () => setShow(false)

  const handleNetwork = (e) => {
    const id = e.target.value;
    // setNetwork(Number(id));
  };

  const refreshState = () => {
    setWeb3Library("");
    setWeb3Account("");
    setWeb3ChainId("")
    setWeb3Wallet("");
    // setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
  };


  return (
    <div className="App mt-4">
      <SelectWalletModal
        setWeb3Account={setWeb3Account}
        setWeb3ChainId={setWeb3ChainId}
        setWeb3Wallet={setWeb3Wallet}
        setWeb3Library={setWeb3Library}
        isOpen={show}
        closeModal={closeModal}
      />

      {!web3Wallet ? (
        <Button onClick={() => setShow(true)}>Connect Wallet</Button>
      ) : (
        <Button onClick={disconnect}>Disconnect</Button>
      )}
      <Card className='mt-4'>
        <Card.Body>
          <h5>Account: {web3Account}</h5>
          <h5>Wallet: {web3Wallet}</h5>
          <h5>ChainId: {web3ChainId}</h5>
        </Card.Body>
      </Card>
      {/* <h3>{`Account: ${truncateAddress(account)}`}</h3>
      <h3>{`Network ID: ${chainId ? chainId : "No Network"}`}</h3>
      <Button onClick={switchNetwork} isDisabled={!network}>
        Switch Network
      </Button> */}
      {/* <select placeholder="Select network" onChange={handleNetwork}>
        <option value="3">Ropsten</option>
        <option value="4">Rinkeby</option>
        <option value="42">Kovan</option>
        <option value="1666600000">Harmony</option>
        <option value="42220">Celo</option>
      </select> */}
    </div>
  );
}

export default App;
