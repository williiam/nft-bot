import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

const AddModal = (props) => {
    const { openAddModal, setOpenAddModal } = props;
    const handler = () => setOpenAddModal(true);

    const closeHandler = () => {
        setOpenAddModal(false);
    };

    return (
        <div>
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
                placeholder="大戶地址"
                // contentLeft={<Mail fill="currentColor" />}
            />
            {/* <Row justify="space-between">
                <Checkbox>
                <Text size={14}>Remember me</Text>
                </Checkbox>
                <Text size={14}>Forgot password?</Text>
            </Row> */}
            </Modal.Body>
            <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
                取消
            </Button>
            <Button auto onClick={closeHandler}>
                新增
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

const DeleteModal = (props) => {
    const { address, openDeleteModal, setOpenDeleteModal } = props;
    const handler = () => setOpenDeleteModal(true);

    const closeHandler = () => {
        setOpenDeleteModal(false);
    };

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
            <Button auto onClick={closeHandler}>
                確認
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export { AddModal, DeleteModal }
