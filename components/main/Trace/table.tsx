import React from 'react'
import { Table, Row, Col, Tooltip, User, Text } from '@nextui-org/react'
import { styled } from '@nextui-org/react'
import { AiFillHome,AiOutlineLink, AiFillDelete } from 'react-icons/ai'
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

export default function DataTable() {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [selectedAddress, setSelectedAddress] = React.useState("")
  const onClickOpenDeleteModal = (address) => {
    setSelectedAddress(address)
    setOpenDeleteModal(true)
  }
  
  const columns = [
    { name: 'Address', uid: 'name' },
    // { name: "ROLE", uid: "role" },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]
  const users = [
    {
      id: 1,
      name: 'Tony Reichert',
      role: 'CEO',
      team: 'Management',
      status: 'active',
      age: '29',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
      email: 'tony.reichert@example.com',
    },
    {
      id: 2,
      name: 'Zoey Lang',
      role: 'Technical Lead',
      team: 'Development',
      status: 'paused',
      age: '25',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
      email: 'zoey.lang@example.com',
    },
    {
      id: 3,
      name: 'Jane Fisher',
      role: 'Senior Developer',
      team: 'Development',
      status: 'active',
      age: '22',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
      email: 'jane.fisher@example.com',
    },
    {
      id: 4,
      name: 'William Howard',
      role: 'Community Manager',
      team: 'Marketing',
      status: 'vacation',
      age: '28',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
      email: 'william.howard@example.com',
    },
    {
      id: 5,
      name: 'Kristen Copper',
      role: 'Sales Manager',
      team: 'Sales',
      status: 'active',
      age: '24',
      avatar:
        'https://img.freepik.com/free-vector/cute-whale-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3706.jpg?w=2000',
      email: 'kristen.cooper@example.com',
    },
  ]
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey]
    switch (columnKey) {
      case 'name':
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {/* {user.email} */}
          </User>
        )
      case 'role':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        )
      case 'status':
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>

      case 'actions':
        return (
          <Row justify="center" align="center">
            {/* <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <AiFillHome size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col> */}
            <Col css={{ d: 'flex' }}>
              <Tooltip content="查看etherscan">
                <IconButton disabled onClick={() => console.log('Edit user', user.id)}>
                  <AiOutlineLink size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="刪除大戶"
                color="error"
                onClick={() => onClickOpenDeleteModal(user.id)}
              >
                <IconButton>
                  <AiFillDelete size={20} fill="#FF0080" />
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
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <DeleteModal address={selectedAddress} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
    </>
  )
}
