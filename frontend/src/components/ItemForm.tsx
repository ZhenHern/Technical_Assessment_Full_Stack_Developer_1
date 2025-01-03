import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';

interface ItemFormProps {
    visible: boolean;
    onCancel: () => void;
    onAddItem: (values: any) => void;
}

function ItemForm() {
    const [form] = Form.useForm();

    return(
        <Modal
            open
            title="Add a New Item"
            footer={null}
        >
            <Form
                form={form}
                style={{marginTop: '30px'}}
                initialValues={{ name: '', description: '', price: 0 }}
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
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ItemForm;
