import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003',
});

export const getItems = () => api.get('/items');
export const addItem = (item: { name: string; description: string }) => api.post('/items', item);
export const updateItem = (id: string, item: { name: string; description: string }) => api.put(`/items/${id}`, item);
export const deleteItem = (id: string) => api.delete(`/items/${id}`);
