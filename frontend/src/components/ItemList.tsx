import { useEffect, useState } from 'react';
import { List, Button, message } from 'antd';
import { getAllItems, addNewItem, deleteItem, editItem} from '../services/api';
import ItemForm from './ItemForm';
import DeleteModal from './DeleteModal';

export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
}

function ItemList() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
    const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items: ', error);
                message.error('Error fetching items: ' + error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const openDeleteModal = async (item: Item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (itemToDelete) {
                await deleteItem(itemToDelete.id);
                setShowDeleteModal(false);
                message.success("Item has been deleted successfully");
                setItems(items.filter((item) => item.id != itemToDelete.id));
            }
            else {
                message.error('No item to be deleted');
            }
        } catch (error) {
            console.error('Error deleting item: ', error);
            message.error('Error deleting item: ' + error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleAddItem = async (values: any) => {
        try {
            setShowForm(false);
            await addNewItem(values);
            message.success("Item has been inserted successfully");
            const data = await getAllItems();
            setItems(data);
        } catch (error) {
            console.error('Error inserting new item: ', error);
            message.error('Error inserting new item: ' + error);
        }
    };

    const handleEditItem = async (values: any, id: number) => {
        try {
            setShowForm(false);
            await editItem(values, id);
            message.success("Item has been editted successfully");
            const data = await getAllItems();
            setItems(data);
        } catch (error) {
            console.error('Error editing new item: ', error);
            message.error('Error editing new item: ' + error);
        }
    }

    return (
        <div style={{minWidth: '450px', padding: '20px' }}>
            <List
                loading={loading}
                bordered
                dataSource={items}
                renderItem={(item) => (
                <List.Item
                    actions={[
                    <Button
                        type="primary"
                        onClick={() => {
                                setItemToEdit(item);
                                setShowForm(true);
                            }  
                        }
                    >
                        Edit
                    </Button>,
                    <Button
                        type="primary"
                        danger
                        onClick={() => openDeleteModal(item)}
                    >
                        Delete
                    </Button>
                    ]}
                >
                    <List.Item.Meta
                        style={{textAlign: 'left'}}
                        title={item.name}
                        description={<>Description: {item.description}<br></br>Price: RM{item.price}</>}
                    />
                </List.Item>
                )}
            />
            <Button
                type="primary"
                style={{ marginTop: '20px', width: '100%', padding: '20px'}}
                onClick={() => setShowForm(true)}
            >
                Add a new item
            </Button>
            <ItemForm
                visible={showForm} 
                onCancel={() => setShowForm(false)}
                onAddItem={(values) => handleAddItem(values)}
                onEditItem={(values, id) => handleEditItem(values, id)}
                item={itemToEdit}
            />
            <DeleteModal
                visible={showDeleteModal} 
                onCancel={() => handleCancelDelete()}
                onConfirm={() => handleConfirmDelete()}
            />
        </div>
    );
};

export default ItemList;
