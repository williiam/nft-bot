// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'

// shared
import web3Modal from '../../../common/Web3Modal';
import { Toast } from '../../../common/toast'
import { toast } from 'react-toastify'
import API, { postBody } from '../../../common/api'

import { setWalletList, setPending } from './index'

import { logout } from '../web3User/index'

// router
import Router from 'next/router'
import { IProviderInfo } from 'web3modal';

/**
 * 取得追蹤錢包
 */
export const getWalletList = createAsyncThunk('NFTbot/wallet/get', async (payload, thunkAPI) => {
  const { provider } = await thunkAPI.getState().web3User.state;
  const { pending, error } = await thunkAPI.getState().trace;
  console.log('thunkAPI.getState() :', thunkAPI.getState());
  if(pending) {
    Toast.info("重複操作,請稍後再試")
    return;
  }
  await thunkAPI.dispatch(setPending({ pending: true }))

  console.log('thunkAPI.getState() :', thunkAPI.getState());
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

  // TODO: 簽章改在這裡簽，因為要快取

  const getWalletResponse = await toast.promise(
    API.POST('/api/wallet/list', postBody, signer),
    {
      pending: {
        render() {
          return "取得錢包地址中"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      success: {
        render({data}){
          return `取得錢包地址成功`
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
          return "取得錢包地址失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )
  console.log('getWalletResponse :', getWalletResponse);

  if(getWalletResponse.status===200&&getWalletResponse.data.success) {
    const { result } = getWalletResponse.data;
    console.log('result :', result);
    thunkAPI.dispatch(setWalletList({ walletList: result }))
  }
});

/**
 * 新增追蹤錢包
 * @param {walletAddress} walletAddress - the provider returned from web3Modal
 */
export const addWallet = createAsyncThunk('NFTbot/trace/wallet/add', async (payload, thunkAPI) => {
  const { walletAddress, privateKey, priceLimit, nickname } = payload;
  const { provider } = await thunkAPI.getState().web3User.state;
  console.log('thunkAPI.getState() :', thunkAPI.getState());
  console.log('provider :', provider);

  if (provider == undefined || provider === null) {
    console.log("no provider")
    thunkAPI.dispatch(logout())
    return { success: false }
  }

  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()

  const postBody: postBody = {
    user: address,
    walletAddress, 
    privateKey, 
    priceLimit, 
    nickname: nickname ? nickname : "",
  }

  const addWalletResponse = await toast.promise(
    API.POST('/api/wallet/add', postBody, signer),
    {
      pending: {
        render() {
          return "正在新增錢包"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
  
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return "新增錢包失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )

  if (addWalletResponse && addWalletResponse.success) {
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    const { result } = addWalletResponse;
    Toast.success('新增錢包成功')
    thunkAPI.dispatch(getWalletList())
  }
  return result
});

/**
 * 刪除追蹤錢包
 * @param {walletAddress} walletAddress - the provider returned from web3Modal
 */
export const deleteWallet = createAsyncThunk('NFTbot/trace/wallet/delete', async (payload, thunkAPI) => {
  const { walletAddress } = payload;
  const { provider } = await thunkAPI.getState().web3User.state;
  console.log('thunkAPI.getState() :', thunkAPI.getState());
  console.log('provider :', provider);
  if (provider == undefined || provider === null) {
    console.log("no provider")
    await thunkAPI.dispatch(logout())
    return { success: false };
  }
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const address = await signer.getAddress()

  const postBody: postBody = {
    address: address,
    walletAddress: walletAddress
  }

  const deleteWalletResponse = await toast.promise(
    API.POST('/api/wallet/delete', postBody, signer),
    {
      pending: {
        render() {
          return "刪除錢包中"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      // success: {
      //   render({data}){
      //     return `刪除錢包成功`
      //   },
      //   position: "bottom-right",
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: "🟢"
      // },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return "取得資料失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )

  if (deleteWalletResponse && deleteWalletResponse.success) {
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    const { result } = deleteWalletResponse;
    Toast.success('刪除錢包成功')
    thunkAPI.dispatch(getWalletList())
  }
});