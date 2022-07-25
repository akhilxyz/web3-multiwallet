import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { binance } from "./walletServices/binance";
import { metaMask } from "./walletServices/metamask";
import { walletConnect, walletConnectProvider } from "./walletServices/walletConnect";

export default function SelectWalletModal({ isOpen, closeModal, disconnect, ...props }) {

    // connect to METAMASK...
    const metamaskButton = async () => {
        await metaMask.onConnect({ closeModal, ...props })
    };

    // onConnect Binance Wallet... 
    const binanceButton = async () => {
        await binance.onConnect({ closeModal, ...props })
    };

    const walletConnectButton = async () => {
        await walletConnect.onConnect({ closeModal, ...props })
    };

    // useEffect for walletConnect Listner

    useEffect(() => {
        walletConnectProvider.on("accountsChanged", (accounts) => {
            walletConnectButton()
        });

        // Subscribe to chainId change
        walletConnectProvider.on("chainChanged", (chainId) => {
            walletConnectButton()
        });

        // Subscribe to session disconnection
        walletConnectProvider.on("disconnect", (code, reason) => {
            console.log(code, reason);
            disconnect()
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


    return (
        <>
            <Modal show={isOpen} centered onHide={closeModal} className="networkModal">
                <Modal.Header closeButton>
                    <Modal.Title>Select a Network </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        You are currently browsing on the MultiWallet Dpp
                    </p>
                    <Row>
                        <Col >
                            <Button
                                className="networkBtn mb-2 w-100 text-left"
                                variant="primary"
                                onClick={binanceButton}
                            >
                                Binance Wallet
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                className="networkBtn mb-2 w-100 text-left"
                                onClick={walletConnectButton}
                            >
                                walletConnect
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                className="networkBtn mb-2 w-100 text-left"
                                onClick={metamaskButton}
                            >
                                MetaMask
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}