import { InventoryItem } from "./inventory.type";

export interface Sale {
    itemId: string;
    date: Date;
    quantity: number;
    total: number;
  }

  export interface SaleWithItemIventory extends InventoryItem{
    itemId: string;
    date: Date;
    quantity: number;
    total: number;
    inventory: InventoryItem;
  }