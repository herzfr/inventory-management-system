import { Injectable } from '@angular/core';
import { Sale } from 'src/app/shared/interfaces/sales.type';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private sales: Sale[] = [];
  private salesSubject: BehaviorSubject<Sale[]> = new BehaviorSubject<Sale[]>([]);
  constructor(private userservice: UserService) {
    this.initSales();
   }

   initSales() {
    this.userservice.sales().subscribe(res => {
      this.sales = res as Sale[];
      this.salesSubject.next(this.sales);
    });
  }

  getSales(): Observable<Sale[]> {
    return this.salesSubject.asObservable();
  }

  recordSale(sale: Sale) {
    this.sales.push(sale);
    this.salesSubject.next(this.sales);
  }

}
