import React, { useEffect, useState } from 'react';
import { List, Button, Spin, message } from 'antd';
import { getAllItems} from '../services/api';
import { Color } from 'antd/es/color-picker';
import ItemForm from './ItemForm';

interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
}

function ItemList() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id: number) => {
        // try {
        //   await deleteItem(id);
        //   setItems(items.filter((item) => item.id !== id));
        // } catch (error) {
        //   console.error('Error deleting item:', error);
        // }
        try {
            setItems(items.filter((item) => item.id != id));
            message.success('Item deleted successfully.');
        } catch (error) {
            message.error('Failed to delete item.');
        }

    };

    if (loading) return <Spin size="large" />;

    return (
        <div style={{minWidth: '450px', padding: '20px' }}>
            <List
                bordered
                dataSource={items}
                renderItem={(item) => (
                <List.Item
                    actions={[
                    <Button
                        type="primary"
                        onClick={() => handleDelete(item.id)}
                    >
                        Edit
                    </Button>,
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(item.id)}
                    >
                        Delete
                    </Button>
                    ]}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={`${item.description} - RM${item.price}`}
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
            <ItemForm/>
        </div>
    );
};

export default ItemList;
