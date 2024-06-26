import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private suppliers: Supplier[] = [];
  private supplierSubject: BehaviorSubject<Supplier[]> = new BehaviorSubject<
    Supplier[]
  >([]);
  private nextId = 1;

  constructor(private userservice: UserService) {
    this.initSupplier();
  }

  initSupplier() {
    this.userservice.supplier().subscribe((res) => {
      this.suppliers = res as Supplier[];
      this.supplierSubject.next(this.suppliers);
      this.setNextId();
    });
  }

  setNextId() {
    if (this.suppliers.length > 0) {
      const maxId = Math.max(...this.suppliers.map((supplier) => supplier.id));
      this.nextId = maxId + 1;
    }
  }

  getSuppliers() {
    return this.suppliers;
  }

  getSupplier(id: number) {
    return this.supplierSubject.getValue().find(f => f.id === id);
  }

  getObsSuppliers(): Observable<Supplier[]> {
    return this.supplierSubject.asObservable();
  }

  addSupplier(supplier: Supplier) {
    supplier.id = this.nextId++;
    this.suppliers.push(supplier);
    this.supplierSubject.next(this.suppliers);
  }

  deleteSupplier(id: number) {
    this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
    this.supplierSubject.next(this.suppliers);
  }
}
