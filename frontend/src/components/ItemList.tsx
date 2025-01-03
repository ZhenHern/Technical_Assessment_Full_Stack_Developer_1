import { useEffect } from 'react';
import { List, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setItems, setLoading, setShowForm, setShowDeleteModal, setItemToDelete, setItemToEdit, setConnectionError } from '../store/itemSlice';
import { getAllItems } from '../services/api';
import ItemForm from './ItemForm';
import DeleteModal from './DeleteModal';

function ItemList() {
    const { items, loading, connectionError } = useSelector((state: RootState) => state.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems();
                dispatch(setItems(data));
                dispatch(setConnectionError(false));
            } catch (error) {
                console.error('Error fetching items: ', error);
                message.error('Error fetching items: ' + error);
                dispatch(setConnectionError(true));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchItems();
    }, [dispatch]);

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
                                dispatch(setItemToEdit(item));
                                dispatch(setShowForm(true));
                            }  
                        }
                    >
                        Edit
                    </Button>,
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            dispatch(setItemToDelete(item));
                            dispatch(setShowDeleteModal(true));
                        }}
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
                onClick={() => {
                    dispatch(setItemToEdit(null))
                    dispatch(setShowForm(true))
                }}
                disabled={connectionError || loading}
            >
                Add a new item
            </Button>
            <ItemForm/>
            <DeleteModal/>
        </div>
    );
};

export default ItemList;
