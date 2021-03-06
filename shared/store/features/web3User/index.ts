// redux
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// library
import { ethers } from 'ethers'

// imports
import type { RootState } from '../../store';
import { login,logout } from './actions';

export type Web3UserData = {
    provider: any
    web3Provider: ethers.providers.Web3Provider | null | undefined
    signer: (() => Promise<void>) | null
    address: string | null | undefined
    network: ethers.providers.Network | null | undefined
    connect: (() => Promise<void>) | null
    disconnect: (() => Promise<void>) | null
};

export type Web3UserState = {
  state: Web3UserData;
  isLoggedIn: boolean;
  pending: boolean;
  error: boolean;
};

const initialState: Web3UserState = {
  state: {
    provider: null,
    web3Provider: null,
    address: null,
    network: null,
    signer: null,
    connect: null,
    disconnect: null,
  },
  isLoggedIn: false,
  pending: false,
  error: false,
};

export const web3UserSlice = createSlice({
  name: 'web3UserData',
  initialState,
  reducers: {
    setWeb3UserState: (state,action:PayloadAction<Web3UserData>) => {
      console.log('action :', action);
      state.state=action.payload.web3UserData;
      // return Object.assign(state.data, action.payload)
    },
    resetWeb3UserState: () => initialState,
    setIsLoggedIn: (state,action:PayloadAction<boolean>) => {
      console.log('action :', action);
      if(action.payload.isLoggedIn===false){
        state=initialState
      }
      state.isLoggedIn=action.payload.isLoggedIn;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.pending = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        // state.state = payload;
      })
      .addCase(login.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(logout.pending, () => {
      })
      .addCase(logout.fulfilled, () => {
      })
      .addCase(logout.rejected, () => {
      });
  },
});

export default web3UserSlice.reducer;
export const { setWeb3UserState, resetWeb3UserState,setIsLoggedIn } = web3UserSlice.actions