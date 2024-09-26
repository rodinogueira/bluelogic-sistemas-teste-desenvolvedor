import React, { useState, useEffect } from 'react';
import { addItem, updateItem } from '../api/api';
import { Item } from '../types';

interface ItemFormProps {
  currentItem?: Item;
  onSave: () => void;
  updateItemsList: (item: Item) => void;
}

function ItemForm({ currentItem, onSave, updateItemsList }: ItemFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setDescription(currentItem.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentItem]);

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};
    if (!name) newErrors.name = 'Nome é obrigatório.';
    if (!description) newErrors.description = 'Descrição é obrigatória.';
    if (name.length < 3) newErrors.name = 'Nome deve ter pelo menos 3 caracteres.';
    if (description.length < 5) newErrors.description = 'Descrição deve ter pelo menos 5 caracteres.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let updatedItem: Item;
    if (currentItem?.id) {
      const response = await updateItem(currentItem.id, { name, description });
      updatedItem = response.data;
    } else {
      const response = await addItem({ name, description });
      updatedItem = response.data;
    }

    updateItemsList(updatedItem);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Descrição:</label>
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        {currentItem ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
}

export default ItemForm;
