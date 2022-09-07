import { walletAddress } from "../utils/utils";

export let web3Wallet;
export let web3Account;
export let web3ChainId
export let web3Provider

export const setWeb3Wallet_ = (web3WalletName) => {
    web3Wallet = web3WalletName;
}

export const setWeb3Account_ = (web3AccountName) => {
    web3Account = walletAddress(web3AccountName)
}

export const setWeb3ChainId_ = (web3ChainIdName) => {
    web3ChainId = web3ChainIdName
}

export const setWeb3Provider_ = (web3ProviderName) => {
    web3Provider = web3ProviderName
}