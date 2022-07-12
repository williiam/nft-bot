import React from 'react'
import {
  Grid,
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Avatar,
  keyframes,
} from '@nextui-org/react'

import { Toast } from '../../../shared/common/toast'
import { styled } from '@nextui-org/react'
import { AiFillHome, AiOutlineLink, AiFillDelete } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import { DeleteModal } from './modal'

// Badge component will be available as part of the core library soon
export const StyledBadge = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '$2 $3',
  margin: '0 2px',
  fontSize: '10px',
  fontWeight: '$bold',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
  variants: {
    type: {
      active: {
        bg: '$successLight',
        color: '$successLightContrast',
      },
      paused: {
        bg: '$errorLight',
        color: '$errorLightContrast',
      },
      vacation: {
        bg: '$warningLight',
        color: '$warningLightContrast',
      },
    },
  },
  defaultVariants: {
    type: 'active',
  },
})

// IconButton component will be available as part of the core library soon
export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    opacity: '0.6',
  },
})

const xsScaleUp = keyframes({
  '0%': { transform: 'translateX(0%) scale(1)', left: 0, zIndex: '99999' },
  '50%': { transform: 'translateX(10%) scale(1.2) ', left: 0, zIndex: '99999' ,
  textGradient: '45deg, $yellow600 -20%, $red600 100%',

},
  '100%': {
    transform: 'translateX(15%) scale(1.2) rotateY(360deg)',
    textGradient: '45deg, $yellow600 -20%, $red600 100%',
    zIndex: '99999',
    cursor: 'pointer'
  },
})

const scaleUp = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(1)' },
})

const StyledText = styled(Text, {
  '&:hover': {
    animation: `${scaleUp} 5s`,
  },
})

export default function DataTable(props) {
  const { walletList } = props
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [selectedAddress, setSelectedAddress] = React.useState('')
  const [selectedNickname, setSelectedNickname] = React.useState('')

  const onClickAddress = (address) => {
    navigator.clipboard.writeText(address)
    Toast.success(`${address}地址已複製到剪貼簿`)
  }

  const onClickEtherscanLink = (address) => {
    console.log('ether clicked')
    window.open(`https://etherscan.io/address/${address}`)
  }

  const onClickOpenDeleteModal = (user) => {
  console.log('user :', user);
    const { name, address } = user
    setSelectedAddress(address)
    setSelectedNickname(name)
    setOpenDeleteModal(true)
  }

  const columns = [
    { name: '地址', uid: 'address' },
    // { name: 'STATUS', uid: 'status' },
    { name: '連結', uid: 'link' },
    { name: '刪除', uid: 'delete' },
  ]

  const dataTableDataSource = walletList.map((wallet, index) => {
    return {
      id: index,
      address: wallet?.whaleaddress,
      name: wallet?.name? wallet?.name:"",
      status: 'active',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
    }
  })
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey]
    switch (columnKey) {
      case 'address':
        return (
          <>
            <User
              squared
              size="md"
              src={user.avatar}
              css={{
                p: 0,
                zIndex: '-1',
              }}
            >
              <Text
                h3
                weight="bold"
                css={{
                  us: 'all',
                  ta: 'left',
                  display: 'inline-block',
                  color: '$layer2',
                  '@xs': {
                    fs: '$space$8',
                  },
                  '@sm': {
                    fs: '$space$9',
                  },
                  '@md': {
                    fs: '$space$10',
                  },
                  '@lg': {
                    fs: '$space$10',
                  },
                }}
              >
                {user.name}
              </Text>
              {/* <Tooltip content={user.address}> */}
              <Text
                h3
                weight="bold"
                css={{
                  us: 'all',
                  ta: 'left',
                  color: '$titleColor',
                  wordWrap: 'break-word',
                  zIndex: '2147483647',
                  overflow: 'visible',
                  cursor: 'pointer',
                  '@xs': {
                    fs: '$space$8',
                    '&:hover': {
                      animation: `${xsScaleUp} 1s forwards`,
                    },
                  },
                  '@sm': {
                    fs: '$space$9',
                    '&:hover': {
                      // animation: `${scaleUp} 5s`
                    },
                  },
                  '@md': {
                    fs: '$space$10',
                  },
                  '@lg': {
                    fs: '$space$11',
                  },
                }}
                onClick={()=>onClickAddress(user.address)}
              >
                {user.address}
              </Text>
              {/* </Tooltip> */}
            </User>
          </>
        )
      case 'status':
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>

      case 'link':
        return (
          <Row justify="center" align="center">
            <Col span={12} css={{ d: 'flex' }}>
              <Tooltip content="查看etherscan">
                <IconButton onClick={() => onClickEtherscanLink(user.address)}>
                  <AiOutlineLink size={35} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        )
      case 'delete':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="刪除大戶"
                color="error"
                onClick={() => onClickOpenDeleteModal(user)}
              >
                <IconButton>
                  <AiFillDelete size={35} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        )
      default:
        return cellValue
    }
  }
  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: 'auto',
          minWidth: '100%',
          width: '100%',
          flex: '0 0 100%',
          flexGrow: '2',
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              // align={column.uid === 'actions' ? 'center' : 'start'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              <Text
                h3
                weight="bold"
                css={{
                  us: 'all',
                  ta: 'left',
                  display: 'inline-block',
                  color: '$layer2',
                  '@xs': {
                    fs: '$space$8',
                  },
                  '@sm': {
                    fs: '$space$9',
                  },
                  '@md': {
                    fs: '$space$10',
                  },
                  '@lg': {
                    fs: '$space$10',
                  },
                }}
              >
                {column.name}
              </Text>
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={dataTableDataSource}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <DeleteModal
        name={selectedNickname}
        address={selectedAddress}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  )
}
