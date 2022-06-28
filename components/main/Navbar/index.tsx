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
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { switchToHome,switchToWhale,switchToTrace,switchToWallet } from '../../../shared/store/features/section/actions'

// component
import Menu from './menu'
import DropdownComponent from './dropdown'

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

const NavMenu = () => {
  return (
    <NavItem>
      <Button auto color="gradient" ghost css={{ fs: '1', fg: '2' }}>
        <Text css={{ fs: '$space$9', color: '$fontColor' }}>{'大戶清單'}</Text>
      </Button>
      <Button
        auto
        color="gradient"
        ghost
        css={{ flexShrink: '1', flexGrow: '2' }}
      >
        <Text css={{ fs: '$space$9', color: '$fontColor' }}>{'我的跟單'}</Text>
      </Button>
      <Button
        auto
        color="gradient"
        ghost
        css={{ flexShrink: '1', flexGrow: '2' }}
      >
        <Text css={{ fs: '$space$9', color: '$fontColor' }}>{'錢包管理'}</Text>
      </Button>
    </NavItem>
  )
}

const DropDown = () => {
  const { theme, setTheme } = useNextTheme()
  const themeSetting = useTheme()
  const nowTheme = themeSetting.theme

  const toggleTheme = () => {
    const newThemeStr = getToggleTheme(theme)
    setTheme(newThemeStr)
  }

  const onClickMenuAction = (actionName) => {
    switch (actionName) {
      case 'darkmode':
        toggleTheme()
        break
      default:
        break
    }
    return
  }

  const address="test"
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
            {address?.slice(0, 7)}...{address?.slice(-6, -1)}
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

const sections = [
  {

  }
]

const NavBar = () => {
  const { isDark, type } = useTheme()
  const dispatch = useAppDispatch();
  const { state, isLoggedIn, pending } = useAppSelector((state) => state.web3User);
  const { currentSection, isChanging, error } = useAppSelector((state) => state.section);
  // const { provider, web3Provider, address, network } = state
  const router = useRouter()

  return (
    <nav
      // style={{
      //   overflow: 'hidden',
      //   position: 'fixed',
      //   top: '0px',
      //   zIndex: '9999',
      // }}
    >
      <Grid.Container
        gap={0.5}
        justify="space-evenly"
        css={{
          py: '0',
          my: '0',
          // mt: '$2',
          // h:'$space$1',
          color: '$layer9',
          // bc: '$layer0',
          bc: '$layer0',
          p: 'fixed',
          overflow: 'hidden',
          position: 'fixed' /* Set the navbar to fixed position */,
          t: 0 /* Position the navbar at the top of the page */,
          zIndex: '9999',
          // display:'block'
        }}
      >
        <Grid xs={0} md={0}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
            >
              <AiFillHome />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={2} sm={2} md={1}>
          <NavItem>
            <Button
              as="div"
              auto
              color="gradient"
              ghost
              css={{ flexGrow: '2' }}
              onClick={(e) => {
                e.preventDefault()
                dispatch(switchToHome())
                // router.push('/')
              }}
            >
              <AiFillHome size="1.8rem" />
            </Button>
          </NavItem>
        </Grid>
        <Grid xs={10} sm={8} md={9}>
          <Menu />
        </Grid>
        <Grid xs={12} sm={2}>
          <NavItem>
            <DropdownComponent />
          </NavItem>
        </Grid>
      </Grid.Container>
    </nav>
  )
}

export default NavBar
