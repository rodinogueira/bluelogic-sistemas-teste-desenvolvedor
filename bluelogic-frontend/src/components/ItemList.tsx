import React from 'react';
import { deleteItem } from '../api/api';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  updateItemsList: React.Dispatch<React.SetStateAction<Item[]>>;
}

function ItemList({ items, onEdit, updateItemsList }: ItemListProps) {
  
  const handleDelete = async (id: string) => {
    if (!id) {
      console.error('ID inválido');
      return;
    }
    console.log(id, 'ID');
    try {
      await deleteItem(id);
      updateItemsList(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Itens</h2>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <div className="item-info">
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </div>
              <div className="actions">
                <button className="edit" onClick={() => onEdit(item)}>Editar</button>
                <button onClick={() => {
                  item.id && handleDelete(item.id);
                }}>Deletar</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemList;
