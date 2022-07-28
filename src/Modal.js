import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Wallets } from "./constants/walletList";
import { ClearStorage } from "./utils/clearStorage";
import { binance } from "./walletServices/binance";
import { coinbase } from "./walletServices/coinBase";
import { formatic } from "./walletServices/formatic";
import { metaMask } from "./walletServices/metamask";
import { trustWallet } from "./walletServices/trustWallet";
import { walletConnect, walletConnectProvider } from "./walletServices/walletConnect";

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
    if (window?.ethereum?.isTrust || window?.solana?.isTrust) {
      trustWallet.onConnect({ closeModal, ...props });
    } else {
      walletConnectButton();
    }
  };

  // onConnect Binance Wallet...
  const binanceButton = async () => {
    await binance.onConnect({ closeModal, ...props });
  };

  // onConnect WalletConnect Wallet...
  const walletConnectButton = async () => {
    await walletConnect.onConnect({ closeModal, ...props });
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
    await ClearStorage(); // clearing all local storage
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
    walletConnectProvider?.on("accountsChanged", () => {
      walletConnectButton();
    });

    // Subscribe to chainId change
    walletConnectProvider?.on("chainChanged", () => {
      walletConnectButton();
    });

    // Subscribe to session disconnection
    walletConnectProvider?.on("disconnect", async () => {
      // console.log(code, reason);
      await walletConnectProvider?.disconnect();
      disconnect();
    });
    // eslint-disable-next-line
  }, []);

  // useEffect for metmask wallet Listner
  useEffect(() => {
    window?.ethereum?.on("chainChanged", metamaskButton);
    window?.ethereum?.on("accountsChanged", metamaskButton);
    return () => {
      window?.ethereum?.removeListener("chainChanged", metamaskButton);
      window?.ethereum?.removeListener("accountsChanged", metamaskButton);
    };
    // eslint-disable-next-line
  }, []);

  // useEffect for BinanceChain wallet Listner
  useEffect(() => {
    window?.BinanceChain?.on("chainChanged", binanceButton);
    window?.BinanceChain?.on("accountsChanged", binanceButton);
    // eslint-disable-next-line
  }, []);
  // window.ethereum.isTrust

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
          <p className="text-center">
            <h4 className="mb-3">Select a Network </h4>
          </p>
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
