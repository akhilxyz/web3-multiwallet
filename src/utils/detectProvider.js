
export const detectProvider = async () => {
    return localStorage.getItem("provider")
}

export const addPrivider = async (web3Provider) => {
    localStorage.setItem("provider", web3Provider)
}