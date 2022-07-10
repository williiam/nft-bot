// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'

// shared
import { Toast } from '../../../common/toast'
import { toast } from 'react-toastify'
import API, { postBody } from '../../../common/api'

import { web3Modal } from '../../../common/Web3Modal';

// actions
import { setWeb3UserState, resetWeb3UserState, setIsLoggedIn } from './index'

// router
import Router from 'next/router'
import { IProviderInfo } from 'web3modal';

/**
 * 給定provider，取得web3UserState
 * 並登入到NFT.bot，
 * 登入成功後，將web3UserState存入redux
 * 登入失敗則不做事
 * @param {provider} provider - the provider returned from web3Modal
 */
export const login = createAsyncThunk('NFTbot/login', async (payload: { provider: IProviderInfo }, thunkAPI) => {
  const { provider } = payload
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()
  Toast.success('已連線到Web3')

  const postBody: postBody = {
    address,
    network: network.name
  }

  const loginResponse = await toast.promise(
    API.POST('/api/user/login', postBody, signer),
    {
      pending: {
        render(){
          return "正在等候簽署登入訊息"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      success: {
        render({ data }) {
          return `登入NFT.bot成功`
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: "🟢"
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return "登入失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )

  // server 爆了 先用假的response
  // const loginResponse = {
  //   data:"Login success"
  // }
  console.log('loginResponse :', loginResponse);

  const web3UserData = {
    provider,
    web3Provider,
    signer,
    address,
    network
  }

  if (loginResponse && loginResponse.data === "Login success") {
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    await thunkAPI.dispatch(setWeb3UserState({ web3UserData }))
    await thunkAPI.dispatch(getTgSubscribeMsg())
    await thunkAPI.dispatch(setIsLoggedIn({ isLoggedIn: true }))
    Router.push('/main')
  }

  return web3UserData;
});


/**
 * 取得使用者訂閱token(使用者須自行複製到telegram貼上)
 * @param {provider} provider - the provider returned from web3Modal
 */
export const getTgSubscribeMsg = createAsyncThunk('NFTbot/getTgSubscribeMsg', async (payload: { provider: IProviderInfo }, thunkAPI) => {
  const { provider } = await thunkAPI.getState().web3User.state;

  if (provider == undefined || provider === null) {
    console.log("no provider")
    await thunkAPI.dispatch(logout())
    return { success: false };
  }
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()

  const postBody: postBody = {
    address,
    network: network.name
  }

  const getTgSubscribeMsgResponse = await toast.promise(
    API.POST('/api/user/getTgSubscribeMsg', postBody, signer),
    {
      pending: {
        render() {
          return "正在等候簽署登入訊息"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      success: {
        render({ data }) {
          return `取得訂閱通知訊息成功`
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: "🟢"
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return "登入失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )

  // server 爆了 先用假的response
  // const loginResponse = {
  //   data:"Login success"
  // }
  console.log('getTgSubscribeMsgResponse :', getTgSubscribeMsgResponse);

  const web3UserData = {
    provider,
    web3Provider,
    signer,
    address,
    network
  }

  if (getTgSubscribeMsgResponse) {
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    thunkAPI.dispatch(setWeb3UserState({ web3UserData }))
    return { tgSubscribeToken: getTgSubscribeMsgResponse.data.result }
  }

  // TODO: 處理失敗管線

});

/**
 * 登出使用者(沒有登出API可以打)
 * @param {provider} provider - the provider returned from web3Modal
 */
export const logout = createAsyncThunk('NFTbot/logout', async (payload, thunkAPI) => {
  thunkAPI.dispatch(resetWeb3UserState())
  Router.push('/')
});