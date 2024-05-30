import { Injectable } from '@angular/core';
import { Sale } from 'src/app/shared/interfaces/sales.type';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private sales: Sale[] = [];
  constructor() { }

  getSales() {
    return this.sales;
  }

  recordSale(sale: Sale) {
    this.sales.push(sale);
  }
  
}
