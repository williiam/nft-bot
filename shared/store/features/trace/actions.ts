// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'

// shared
import { Toast } from '../../../common/toast'
import toast from 'react-toastify'
import API,{postBody} from '../../../common/api'

import { setTraceWhaleList } from './index'

import { logout } from '../web3User/index'



// router
import Router from 'next/router'
import { IProviderInfo } from 'web3modal';

/**
 * 取得追蹤大戶
 */
export const getTraceWhaleList = createAsyncThunk('NFTbot/trace/whale/get', async (payload,thunkAPI) => {
  const { provider } = thunkAPI.getState().web3User;
  if(!provider) {
    console.log("no provider")
    thunkAPI.dispatch(logout())
    return
  }
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const address = await signer.getAddress()

  const postBody:postBody = {
    address
  }

  const getTraceWhaleResponse = await toast.promise(
    API.POST('/api/trace/list',postBody,signer),
    {
      pending: {
        render(){
          return "取得資料中"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      // success: {
      //   // render({data}){
      //   //   return `登入NFT.bot成功`
      //   // },
      //   position: "bottom-right",
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: "🟢"
      // },
      error: {
        render({data}){
          // When the promise reject, data will contains the error
          return "取得資料中失敗 🤯"
        },
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    }
  )

  if(getTraceWhaleResponse&&getTraceWhaleResponse.success){
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    const { result } = getTraceWhaleResponse;
    thunkAPI.dispatch(setTraceWhaleList({traceWhaleList: result}))
  }
});

/**
 * 新增追蹤大戶
 * @param {whaleAddress} whaleAddress - the provider returned from web3Modal
 */
 export const addTraceWhale = createAsyncThunk('NFTbot/trace/whale/add', async (payload,thunkAPI) => {
  const { whaleAddress,nickname } = payload;
  const { provider } = thunkAPI.getState().web3User;
  if(!provider) {
    console.log("no provider")
    thunkAPI.dispatch(logout())
    return
  }
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()
  Toast.success('get provider DONE')

  const postBody:postBody = {
    user: address,
    address: whaleAddress,
    nikename: nickname?nickname:""
  }

  const addTraceWhaleResponse = await toast.promise(
    API.POST('/api/trace/add',postBody,signer),
    {
      pending: {
        render(){
          return "取得資料中"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      // success: {
      //   // render({data}){
      //   //   return `加入大戶清單成功`
      //   // },
      //   position: "bottom-right",
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: "🟢"
      // },
      error: {
        render({data}){
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
  debugger;
  Toast.success('AJAX DONE')

  if(addTraceWhaleResponse&&addTraceWhaleResponse.success){
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    const { result } = addTraceWhaleResponse;
    Toast.success('新增大戶成功')
    thunkAPI.dispatch(getTraceWhaleList())
  }
});

/**
 * 刪除追蹤大戶
 * @param {whaleAddress} whaleAddress - the provider returned from web3Modal
 */
 export const deleteTraceWhale = createAsyncThunk('NFTbot/trace/whale/delete', async (payload,thunkAPI) => {
  const { whaleAddress } = payload;
  const { provider } = thunkAPI.getState().web3User;
  if(!provider) {
    console.log("no provider")
    thunkAPI.dispatch(logout())
    return
  }
  const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
  const signer = await web3Provider.getSigner()
  const network = await web3Provider.getNetwork()
  const address = await signer.getAddress()

  const postBody:postBody = {
    user: address,
    address: whaleAddress
  }

  const deleteTraceWhaleResponse = await toast.promise(
    API.POST('/api/trace/delete',postBody,signer),
    {
      pending: {
        render(){
          return "刪除大戶中"
        },
        position: "bottom-right",
        hideProgressBar: false,
        draggable: true,
        icon: false
      },
      // success: {
      //   render({data}){
      //     return `刪除大戶成功`
      //   },
      //   position: "bottom-right",
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: "🟢"
      // },
      error: {
        render({data}){
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

  if(deleteTraceWhaleResponse&&deleteTraceWhaleResponse.success){
    // toast.success('登入NFT.bot 成功');
    // dispatch登入成功(pageFlow)
    // thunkAPI.dispatch(setPageFlow("home"))
    const { result } = deleteTraceWhaleResponse;
    Toast.success('新增大戶成功')
    thunkAPI.dispatch(getTraceWhaleList())
  }
});