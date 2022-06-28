import { useEffect, useReducer, useCallback } from 'react'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

// redux
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login,logout } from '../store/features/web3User/actions'

// router
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { Toast } from '../common/toast'

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
  
  useEffect(() => {

    // 若使用者已登入，則將route切換到'/main'
    if (isLoggedIn&&provider) {
      router.push('./main')
    }
  }, [isLoggedIn])

  const connect = useCallback(async () => {
    console.log('web3Modal :', web3Modal);
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect() //metamask , coinbase ...
        dispatch(login({ type:"web3User/NFTbot/login",provider:provider }));
        console.log('isLoggedIn :', isLoggedIn);
        if(!isLoggedIn){
          // Toast.error('登入NFT.bot失敗');
          return;
        }
        // router.push('./main')
      } catch (e) {
        Toast.error('登入NFT.bot失敗');
        console.log('connect error', e)
      }
    } else {
      console.error('No Web3Modal')
    }
  }, [])


  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      toast.error('Disconnected from Web3')
      dispatch(logout());
    } else {
      console.error('No Web3Modal')
    }
  }, [])

  //   Auto connect to the cached provider
  // useEffect(() => {
  // if (web3Modal && web3Modal.cachedProvider) {
  //     connect()
  // }
  // }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch(logout());
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log('switched to chain...', _hexChainId)
          toast.info('Web3 Network Changed')
          dispatch(logout());
          window.location.assign(window.location.origin);
        } else {
          console.log('window is undefined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return {
    connect,
    disconnect
  }
}
