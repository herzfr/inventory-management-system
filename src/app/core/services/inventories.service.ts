import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  private items: InventoryItem[] = [];
  private stockThreshold = 10;

  constructor(private userservice: UserService) {
    this.initInventory();
  }

  initInventory() {
    this.userservice.inventories().subscribe((res) => {
      this.items = res;
    });
  }

  getItems(search: string, page: number, pageSize: number) {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter items based on the search term
    const filteredItems = this.items.filter((ftr) =>
      ftr.name.toLowerCase().trim().includes(search)
    );

    // Sort the filtered items in descending order
    const sortedItems = filteredItems.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });

    // Get the items for the current page
    const itemsPerPage = sortedItems.slice(startIndex, endIndex);

    // Map the items to include the lowStock property
    return itemsPerPage.map((item) => ({
      ...item,
      lowStock: item.quantity < this.stockThreshold,
    }));
  }

  getLengthItem() {
    return this.items.length;
  }

  getItem(id: string) {
    return this.items.find((f) => f.id == id);
  }

  addItem(item: InventoryItem) {
    item.id = uuidv4();
    this.items.push(item);
  }

  editItem(updatedItem: InventoryItem) {
    const index = this.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
