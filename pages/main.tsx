import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components'

// contexxt (即將被Redux取代)
import { useWeb3Context } from '../shared/context'

// component
import NavBar from '../components/Navbar/Navbar'

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

// Stitches
import { keyframes } from '@stitches/react'

const fadeIn = keyframes({
  '0%': { opacity: '0' },
  '100%': { opacity: '1' },
})

export const AppContainer = styled(Container, {
  [`.${darkTheme} &`]: {
    bc: '$tokenColor',
    color: '$myColor',
  },
  color: '$bc',
  background: '$blue50',
})

export const CardButton = styled(Button, {
  bcColor: 'gainsboro',
  // borderRadius: '9999px',
  fontSize: '$9',
  heigth: '100%',
  margin: '0',
  padding: '$8 $10',
  '&:hover': {
    bc: '$colors$primary',
  },
  '&:active': {
    bc: '$colors$primary',
  },
})

export const LinkCardItem = ({ url, text }) => {
  const { theme } = useTheme()
  return (
    <Card
      isPressable
      isHoverable
      variant="shadow"
      id="Card"
      css={{
        h: '$22',
        justyContent: 'center',
        color: '$primary1',
        bc: '$layer9',
        '&:hover': {
          color: '$textContrast',
          bc: '$cardHover',
        },
      }}
    >
      <Link href={url} passHref>
        <Card.Body id="CardBody" css={{ justyContent: 'center' }}>
          <LinkContainer
            id="LinkContainer"
            css={{
              m: 0,
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              id="text"
              h3
              size={30}
              css={{
                mt: 0,
                textAlign: 'center',
                color: '$titleColor',
                '&:hover': {
                  // color: '$textContrast',
                },
              }}
            >
              {text}
            </Text>
          </LinkContainer>
        </Card.Body>
      </Link>
    </Card>
  )
}

const AddressSection = ({ address }) => {
  return (
    <Card css={{ dflex: 'center', pb: '5' }}>
      <Card.Header css={{ dflex: 'center' }}>
        <Text
          h1
          css={{
            fs: '$space$15',
            textGradient: '45deg, $yellow600 -20%, $red600 100%',
          }}
          weight="bold"
        >
          NFT.bot
        </Text>
      </Card.Header>
      <Card.Body>
        <Text
          h3
          css={{
            mb: '$4',
            textGradient: '180deg, $blue600 -50%, $pink600 50%',
            fs: '$space$11',
          }}
          weight="bold"
        >
          我的錢包地址
        </Text>
        <Card
          variant="bordered"
          css={{
            maxW: '700px',
            ta: 'center',
            color: '$primary-100',
            bc: '$primary-600',
          }}
        >
          <Card.Body>
            <Text
              h1
              weight="bold"
              css={{
                us: 'all',
                mt: 0,
                ta: 'center',
                fs: '$space$10',
                color: '$titleColor',
              }}
            >
              {address}
            </Text>
          </Card.Body>
        </Card>
        <Card
          variant="bordered"
          css={{
            maxW: '400px',
            mt: '$8',
            ta: 'center',
            color: '$primary-100',
            bc: '$primary-600',
          }}
        >
          <Card.Body>
            <Text
              h1
              weight="bold"
              css={{
                us: 'all',
                ta: 'left',
                fs: '$space$9',
                color: '$titleColor',
              }}
            >
              餘額：{address}
            </Text>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  )
}

const About: NextPage = () => {
  const { theme, isDark, type } = useTheme()
  const { address } = useWeb3Context()

  // 若使用者沒登入，則應踢回index（須在app.tsx設定route規則）

  return (
    <div>
      <NavBar></NavBar>
      <Spacer
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
      <AppContainer css={{ backgroundColor: 'transparent' }}>
        <AddressSection address={address} />
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={4}>
            <LinkCardItem url="/whales" text="大戶清單" />
          </Grid>
          <Grid xs={12} md={4}>
            <LinkCardItem url="/trace" text="我的跟單" />
          </Grid>
          <Grid xs={12} md={4}>
            <LinkCardItem url="/wallet" text="錢包管理" />
          </Grid>
        </Grid.Container>
      </AppContainer>
    </div>
  )
}

export default About
