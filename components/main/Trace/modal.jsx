import React from 'react'
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Spacer,
} from '@nextui-org/react'

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks'
import {
  addTraceWhale,
  deleteTraceWhale,
} from '../../../shared/store/features/trace/actions'

const AddModal = (props) => {
  const { openAddModal, setOpenAddModal } = props
  const [whaleAddress, setWhaleAddress] = React.useState('')
  const [nickname, setNickname] = React.useState('')

  const dispatch = useAppDispatch()

  const handler = () => setOpenAddModal(true)

  // const {  } = useAppSelector((state) => state.trace);

  const closeHandler = () => {
    setOpenAddModal(false)
  }

  const onClickConfirm = (event) => {
    dispatch(addTraceWhale({ whaleAddress: whaleAddress, nickname: nickname }))
    closeHandler()
  }

  return (
    <div aria-label="add-modal">
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openAddModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            css={{
              fs: '$space$15',
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
          >
            新增
            <Text
              b
              size={18}
              css={{
                fs: '$space$15',
                textGradient: '45deg, $yellow600 -20%, $red600 100%',
              }}
            >
              大戶
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="大戶暱稱"
              placeholder="大戶暱稱"
              aria-labelledby="add-modal-input-nickname"
              required
              onChange={(event) => {
                setNickname(event.target.value)
              }}
              value={nickname}
              // contentLeft={<Mail fill="currentColor" />}
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="大戶地址"
              placeholder="大戶地址"
              aria-labelledby="add-modal-input-whaleAddress"
              required
              onChange={(event) => {
                setWhaleAddress(event.target.value)
              }}
              value={whaleAddress}
              // contentLeft={<Mail fill="currentColor" />}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            <Text
              b
              size={18}
              css={{
                fs: '$space$10',
              }}
            >
              取消
            </Text>
          </Button>
          <Button auto onClick={onClickConfirm}>
            <Text
              b
              size={18}
              css={{
                fs: '$space$10',
              }}
            >
              新增
            </Text>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const DeleteModal = (props) => {
  const { name, address, openDeleteModal, setOpenDeleteModal } = props

  const dispatch = useAppDispatch()

  const handler = () => setOpenDeleteModal(true)

  const closeHandler = () => {
    setOpenDeleteModal(false)
  }

  const onClickConfirm = (event) => {
    dispatch(deleteTraceWhale({ whaleAddress: address }))
    closeHandler()
  }

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={openDeleteModal}
        onClose={closeHandler}
      >
        <Modal.Header>
        <Text
            id="modal-title"
            css={{
              fs: '$space$13',
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
          >
            確認取消追蹤大戶
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text b size={18}>
            {name}
          </Text>
          <Spacer y={0.1}/>
          <Text  size={18}>
            {address}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            取消
          </Button>
          <Button auto onPress={onClickConfirm}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { AddModal, DeleteModal }
