import { Modal, Button } from 'antd';

interface DeleteModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

function DeleteModal({ visible, onCancel, onConfirm }: DeleteModalProps) {
    return (
        <Modal
            title="Delete confirmation"
            open={visible}
            onCancel={onCancel}
            centered 
            footer={[
                <Button key="yes" type="primary" danger onClick={onConfirm}>
                    Yes
                </Button>,
                <Button key="no" onClick={onCancel}>
                    No
                </Button>
            ]}
        >
            <p>Are you sure you want to delete this item?</p>
        </Modal>
    )
};

export default DeleteModal;
