import { Modal, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setItems, setShowDeleteModal, setItemToDelete } from '../store/itemSlice';
import { getAllItems, deleteItem } from '../services/api';

function DeleteModal() {
    const dispatch = useDispatch();
    const { showDeleteModal, itemToDelete } = useSelector((state: RootState) => state.items);

    const handleDelete = async () => {
        try {
            if (itemToDelete) {
                await deleteItem(itemToDelete.id);
                const data = await getAllItems();
                dispatch(setItems(data));
                dispatch(setShowDeleteModal(false));
                dispatch(setItemToDelete(null));
                message.success("Item has been successfully deleted.")
            }
            else {
                message.error("No item to be deleted.");
            }
        } catch (error) {
            console.error("Error deleting item: ", error);
            message.error("Error deleting item: " + error);
        }
    }

    return (
        <Modal
            title="Delete confirmation"
            open={showDeleteModal}
            onCancel={() => dispatch(setShowDeleteModal(false))}
            centered 
            footer={[
                <Button key="yes" type="primary" danger onClick={handleDelete}>
                    Yes
                </Button>,
                <Button key="no" onClick={() => dispatch(setShowDeleteModal(false))}>
                    No
                </Button>
            ]}
        >
            <p>Are you sure you want to delete this item?</p>
        </Modal>
    )
};

export default DeleteModal;
