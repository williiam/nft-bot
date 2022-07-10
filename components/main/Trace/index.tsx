import React, { useEffect } from 'react'
import Link from 'next/link'

// component
import Table from './table'
import { AddModal } from './modal'

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

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks'
import { getTraceWhaleList } from '../../../shared/store/features/trace/actions'

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

interface IActionCardItemPropType {
  url?: string
  text?: string
  onClickAction: () => void
}

export const ActionCardItem: React.FC<IActionCardItemPropType> = (
  props: IActionCardItemPropType
) => {
  const { url, text, onClickAction } = props
  return (
    <Button
      id="LinkContainer"
      as="button"
      auto
      ghost
      css={{
        textAlign: 'center',
        justifyContent: 'center',
        w: '100%',
        h: '$14',
        justyContent: 'center',
        color: '$primary1',
        bc: '$layer9',
        '&:hover': {
          color: '$textContrast',
          bc: '$cardHover',
        },
      }}
      onClick={onClickAction}
    >
      <Text
        id="text"
        h3
        // size={30}
        css={{
          mt: 0,
          fs: '$space$10',
          textAlign: 'center',
          color: '$titleColor',
          '&:hover': {
            // color: '$textContrast',
          },
        }}
      >
        {text}
      </Text>
    </Button>
  )
}

const Trace: React.FC = () => {
  const dispatch = useAppDispatch()
  const { state, isLoggedIn, pending } = useAppSelector(
    (state) => state.web3User
  )
  const { traceWhaleList } = useAppSelector(
    (state) => state.trace
  )
  const [openAddModal, setOpenAddModal] = React.useState(false)
  // const { provider, web3Provider, address, network } = state
  const router = useRouter()

  const onClickOpenModal = () => {
    setOpenAddModal(true)
  }

  useEffect(()=>{
    dispatch(getTraceWhaleList())
  },[])

  return (
    <div>
      <AppContainer css={{ backgroundColor: 'transparent' }}>
        <Spacer y={0.3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={3}>
            <Text
              h1
              css={{
                fs: '$space$15',
                textGradient: '45deg, $yellow600 -20%, $red600 100%',
              }}
              weight="bold"
            >
              我的跟單
            </Text>
          </Grid>
          <Grid xs={12} md={3} justify="center" alignItems="center">
            <ActionCardItem onClickAction={onClickOpenModal} text="新增" />
          </Grid>
          <Grid xs={12} md={6}>
            {/* <AddressSection address={'test'} /> */}
            {/* <ActionCardItem url="/wallet" text="新增" /> */}
          </Grid>
        </Grid.Container>
        <Table traceWhaleList={traceWhaleList} />
      </AppContainer>
      <AddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </div>
  )
}

export default Trace
