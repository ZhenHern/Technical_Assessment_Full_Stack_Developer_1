import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/item',
    headers: {
      'Content-Type': 'application/json',
    },
});

export const getAllItems = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addNewItem = async (newItem: { name: String, description: String, price: number}) => {
    try {
        const response = await api.post('/', newItem);
        return response.data;
    } catch (error: any) {
        if (error.response.data.errors[0].message) {
            throw error.response.data.errors[0].message;
        }
        throw error
    }
};

export const deleteItem = async (itemId: number) => {
    try {
        const response = await api.delete(`/${itemId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editItem = async (newItem: { name: String, description: String, price: number}, itemId: number) => {
    try {
        const response = await api.put(`/${itemId}`, newItem);
        return response.data;
    } catch (error: any) {
        if (error.response.data.errors[0].message) {
            throw error.response.data.errors[0].message;
        }
        throw error;
    }
}

