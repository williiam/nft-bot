// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'
import axios from 'axios';
import { toast } from 'react-toastify'

// shared
import API from '../../../common/api'

// actions
import { setWeb3UserState,resetWeb3UserState,setIsLoggedIn } from './index'

/**
 * 給定provider，取得web3UserState
 * 並登入到NFT.bot，
 * 登入成功後，將web3UserState存入redux
 * 登入失敗則不做事
 * @param {provider} provider - the provider returned from web3Modal
 */
export const login = createAsyncThunk('NFTbot/login', async (payload,thunkAPI) => {
  const { provider } = payload
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()
  toast.success('Connected to Web3')
  toast.info('正在登入NFT BOT')

  const postBody = {
    address,
    network:network.name
  }

  const loginResponse = await API.POST('/api/user/login',postBody,signer);
  console.log('loginResponse :', loginResponse);
  
  const web3UserData = {
    provider,
    web3Provider,
    signer,
    address,
    network
  }

  if(loginResponse&&loginResponse.data==="Login success"){
    toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    thunkAPI.dispatch(setWeb3UserState({web3UserData}))
    thunkAPI.dispatch(setIsLoggedIn({isLoggedIn:true}))
  }

  return web3UserData;
});
