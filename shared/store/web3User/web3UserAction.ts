import { ethers } from 'ethers'
import { Web3UserState,Web3UserAction } from './web3UserTypes'
import API from '../../common/api'
import { DataToSign } from '../../common/types'

import { toast } from 'react-toastify'


const login = async (signer) => {
  console.log('signer :', signer);
  const address = await signer.getAddress()
  const network = await signer.getNetwork()
  const postBody: DataToSign = {
    address,
    network
  }
  toast.info('正在登入NFT BOT')
  const loginResponse = await API.POST('/api/user/login', postBody, signer);
  console.log('loginResponse :', loginResponse);
  if (loginResponse.data !== "Login success") {
    toast.error('登入NFT.bot失敗');
    return {
      loginSuccess: false
    }
  }
  toast.success('登入NFT bot成功')
  return {
    loginSuccess: true,
    userData: {}
  }
}

/**
 * 將web3Provider存到redux裡
 * @param { provider } payload - Web3ProviderState
 */
export const setWeb3UserState = (payload) => async (dispatch,getState) => {
  try {
    console.log('payload :', payload);
    const { provider } = payload; 
    const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
    const signer = await web3Provider.getSigner()
    const network = await web3Provider.getNetwork()
    const address = await signer.getAddress()
    debugger
    // 登入NFT.bot成功才存入store(將store內的web3State視為server回傳的使用者資料)
    const { loginSuccess } = await login(signer);
    
    if(!loginSuccess){
      return
    }

    const web3State = {
      provider:provider,
      web3Provider:web3Provider,
      signer:signer,
      network:network,
      address:address
    }
    console.log('web3State :', web3State);
    dispatch({
      type: "SET_WEB3_STATE",
      payload: web3State
    } as web3ProviderAction);
  } catch (error) {
  console.log('error :', error);
    
    dispatch({
      type: "RESET_WEB3_STATE"
    });
    
    dispatch({
      type: "ERROR",
      payload: error
    });
  }
};

/**
 * 清洗web3UserState為nul
 * @param {ethers.providers.Network} payload - Web3ProviderState
 */
 export const resetWeb3UserState = () => async (dispatch:any) => {
  try {
    dispatch({
      type: "RESET_WEB3_STATE",
    } as web3ProviderAction);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "error message",
    });
  }
};

/**
 * 設定web3的address
 * @param { Web3ProviderState["address"]} payload - Web3ProviderState
 */
export const setWeb3Address = (payload: {address:Web3ProviderState["address"]}) => async (dispatch:any) => {
  try {
    dispatch({
      type: "SET_WEB3_ADDRESS",
      payload: payload
    } as web3ProviderAction);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "error message",
    });
  }
};

/**
 * 設定web3的address
 * @param {ethers.providers.Network} payload - Web3ProviderState
 */
 export const setWeb3Network = (payload: ethers.providers.Network) => async (dispatch:any) => {
  try {
    dispatch({
      type: "SET_WEB3_NETWORK",
      payload: payload,
    } as web3ProviderAction);
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "error message",
    });
  }
};
