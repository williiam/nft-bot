import { useEffect, useReducer, useCallback } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { DataToSign } from '../common/types'

import { toast } from 'react-toastify'

// redux
import { useDispatch, useSelector } from "react-redux";
import { setWeb3UserState,resetWeb3UserState } from "../store/web3User/web3UserAction";
import { Web3UserState,web3UserAction } from '../store/web3User/web3UserTypes'


// Theme
import { useTheme } from '@nextui-org/react'

// router
import { useRouter } from 'next/router'

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
    // cacheProvider: true,
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
  const web3UserState:Web3UserState = useSelector((state: any) => state.web3User)
  const { provider, web3Provider, address, network } = web3UserState
  const dispatchReduxAction = useDispatch()
  const { isDark } = useTheme()
  const router = useRouter()

  const connect = useCallback(async () => {
    if (web3Modal) {
    console.log('web3Modal :', web3Modal);
      try {
        const provider = await web3Modal.connect() //metamask , coinbase ...
        const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
        toast.success('Connected to Web3')
        // await dispatchReduxAction(setWeb3UserState({
        //   type: 'SET_WEB3_STATE',
        //   payload: newProvider
        // } as web3UserAction))
        // router.push('/');
      } catch (e) {
        toast.error('連線失敗')
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
      dispatch({
        type: 'RESET_WEB3_STATE',
      } as Web3Action)

      dispatchReduxAction(resetWeb3UserState({
        type: 'RESET_WEB3_STATE',
      } as web3UserAction))

    } else {
      console.error('No Web3Modal')
    }
  }, [])

  //  Auto connect to the cached provider
  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     connect()
  //   }
  // }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = async (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch({
          type: 'SET_WEB3_STATE',
          payload: provider,
        } as Web3Action)
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log('switched to chain...', _hexChainId)
          toast.info('Web3 Network Changed')
          dispatchReduxAction(resetWeb3UserState({
            type: 'RESET_WEB3_STATE',
          } as web3UserAction))
          window.location.reload()
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
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3UserState
}
