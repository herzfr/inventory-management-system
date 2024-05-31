import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { Sale } from 'src/app/shared/interfaces/sales.type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit, AfterViewInit {
  search: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  duplicateData: Sale[] = [];

  constructor(
    private salesService: SalesService,
    private supplierService: SupplierService
  ) {}

  displayedColumns: string[] = ['id', 'date', 'quantity', 'total'];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.salesService.getSales().subscribe((sales) => {
      this.dataSource.data = sales;
      this.duplicateData = sales;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  startDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    if (this.startDate && this.endDate) {
      this.fetchData();
    }
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    if (this.startDate && this.endDate) {
      this.fetchData();
    }
  }

  fetchData() {
    const filteredSales = this.duplicateData.filter((sale: Sale) => {
      const saleDateUTC = new Date(sale.date); // Parse the date string as UTC
      const saleDate = new Date(
        saleDateUTC.getTime() + saleDateUTC.getTimezoneOffset() * 60000
      );

      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      if (start && saleDate < start) {
        return false;
      }

      if (end && saleDate > end) {
        return false;
      }

      if (
        this.search ||
        !sale.itemId.includes(this.search.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    this.dataSource.data = filteredSales;
  }

  refreshFilter() {
    this.search = '';
    this.startDate = null;
    this.endDate = null;
    this.dataSource.data = [];
    this.fetchData();
    this.dataSource.filter = ''.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get suppliers() {
    return this.supplierService.getSuppliers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
