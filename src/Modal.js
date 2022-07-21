import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { metaMask } from "./walletServices/metamask";

export default function SelectWalletModal({ isOpen, closeModal, ...props }) {

    // connect to METAMASK...
    const metamaskButton = async () => {
        await metaMask.onConnect({ closeModal, ...props })
    };

    return (
        <>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        className="ms-2"
                        variant="primary"
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Coinbase Wallet
                    </Button>

                    <Button
                        variant="primary"
                        className="ms-2"
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        walletConnect
                    </Button>

                    <Button
                        variant="primary"
                        className="ms-2"
                        onClick={metamaskButton}
                    >
                        MetaMask
                    </Button>


                </Modal.Body>
            </Modal>
        </>
    );
}