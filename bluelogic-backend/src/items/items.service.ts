import { Injectable, NotFoundException } from '@nestjs/common';

export interface Item {
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  create(item: Item): void {
    this.items.push(item);
  }

  update(id: string, updatedItem: Partial<Item>): Item {
    const item = this.findOne(id);
    const index = this.items.findIndex((i) => i.id === id);
    const newItem = { ...item, ...updatedItem };
    this.items[index] = newItem;
    return newItem;
  }

  delete(id: string): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(index, 1);
  }
}
