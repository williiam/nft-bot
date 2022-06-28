// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'
import axios from 'axios';
import { toast } from 'react-toastify'

// shared
import API from '../../../common/api'
import { Toast } from '../../../common/toast'

// actions
import { setWeb3UserState,resetWeb3UserState,setIsLoggedIn } from './index'

// router
import Router from 'next/router'

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
  Toast.success('Connected to Web3')

  const postBody = {
    address,
    network:network.name
  }

  // const loginResponse = await toast.promise(
  //   API.POST('/api/user/login',postBody,signer),
  //   {
  //     pending: {
  //       render(){
  //         return "正在登入NFT.bot"
  //       },
  //       position: "bottom-right",
  //       hideProgressBar: false,
  //       draggable: true,
  //       icon: false
  //     },
  //     success: {
  //       render({data}){
  //         return `登入NFT.bot成功`
  //       },
  //       position: "bottom-right",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       icon: "🟢"
  //     },
  //     error: {
  //       render({data}){
  //         // When the promise reject, data will contains the error
  //         return "登入失敗 🤯"
  //       },
  //       position: "bottom-right",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     }
  //   }
  // )

  // server 爆了 先用假的response
  const loginResponse = {
    data:"Login success"
  }
  console.log('loginResponse :', loginResponse);
  
  const web3UserData = {
    provider,
    web3Provider,
    signer,
    address,
    network
  }

  if(loginResponse&&loginResponse.data==="Login success"){
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    thunkAPI.dispatch(setWeb3UserState({web3UserData}))
    thunkAPI.dispatch(setIsLoggedIn({isLoggedIn:true}))
    Router.push('/main')
  }

  return web3UserData;
});

/**
 * 登出使用者(沒有登出API可以打)
 * @param {provider} provider - the provider returned from web3Modal
 */
 export const logout = createAsyncThunk('NFTbot/logout', async (payload,thunkAPI) => {
  thunkAPI.dispatch(resetWeb3UserState())
  Router.push('/')
});