import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

// redux
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { addTraceWhale, deleteTraceWhale } from '../../../shared/store/features/trace/actions'

const AddModal = (props) => {
    const { openAddModal, setOpenAddModal } = props;
    const [whaleAddress, setWhaleAddress] = React.useState("")
    const [nickname, setNickname] = React.useState("")

    const dispatch = useAppDispatch()


    const handler = () => setOpenAddModal(true);

    // const {  } = useAppSelector((state) => state.trace);

    const closeHandler = () => {
        setOpenAddModal(false);
    };

    const onClickConfirm = (event) => {
        dispatch(addTraceWhale({whaleAddress:whaleAddress,nickname:nickname}));
        closeHandler();
    }

    return (
        <div
        aria-label="add-modal"
        >
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={openAddModal}
            onClose={closeHandler}
        >
            <Modal.Header>
            <Text id="modal-title" size={18}>
                新增
                <Text b size={18}>
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
                placeholder="大戶暱稱"
                aria-labelledby="add-modal-input-nickname"
                onChange={event => { setNickname(event.target.value); }}
                value={nickname}
                // contentLeft={<Mail fill="currentColor" />}
            />
            <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="大戶地址"
                aria-labelledby="add-modal-input-whaleAddress"
                onChange={event => { setWhaleAddress(event.target.value); }}
                value={whaleAddress}
                // contentLeft={<Mail fill="currentColor" />}
            />
            </Modal.Body>
            <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                取消
            </Button>
            <Button auto onClick={onClickConfirm}>
                新增
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

const DeleteModal = (props) => {
    const { address, openDeleteModal, setOpenDeleteModal } = props;

    const dispatch = useAppDispatch()
    
    const handler = () => setOpenDeleteModal(true);

    const closeHandler = () => {
        setOpenDeleteModal(false);
    };

    const onClickConfirm = (event) => {
        dispatch(deleteTraceWhale({whaleAddress:address}));
        closeHandler();
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
            <Text id="modal-title" size={18}>
                確認刪除
                <Text b size={18}>
                大戶
                </Text>
            </Text>
            </Modal.Header>
            <Modal.Body>
                <Text b size={18}>
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
    );
}

export { AddModal, DeleteModal }
