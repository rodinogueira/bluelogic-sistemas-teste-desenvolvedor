import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import { Item } from './types';
import { getItems } from './api/api';
import './App.css';

function App() {
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data: fetchedItems } = await getItems();
    setItems(fetchedItems);
  };

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
  };

  const handleSave = () => {
    setCurrentItem(undefined);
    fetchItems();
  };

  const updateItemsList = (updatedItem: Item) => {
    setItems(prevItems => {
      const index = prevItems.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        return prevItems.map(item => item.id === updatedItem.id ? updatedItem : item);
      } else {
        console.warn('Tentativa de atualizar um item inexistente:', updatedItem);
        return prevItems;
      }
    });
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Itens</h1>
      <ItemForm 
        currentItem={currentItem} 
        onSave={handleSave} 
        updateItemsList={updateItemsList}
      />
      <ItemList items={items} onEdit={handleEdit} updateItemsList={setItems} />
    </div>
  );
}

export default App;
