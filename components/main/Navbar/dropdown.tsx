import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Key } from 'react'

// common
import { getToggleTheme } from '../../../shared/common/theme'

import React, { useEffect } from 'react'

// theme
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
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { logout } from '../../../shared/store/features/web3User/actions'

// hooks
import { useWeb3 } from '../../../shared/hooks/Web3User'

const DropDown = () => {
  const { isDark, type } = useTheme()
  const dispatch = useAppDispatch();
  const { disconnect } = useWeb3()
  const { state, isLoggedIn, pending } = useAppSelector((state) => state.web3User);
  const { currentSection, isChanging, error } = useAppSelector((state) => state.section);
  const { provider, web3Provider, address, network } = state
  const { theme, setTheme } = useNextTheme()
  const themeSetting = useTheme()
  const nowTheme = themeSetting.theme
  const router = useRouter()

  const toggleTheme = () => {
    const newThemeStr = getToggleTheme(theme)
    setTheme(newThemeStr)
  }

  const onClickMenuAction = (actionName: Key) => {
    switch (actionName) {
      case 'darkmode':
        toggleTheme()
        break
      case 'logout':
        disconnect()
        break
      default:
        break
    }
    return
  }

  return (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Button
          auto
          color="gradient"
          css={{
            width: '100%',
            color: '$textColor',
            // bc: `{nowTheme?}'':}`,
            backgroundImage: '$layer10',
            '&:hover': {
              color: '$layer7',
              backgroundImage: 'linear-gradient(#e66465, #9198e5);',
            },
          }}
        >
          <Text
            id="text"
            h5
            size="1.3rem"
            // color="$textColor"
            css={{
              mt: 0,
              textAlign: 'left',
              fs: '$space$10',
              color: '$titleColor',
            }}
          >
            {address?.slice(0, 5)}...{address?.slice(-5, -1)}
          </Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu
        color="secondary"
        aria-label="Avatar Actions"
        disabledKeys={['settings', 'help_and_feedback']}
        onAction={(action) => {
          onClickMenuAction(action)
        }}
      >
        <Dropdown.Item key="profile" css={{ height: '$18' }}>
          <Text b color="inherit" css={{ d: 'flex' }}>
            我的錢包地址
          </Text>
          <Text b color="inherit" css={{ d: 'flex' }}>
            {address?.slice(0, 5)}...{address?.slice(-5, -1)}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="darkmode" withDivider>
          {theme === 'dark' ? '深色模式:ON' : '深色模式:OFF'}
        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error" withDivider>
          登出
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown
