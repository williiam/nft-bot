import React from 'react'

// UI
import {
  styled,
  Container,
  Grid,
  Card,
  Text,
  Button,
  Spacer,
} from '@nextui-org/react'

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

interface ISubscribeTokenPropType {
  subscribeToken: string | null | undefined
}
const SubscribeTokenSection: React.FC<ISubscribeTokenPropType> = ({
  subscribeToken,
}: ISubscribeTokenPropType) => {
  return (
    <Card css={{ dflex: 'center', pb: '5' }}>
      <Card.Body>
        <Text
          h2
          css={{
            mb: '$4',
            textGradient: '180deg, $blue600 -50%, $pink600 50%',
            fs: '$space$14'
          }}
          weight="bold"
        >
          我的Telegram訂閱token
        </Text>
        <Card
          variant="bordered"
          css={{
            // maxW: '700px',
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
                w:'100%',
                us: 'all',
                mt: 0,
                ta: 'center',
                fs: '$space$10',
                color: '$titleColor',
              }}
            >
              {subscribeToken}
            </Text>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  )
}

const UserSetting = () => {
  const { state,tgSubscribeToken } = useAppSelector((state) => state.web3User)
  const { address } = state

  return (
    <div>
      <AppContainer css={{ backgroundColor: 'transparent' }}>
          <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={12}>
            <SubscribeTokenSection subscribeToken={tgSubscribeToken} />
          </Grid>
        </Grid.Container>
      </AppContainer>
    </div>
    )
}

export default UserSetting
