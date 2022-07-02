import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import { Web3Button } from '../components'

// component

// common

// UI
import {
  Container,
  Grid,
  Card,
  Text,
  Button,
  Link as LinkContainer,
  Spacer,
} from '@nextui-org/react'
import { darkTheme } from '../shared/theme/darkTheme'
import { styled } from '@stitches/react'

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
  // color: '$myColor',
  // bcColor: '$myColor'
  color: '$bc',
  bcColor: 'blue50',
  // animationName: fadeIn
})

export const CardButton = styled(Button, {
  bcColor: 'gainsboro',
  // borderRadius: '9999px',
  fontSize: '$10',
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

export const LinkCardItem: React.FC = ({ url, text }) => {
  return (
    <Card
      isPressable
      isHoverable
      variant="shadow"
      id="Card"
      css={{
        h: '$22',
        justyContent: 'center',
        bc: '$layer10',
        '&:hover': {
          backgroundColor: '$cardHover',
        },
      }}
    >
      <Link href={url}>
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
              color="white"
              css={{ mt: 0, color: '$titleColor', textAlign: 'center' }}
            >
              {text}
            </Text>
          </LinkContainer>
        </Card.Body>
      </Link>
    </Card>
  )
}

const LoginPanel = () => {
  return (
    <Card css={{ dflex: 'center', pb: '5' }}>
      <Card.Header css={{ dflex: 'center' }}>
        <Text
          h1
          size="$15"
          css={{
            fs:'$space$17',
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
          size="$10"
          css={{
            mb: '$4',
            textGradient: '180deg, $blue600 -50%, $pink600 50%',
            fs:"$space$11"
          }}
          weight="bold"
        >
          土狗追蹤機器人
        </Text>
        <Spacer y={1} />
        <Card
          variant="bordered"
          css={{
            mw: '400px',
            color: '$primary-100',
            backgroundColor: '$primary-600',
          }}
        >
          <Web3Button />
        </Card>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  )
}

const About: NextPage = () => {

  return (
    <>
      {/* <NavBar></NavBar> */}
      <Spacer y={4} />
      <AppContainer
        fluid
        sm
        css={{ color: 'blue', backgroundColor: 'transparent' }}
      >
        <LoginPanel />
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={4}>
            <LinkCardItem url="/main" text="查看UI" />
          </Grid>
        </Grid.Container>
      </AppContainer>
    </>
  )
}

export default About
