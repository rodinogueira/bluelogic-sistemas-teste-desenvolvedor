import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { v4 as uuidv4 } from 'uuid';

interface Item {
  id: string;
  name: string;
  description: string;
}

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() item: Omit<Item, 'id'>) {
    const newItem = { ...item, id: uuidv4() };
    this.itemsService.create(newItem);
    return { message: 'Item created successfully', item: newItem };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedItem: Partial<Item>) {
    return this.itemsService.update(id, updatedItem);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.itemsService.delete(id);
    return { message: 'Item deleted successfully' };
  }
}
