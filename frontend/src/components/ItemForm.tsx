import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setItems, setShowForm, setItemToEdit} from '../store/itemSlice';
import { getAllItems, addNewItem, editItem} from '../services/api';

function ItemForm() {
    const dispatch = useDispatch();
    const { showForm, itemToEdit} = useSelector((state: RootState) => state.items);
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (itemToEdit) {
            form.setFieldsValue({
                name: itemToEdit.name,
                description: itemToEdit.description,
                price: itemToEdit.price
            });
        } else {
            form.resetFields();
        }
    }, [itemToEdit, form]);

    const handleSubmit = async (input: any) => {
        try {
            if (itemToEdit) {
                await editItem(input, itemToEdit.id);
            }
            else {
                await addNewItem(input);
            }
            const data = await getAllItems();
            dispatch(setItems(data));
            dispatch(setShowForm(false));
            dispatch(setItemToEdit(null));
        } catch (error) {
            console.error('Error saving item: ', error);
            message.error('Error saving item: ' + error);
        } finally {
            form.resetFields();
        }
    };

    return (
        <Modal
            title={itemToEdit ? "Edit Item" : "Add a New Item"}
            open={showForm}
            onCancel={() => dispatch(setShowForm(false))}
            centered 
            footer={null}
        >
            <Form
                form={form}
                style={{marginTop: '30px'}}
                initialValues={{ name: '', description: '', price: 0 }}
                onFinish={handleSubmit}
            > 
                <Form.Item
                    name="name"
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 20 }}
                    labelAlign='left'
                    label="Name"
                    rules={[{ required: true, message: 'Please enter the item name!' }]}
                >
                    <Input />
                </Form.Item>  
                <Form.Item 
                    name="description" 
                    label="Description"
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 20 }}
                    labelAlign='left'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 20 }}
                    labelAlign='left'
                    rules={[{ required: true, message: 'Please enter the item price!' }]}
                >
                    <InputNumber 
                        style={{ width: '100%' }}
                        min={0}
                        precision={2}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default ItemForm;
