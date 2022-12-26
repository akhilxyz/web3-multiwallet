import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Wallets } from "./constants/walletList";
import { detectDevice } from "./utils/detectDevice";
import { detectProvider } from "./utils/detectProvider";
import {
  BinanceListner,
  coinBaseListner,
  MetaMaskListner,
  TrustWalletListner,
  WalletConnectListner,
} from "./utils/listners";
import { binance } from "./walletServices/binance";
import { coinbase } from "./walletServices/coinBase";
import { formatic } from "./walletServices/formatic";
import { metaMask } from "./walletServices/metamask";
import { trustWallet } from "./walletServices/trustWallet";
import { walletConnect } from "./walletServices/walletConnect";

export default function SelectWalletModal({
  isOpen,
  closeModal,
  disconnect,
  ...props
}) {
  // connect to METAMASK...
  const metamaskButton = async () => {
    await metaMask.onConnect({ closeModal, ...props });
  };

  // connect to TRUST WALLET...
  const trustWalletButton = async () => {
    // console.log("errrrrrr", window?.trustwallet)
    const detectMobile = detectDevice()
    if (detectMobile) {
      if (window?.trustwallet?.isTrust || window.trustwallet.solana.isTrust) {
        trustWallet.onConnect({ closeModal, ...props });
      } else {
        walletConnectButton("TrustWallet");
      }
    } else {
      trustWallet.onConnectDesktop({ closeModal, ...props })
    }
  };

  // onConnect Binance Wallet...
  const binanceButton = async () => {
    await binance.onConnect({ closeModal, ...props });
  };

  // onConnect WalletConnect Wallet...
  const walletConnectButton = async (isTrust) => {
    await walletConnect.onConnect({ closeModal, isTrust, ...props });
  };

  // onConnect formatic Wallet...
  const formaticButton = async () => {
    await formatic.onConnect({ closeModal, ...props });
  };

  // onConnect coinBase Wallet...
  const coinbaseButton = async () => {
    await coinbase.onConnect({ closeModal, ...props });
  };

  // on Connect wallet
  const onClickWallet = async (id) => {
    switch (id) {
      case 1:
        await metamaskButton();
        break;
      case 2:
        await binanceButton();
        break;
      case 3:
        await walletConnectButton();
        break;
      case 4:
        await trustWalletButton();
        break;
      case 5:
        await formaticButton();
        break;
      case 6:
        await coinbaseButton();
        break;
      default:
      // Toasty("Feature Not Supported")
      // code block
    }
  };

  // useEffect for walletConnect Listner
  useEffect(() => {
    detectPriovider()
    if (props.web3Wallet === "MetaMask") {
      MetaMaskListner(metamaskButton, disconnect);
    } else if (props.web3Wallet === "Binance") {
      BinanceListner(binanceButton, disconnect);
    } else if (props.web3Wallet === "WalletConnect") {
      WalletConnectListner(walletConnectButton, disconnect);
    } else if (props.web3Wallet === "CoinBase") {
      coinBaseListner(coinbaseButton, disconnect);
    } else if (props.web3Wallet === "TrustWallet") {
      window?.ethereum?.isTrust
        ? TrustWalletListner(trustWalletButton, disconnect, true)
        : TrustWalletListner(trustWalletButton, disconnect);
    }
  }, [props?.web3Wallet]);

  const detectPriovider = async () => {
    const provider = await detectProvider()
    if (provider === "MetaMask") {
      metamaskButton();
    } else if (provider === "Binance") {
      binanceButton();
    } else if (provider === "WalletConnect") {
      walletConnectButton();
    } else if (provider === "CoinBase") {
      coinbaseButton();
    } else if (provider === "TrustWallet") {
      trustWalletButton()
    } else if (provider === "Formatic") {
      formaticButton()
    }
  }

  return (
    <>
      <Modal
        show={isOpen}
        centered
        onHide={closeModal}
        className="networkModal"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <h4 className="mb-3 text-center">Select a Network </h4>
          <Row>
            <Col className="baseToken_style">
              <ul>
                {Wallets.map((wal, idx) => {
                  return (
                    <li key={wal.name + idx}>
                      <Button
                        className="networkBtn mb-2 w-100 text-left"
                        variant="primary"
                        onClick={() => onClickWallet(wal.id)}
                      >
                        <img
                          src={wal.icon}
                          width="50 ms-3"
                          alt={wal.name + "_icon"}
                        />

                        {wal.name}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
