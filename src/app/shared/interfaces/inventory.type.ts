export interface InventoryItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplierId?: number;
    image: string;
    lowStock?: boolean;
  }
  