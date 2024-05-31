import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { SupplierService } from './supplier.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  private items: InventoryItem[] = [];
  private itemsSubject: BehaviorSubject<InventoryItem[]> = new BehaviorSubject<InventoryItem[]>([]);
  private stockThreshold = 10;

  constructor(private userservice: UserService, private supplierservice: SupplierService) {
    this.initInventory();
  }

  initInventory() {
    this.userservice.inventories().subscribe((res) => {
      this.items = res;
      this.itemsSubject.next(this.items)
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
      supplier: this.supplierservice.getSupplier(item.supplierId?? 0)?.name
    }));
  }

  getItemBySupplierId(supplierId: number) {
    return this.items.filter(e => e.supplierId === supplierId)
  }

  getLengthItem() {
    return this.items.length;
  }

  getItem(id: string) {
    return this.items.find((f) => f.id == id);
  }

  getItemObs() {
    return this.itemsSubject.asObservable()
  }

  addItem(item: InventoryItem) {
    item.id = uuidv4();
    this.items.push(item);
    this.itemsSubject.next(this.items)
  }

  editItem(updatedItem: InventoryItem) {
    const index = this.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
    this.itemsSubject.next(this.items)
  }

  deleteItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
    this.itemsSubject.next(this.items)
  }
}
