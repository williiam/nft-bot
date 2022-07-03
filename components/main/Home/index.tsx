import React from 'react'

import Link from 'next/link'

// UI
import {
  styled,
  Container,
  Grid,
  Card,
  Text,
  Button,
  Link as LinkContainer,
  Spacer,
} from '@nextui-org/react'

// Theme

// redux
import { useAppSelector } from '../../../shared/store/hooks'


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

interface ILinkCardItemPropType {
  url: string;
  text: string;
}

export const LinkCardItem: React.FC<ILinkCardItemPropType> = (
  props: ILinkCardItemPropType
) => {
  const { url, text } = props;
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

interface IAddressSectionPropType {
  address: string| null | undefined;
}
const AddressSection: React.FC<IAddressSectionPropType> = ({ address }: IAddressSectionPropType) => {
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

const Home = () => {
  const { state } = useAppSelector((state) => state.web3User)
  const { address } = state;

  return (
    <div>
      <AppContainer css={{ backgroundColor: 'transparent' }}>
        <AddressSection address={address} />
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          {/* <Grid xs={12} md={4}>
            <LinkCardItem url="/whales" text="大戶清單" />
          </Grid>
          <Grid xs={12} md={4}>
            <LinkCardItem url="/trace" text="我的跟單" />
          </Grid>
          <Grid xs={12} md={4}>
            <LinkCardItem url="/wallet" text="錢包管理" />
          </Grid> */}
        </Grid.Container>
      </AppContainer>
    </div>
  )
}

export default Home
