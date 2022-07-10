// node_module 
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
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks'
import {
  addTraceWhale,
  deleteTraceWhale,
} from '../../../shared/store/features/trace/actions'

// shared
import { Toast } from '../../../shared/common/toast'

const AddModal = (props) => {
  const { openAddModal, setOpenAddModal } = props
  const [whaleAddress, setWhaleAddress] = React.useState('')
  const [nickname, setNickname] = React.useState('')

  const dispatch = useAppDispatch()

  const handler = () => setOpenAddModal(true)

  // const {  } = useAppSelector((state) => state.trace);

  const closeHandler = () => {
    setOpenAddModal(false)
    setWhaleAddress("")
    setNickname("")
  }

  const onClickConfirm = (event) => {}

  const onSubmitForm = (e) => {
    e.preventDefault()
    if(ethers.utils.isAddress(whaleAddress)){
        dispatch(addTraceWhale({ whaleAddress: whaleAddress, nickname: nickname }))
        closeHandler()
    }
    else{
        toast.warn('此地址不存在', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }


  // TODO: 表單需為必填,且需驗證地址格式

  return (
    <div aria-label="add-modal">
      <Modal
        closeButton
        aria-labelledby="modal-title"
        blur={false}
        css={{
            backdropFilter: 'none'
          }}
        open={openAddModal}
        onClose={closeHandler}
      >
        <form onSubmit={onSubmitForm}>
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
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="大戶暱稱"
              placeholder="大戶暱稱"
              aria-labelledby="add-modal-input-nickname"
              css={{
                lineHeight: '$lg',
                fs: '$space$15',
              }}
              required
              onChange={(event) => {
                setNickname(event.target.value)
              }}
              value={nickname}
              // contentLeft={<Mail fill="currentColor" />}
            />
            <Spacer y={0} />
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
            <Button auto type="submit">
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
        </form>
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
          <Spacer y={0.1} />
          <Text size={18}>{address}</Text>
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
