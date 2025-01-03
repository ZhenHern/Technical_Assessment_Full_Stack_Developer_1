import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import {Item} from './ItemList'

interface ItemFormProps {
    visible: boolean;
    onCancel: () => void;
    onAddItem: (input: any) => void;
    onEditItem: (input: any, id: number) => void;
    item?: Item | null;
}

function ItemForm({ visible, onCancel, onAddItem, onEditItem, item }: ItemFormProps) {
    const [form] = Form.useForm();
    
    useEffect(() => {
        if (item) {
            form.setFieldsValue({
                name: item.name,
                description: item.description,
                price: item.price
            });
        } else {
            form.resetFields();
        }
    }, [item, form]);

    const handleSubmit = (input: any) => {
        if (item) {
            onEditItem(input, item.id);
        }
        else {
            onAddItem(input);
        }
        form.resetFields();
    };

    return (
        <Modal
            title={item ? "Edit Item" : "Add a New Item"}
            open={visible}
            onCancel={onCancel}
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
