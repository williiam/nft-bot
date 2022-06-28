import { useEffect, useReducer, useCallback } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

// redux
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/features/web3User/actions'

// router
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  }
}

let web3Modal: Web3Modal | null
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    theme: {
      background: "rgb(39, 49, 56)",
      main: "rgb(199, 199, 199)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(16, 26, 32)"
    }
  })
}

export const useWeb3 = () => {
  const dispatch = useAppDispatch();
  const { state, isLoggedIn, pending, error } = useAppSelector((state) => state.web3User);
  const { provider, web3Provider, address, network } = state
  const router = useRouter()
  

  const connect = useCallback(async () => {
    console.log('web3Modal :', web3Modal);
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect() //metamask , coinbase ...
        dispatch(login({ provider:provider }));
        if(!isLoggedIn){
          toast.error('登入NFT.bot失敗');
          return;
        }
        router.push('./main')
      } catch (e) {
        toast.error('登入NFT.bot失敗');
        console.log('connect error', e)
      }
    } else {
      console.error('No Web3Modal')
    }
  }, [])

  return {
    connect,
  }
}
