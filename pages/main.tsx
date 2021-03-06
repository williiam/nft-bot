import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components'

// component
import NavBar from '../components/main/Navbar'

// common
import { getToggleTheme } from '../shared/common/theme'

// UI
import {
  css,
  styled,
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
import { darkTheme } from '../shared/theme/darkTheme'

// Theme
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

// redux
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { switchToHome,switchToWhale,switchToTrace,switchToWallet } from '../shared/store/features/section/actions'

// router
import { useRouter } from 'next/router'

// component
import Home from '../components/main/Home'
import Whale from '../components/main/Whale'
import Trace from '../components/main/Trace'
import Wallet from '../components/main/Wallet'

export const AppContainer = styled(Container, {
  [`.${darkTheme} &`]: {
    bc: '$tokenColor',
    color: '$myColor',
  },
  color: '$bc',
  background: '$blue50',
})

const Main: NextPage = () => {
  const { theme, isDark, type } = useTheme()
  const dispatch = useAppDispatch();
  const { state, isLoggedIn, pending, error } = useAppSelector((state) => state.web3User);
  const { currentSection, isChanging } = useAppSelector((state) => state.section);
  // const { provider, web3Provider, address, network } = state
  const router = useRouter()

  const renderCurrentSelection = () => {
    switch (currentSection.name) {
        case "HOME":
            return <Home/>;
        case "WHALE":
            return <Whale/>;
        case "TRACE":
              return <Trace/>;
        case "WALLET":
          return <Wallet/>;
        default:
          return <Home/>;
      }
  }

  // useEffect(() => {
  //     // 若使用者沒登入，則應踢回index（須在app.tsx設定route規則）
  //     if(!isLoggedIn){
  //       router.push('./');
  //     }
      
  //     // 若使用者沒登入，則應踢回index（須在app.tsx設定route規則）
  //     if(!currentSection){
  //       router.push('./');
  //     } 
  // },[isLoggedIn,currentSection])

  return (
    <div>
      <NavBar></NavBar>
      <Spacer
        y={1}
        css={{
          h: '7.5rem',
          '@xs': {
            h: '6rem',
          },
          '@sm': {
            h: '2.5rem',
          },
          '@md': {
            h: '2.5rem',
          },
          '@lg': {
            h: '2.5rem',
          },
        }}
      />
      <Spacer y={1} />
      {/* <AppContainer css={{ backgroundColor: 'transparent' }}> */}
      {renderCurrentSelection()}
      {/* </AppContainer> */}
    </div>
  )
}

export default Main
