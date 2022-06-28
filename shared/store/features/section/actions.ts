// redux
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// external library
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

// shared
import API from '../../../common/api'
import { Toast } from '../../../common/toast'

// actions
import { setCurrentSection, resetCurrentSection } from './index'

// router
import Router from 'next/router'

// typing
import { Section } from './';


const HomeSection : Section = {
  name: 'HOME',
  permission: 'REQUIRED_LOGIN',
  config: {}
}
const WhaleSection : Section = {
  name: 'WHALE',
  permission: 'REQUIRED_LOGIN',
  config: {}
}
const TraceSection : Section = {
  name: 'TRACE',
  permission: 'REQUIRED_LOGIN',
  config: {}
}
const WalletSection : Section = {
  name: 'WALLET',
  permission: 'REQUIRED_LOGIN',
  config: {}
}

/**
 * 切換到首頁
 */
export const switchToHome = createAsyncThunk('section/switch/home', async (payload,thunkAPI) => {
  const { provider } = thunkAPI.getState().web3User;
  
  if(provider) {
    // TODO >>> 取得最新資料，因為web3Modal回傳的provider可以設定onXXX事件，好像不用重抓

    // const web3Provider = new ethers.providers.Web3Provider(provider) // 該供應商的library
    // const signer = await web3Provider.getSigner()
    // const network = await web3Provider.getNetwork()
    // const address = await signer.getAddress()
  }

  thunkAPI.dispatch(setCurrentSection({selectedSection:HomeSection}))
});
/**
 * 切換到大戶清單
 */
export const switchToWhale = createAsyncThunk('section/switch/whale', async (payload,thunkAPI) => {
  const { provider } = thunkAPI.getState().web3User;
  
  if(provider) {
    // TODO >>> 取得最新資料，因為web3Modal回傳的provider可以設定onXXX事件，好像不用重抓
  }

  thunkAPI.dispatch(setCurrentSection({selectedSection:WhaleSection}))
});

/**
 * 切換到追蹤清單
 */
export const switchToTrace = createAsyncThunk('section/switch/trace', async (payload,thunkAPI) => {
  const { provider } = thunkAPI.getState().web3User;
  
  if(provider) {
    // TODO >>> 取得最新資料，因為web3Modal回傳的provider可以設定onXXX事件，好像不用重抓
  }

  thunkAPI.dispatch(setCurrentSection({selectedSection:TraceSection}))
});

/**
 * 切換到錢包
 */
export const switchToWallet = createAsyncThunk('section/switch/wallet', async (payload,thunkAPI) => {
  const { provider } = thunkAPI.getState().web3User;
  
  if(provider) {
    // TODO >>> 取得最新資料，因為web3Modal回傳的provider可以設定onXXX事件，好像不用重抓
  }

  thunkAPI.dispatch(setCurrentSection({selectedSection:WalletSection}))
});