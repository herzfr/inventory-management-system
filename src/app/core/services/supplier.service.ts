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
      console.log(res);
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

  getObsSuppliers(): Observable<Supplier[]> {
    return this.supplierSubject.asObservable();
  }

  addSupplier(supplier: Supplier) {
    supplier.id = this.nextId++;
    this.suppliers.push(supplier);
    this.supplierSubject.next(this.suppliers);
  }
}
