/* eslint-disable @typescript-eslint/no-unused-vars */
// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// library
import { ethers } from 'ethers'

// imports
import type { RootState } from '../../store';

// actions
import { switchToHome,switchToWhale,switchToTrace,switchToWallet,switchToUserSetting } from './actions';

export type Section = {
  name: 'HOME'|'WHALE'|'TRACE'|'WALLET'|'USER_SETTING',
  permission: 'REQUIRED_LOGIN' | 'PUBLIC'
  config?: any | undefined | null
} 

export type SectionManagement = {
  currentSection: Section,
  isChanging: false,
  error: false
};

const initialState: SectionManagement = {
  currentSection: { name:'HOME',permission:'REQUIRED_LOGIN' },
  isChanging: false,
  error: false
};

export const sectionSlice = createSlice({
  name: 'web3UserData',
  initialState,
  reducers: {
    setCurrentSection: (state,action:PayloadAction<Section>) => {
      console.log('action :', action);
      state.currentSection = action.payload.selectedSection;
    },
    resetCurrentSection: () => initialState,
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  extraReducers: (builder) => {
    builder
    .addCase(switchToHome.pending, (state) => {
    })
    .addCase(switchToHome.fulfilled, (state, { payload }) => {
    })
    .addCase(switchToHome.rejected, (state) => {
    })
    .addCase(switchToWhale.pending, (state) => {
    })
    .addCase(switchToWhale.fulfilled, (state, { payload }) => {
    })
    .addCase(switchToWhale.rejected, (state) => {
    })
    .addCase(switchToTrace.pending, (state) => {
    })
    .addCase(switchToTrace.fulfilled, (state, { payload }) => {
    })
    .addCase(switchToTrace.rejected, (state) => {
    })
    .addCase(switchToWallet.pending, (state) => {
    })
    .addCase(switchToWallet.fulfilled, (state, { payload }) => {
    })
    .addCase(switchToWallet.rejected, (state) => {
    })
    .addCase(switchToUserSetting.pending, (state) => {
    })
    .addCase(switchToUserSetting.fulfilled, (state, { payload }) => {
    })
    .addCase(switchToUserSetting.rejected, (state) => {
    })
  }
});

export default sectionSlice.reducer;
export const { setCurrentSection, resetCurrentSection } = sectionSlice.actions