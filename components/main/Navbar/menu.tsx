import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../..'

// common
import { getToggleTheme } from '../../../shared/common/theme'

import React, { useEffect } from 'react'

// theme
import { AiFillHome } from 'react-icons/ai'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

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
  Avatar,
  Dropdown,
} from '@nextui-org/react'

// router
import { useRouter } from 'next/router'

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks'
import {
  switchToHome,
  switchToWhale,
  switchToTrace,
  switchToWallet,
} from '../../../shared/store/features/section/actions'

export const NavItem = ({ children }) => {
  return (
    <Card
      id="NavCard"
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '0.1',
        color: '$layer1',
      }}
    >
      {children}
    </Card>
  )
}

const Menu = () => {
  const { isDark, type } = useTheme()
  const dispatch = useAppDispatch()
  const { state, isLoggedIn, pending } = useAppSelector(
    (state) => state.web3User
  )
  const { currentSection, isChanging, error } = useAppSelector(
    (state) => state.section
  )
  // const { provider, web3Provider, address, network } = state
  const router = useRouter()

  return (
    <>
      <NavItem>
        <Button auto color="gradient" ghost css={{ fs: '1', fg: '2' }} onClick={()=>{dispatch(switchToWhale())}} >
          <Text css={{ fs: '$space$9', color: '$fontColor' }}>
            {'大戶清單'}
          </Text>
        </Button>
        <Button
          auto
          color="gradient"
          ghost
          css={{ flexShrink: '1', flexGrow: '2' }}
          onClick={()=>{dispatch(switchToTrace())}}
        >
          <Text css={{ fs: '$space$9', color: '$fontColor' }}>
            {'我的跟單'}
          </Text>
        </Button>
        <Button
          auto
          color="gradient"
          ghost
          css={{ flexShrink: '1', flexGrow: '2' }}
          onClick={()=>{dispatch(switchToWallet())}}
        >
          <Text css={{ fs: '$space$9', color: '$fontColor' }}>
            {'錢包管理'}
          </Text>
        </Button>
      </NavItem>
    </>
  )
}

export default Menu
