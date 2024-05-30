import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {
  private items: InventoryItem[] = [];
  private nextId = 1;
  private stockThreshold = 10;

  constructor(private userservice: UserService) { 
    this.initInventory()
  }

  initInventory() {
    this.userservice.inventories().subscribe(res => {
      console.log('res', res)
      this.items = res
    })
  }

  

  getItems(search: string, page: number, pageSize: number) {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredItems = this.items.filter(ftr => ftr.name.toLowerCase().trim().includes(search));
    const itemsPerPage = filteredItems.slice(startIndex, endIndex);
    return itemsPerPage.map(item => ({
      ...item,
      lowStock: item.quantity < this.stockThreshold
    }));
  }

  getLengthItem() {
    return this.items.length
  }

  getItem(id: number) {
    return this.items.at(id)
  }

  addItem(item: InventoryItem) {
    item.id = this.nextId++;
    this.items.push(item);
  }

  editItem(updatedItem: InventoryItem) {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

}
