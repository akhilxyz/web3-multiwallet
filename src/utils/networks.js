export const networkParams = {
    137: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: [
            "https://polygon-rpc.com/",
            "https://rpc-mainnet.matic.network",
            "https://matic-mainnet.chainstacklabs.com",
            "https://rpc-mainnet.maticvigil.com",
            "https://rpc-mainnet.matic.quiknode.pro",
            "https://matic-mainnet-full-rpc.bwarelabs.com",
        ],
        blockExplorerUrls: ["https://polygonscan.com/"],
        iconUrls: [],
    },
    1: {
        chainId: `0x${Number(1).toString(16)}`,
        chainName: "Ethereum mainnet",
        nativeCurrency: {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        rpcUrls: [
            "https://mainnet.infura.io/v3/f1897284517e40cebf3bf6e4caa68044",
            "wss://mainnet.infura.io/ws/v3/f1897284517e40cebf3bf6e4caa68044",
            "https://api.mycryptoapi.com/eth",
            "https://cloudflare-eth.com"
        ],
        blockExplorerUrls: ["https://etherscan.io"],
        bscNetworkId: "eth-mainnet",
        iconUrls: [],
    },
    56: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "BSC",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "wss://bsc-ws-node.nariox.org",
        ],
        blockExplorerUrls: ["https://bscscan.com/"],
        bscNetworkId: "bsc-mainnet",
        iconUrls: [],
    },
};
