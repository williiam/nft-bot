import React from 'react'

// UI
import {
  Container,
  Grid,
  Col,
  Row,
  Card,
  Text,
  Button,
  Link as LinkContainer,
  Spacer,
  styled
} from '@nextui-org/react'

import { useWeb3UserRedux } from '../shared/hooks/Web3UserRedux'
// import { useWeb3 } from '../shared/hooks/Web3UserContextOrigin'
import { useWeb3 } from '../shared/hooks/Web3UserRedux'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}

export const CardButton = styled(Button, {
  h: '$22',
  justyContent: 'center',
  color: '$primary-100',
  backgroundColor: '$info-400',
  backgroundImage: 'linear-gradient(#e66465, #9198e5);',
  '&:hover': {
    backgroundImage: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
    backgroundColor: '$info-300',
  }
})

const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <CardButton
      color="gradient"
      ghost
      css={{
        h: '$space$20',
        justyContent: 'center',
        color: '$primary-100',
        backgroundColor: '$info-400',
        backgroundImage: 'linear-gradient(#e66465, #9198e5);',
        '&:hover': {
          backgroundImage:
            'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
          backgroundColor: '$info-300',
        },
      }}
      onClick={() => {
        console.log('clickded')
        connect()
      }}
    >
      <Text
        h1
        weight="bold"
        css={{
          us: 'all',
          ta: 'left',
          fs: '$space$14',
          color: '$titleColor',
        }}
      >
        登入
      </Text>
    </CardButton>
  ) : (
    <CardButton>Loading...</CardButton>
  )
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <CardButton onClick={disconnect}>Disconnect</CardButton>
  ) : (
    <CardButton>Loading...</CardButton>
  )
}

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3()
  // console.log('{ web3Provider, connect, disconnect } :', {
  //   web3Provider,
  //   connect,
  //   disconnect,
  // })

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
