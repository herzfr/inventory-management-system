import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliers: Supplier[] = [];
  private nextId = 1;

  constructor(private userservice: UserService) { 
    this.initSupplier();
  }

  initSupplier() {
    this.userservice.supplier().subscribe(res => {
      this.suppliers = res as Supplier[];
      this.setNextId();
    });
  }

  setNextId() {
    if (this.suppliers.length > 0) {
      const maxId = Math.max(...this.suppliers.map(supplier => supplier.id));
      this.nextId = maxId + 1;
    }
  }

  getSuppliers() {
    return this.suppliers;
  }

  addSupplier(supplier: Supplier) {
    supplier.id = this.nextId++;
    this.suppliers.push(supplier);
  }
}
