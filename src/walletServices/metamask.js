import Web3 from "web3";

const onConnect = async ({ closeModal, setWeb3ChainId, setWeb3Account, setWeb3Wallet, setWeb3Library }) => {
    if (typeof window?.ethereum !== "undefined") {
        try {
            const library = new Web3(Web3.givenProvider)
            const account = await window.ethereum.request({ method: "eth_requestAccounts" });
            const chainId = await window.ethereum.networkVersion
            if (account && account.length > 0) {
                setWeb3Wallet("MetaMask");
                setWeb3Account(account[0]);
                setWeb3Library(library);
                setWeb3ChainId(chainId);
                closeModal()
            }
        } catch (error) {
            console.log("error", "Something went wrong !");
        }
    } else {
        console.log("error", "Please Install metamask Extention");
    }
}


export const metaMask = {
    onConnect
}