import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components'

// component
import NavBar from '../components/main/Navbar/Navbar'

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

// Theme
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { switchToHome,switchToWhale,switchToTrace,switchToWallet } from '../../../shared/store/features/section/actions'

// router
import { useRouter } from 'next/router'

export const AppContainer = styled(Container, {

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
          我的錢包
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

const Home = () => {
  const dispatch = useAppDispatch();
  const { state, isLoggedIn, pending } = useAppSelector((state) => state.web3User);
  const { currentSection, isChanging, error } = useAppSelector((state) => state.section);
  // const { provider, web3Provider, address, network } = state
  const router = useRouter()

  return (
    <div>
      <AppContainer css={{ backgroundColor: 'transparent' }}>
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={4}>
            {/* <LinkCardItem url="/whales" text="大戶清單" /> */}
        <AddressSection address={"test"} />
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

export default Home
