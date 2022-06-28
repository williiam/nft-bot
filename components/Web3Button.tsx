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
} from '@nextui-org/react'

import { useWeb3UserRedux } from '../shared/hooks/Web3UserRedux'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}

export const CardButton = ({children}) => {
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{
        h: '$22',
        justyContent: 'center',
        color: '$primary-100',
        backgroundColor: '$info-400',
        backgroundImage: 'linear-gradient(#e66465, #9198e5);',
        '&:hover': {
          backgroundImage: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
          backgroundColor: '$info-300'
        },
      }}
    >
      <Card.Body id="CardBody" css={{ justyContent: 'center' }}>
        <Text
          id="text"
          h3
          size={30}
          color="white"
          css={{ mt: 0, color: '$lightText', textAlign: 'center' }}
        >
          {children}
        </Text>
      </Card.Body>
    </Card>
  )
}

const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <CardButton color="gradient" ghost onClick={connect}>
      Connect
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
  const { web3Provider, connect, disconnect } = useWeb3UserRedux()
  console.log('{ web3Provider, connect, disconnect } :', { web3Provider, connect, disconnect });

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}
