import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/item',
    headers: {
      'Content-Type': 'application/json',
    },
});

export const getAllItems = async () => {
    const response = await api.get('/');
    return response.data;
};