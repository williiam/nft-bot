import { Web3ProviderState,web3ProviderAction } from './web3UserTypes'

const Web3ProviderInitialState: Web3ProviderState  = {
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  signer: null,
  connect: null,
  disconnect: null,
};

const web3ProviderReducer = (state = Web3ProviderInitialState, action:web3ProviderAction) => {
  switch (action.type) {
    case 'SET_WEB3_STATE':
      return Object.assign({}, state, {
        provider: action.payload.provider,
        web3Provider: action.payload.web3Provider,
        signer: action.payload.signer,
        address: action.payload.address,
        network: action.payload.network
      });
      case 'SET_WEB3_ADDRESS':
        return Object.assign({}, state, {
          address: action.payload.address
        });
      case 'SET_WEB3_NETWORK':
        return Object.assign({}, state, {
          network: action.payload.network
        });
      case 'RESET_WEB3_STATE':
        return Web3ProviderInitialState
      default:
        return state
    }
};

export default web3ProviderReducer;
