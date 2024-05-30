export interface InventoryItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    supplierId?: number;
    image: string;
    lowStock?: boolean;
  }
  