import { ethers } from 'ethers'
export type Web3UserState = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any
    web3Provider: ethers.providers.Web3Provider | null | undefined
    signer: (() => Promise<void>) | null
    // signer: any | null
    address: string | null | undefined
    network: ethers.providers.Network | null | undefined
    connect: (() => Promise<void>) | null
    disconnect: (() => Promise<void>) | null
}

export type Web3UserAction = 
    | {
        type: "SET_WEB3_STATE"
        payload: Web3UserState
      }
    | {
        type: "SET_WEB3_ADDRESS"
        payload: {address:Web3UserState["address"]}
    }
    | {
        type: "SET_WEB3_NETWORK"
        payload: {network:Web3UserState["network"]}
      }
    | {
        type: "RESET_WEB3_STATE"
    }