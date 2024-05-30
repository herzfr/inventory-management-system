import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { InventoriesService } from 'src/app/core/services/inventories.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { AddSupplierComponent } from 'src/app/shared/components/dialogs/add-supplier/add-supplier.component';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, AfterViewInit {

  supplierservice = inject(SupplierService)
  inventoryservice = inject(InventoriesService)
  cdr = inject(ChangeDetectorRef)
  dialog = inject(MatDialog)

  displayedColumns: string[] = ['name', 'contact'];
  dataSource: MatTableDataSource<Supplier> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  search: string = '';
  pageSize = 5;
  pageIndex = 0;
  duplicateData: Supplier[] = [];

  subs: Subscription | undefined;

  ngOnInit(): void {
    if (!this.dataSource.data.length) { 
      this.supplierservice.getObsSuppliers().subscribe((data) => {
        this.dataSource.data = data; 
        this.duplicateData = data;
      });
    }
  }

  updateData() {
    this.dataSource = new MatTableDataSource<Supplier>(this.getItems())
    this.refreshFilter()
  }

  getItems() {
    const startIndex = this.paginator?.pageIndex ?? 0 * (this.paginator?.pageSize ?? 0);
    const endIndex = startIndex + (this.paginator?.pageSize ?? 0);
    const filteredItems = this.duplicateData.filter(supplier => supplier.name.toLowerCase().trim().includes(this.search));
    const sortedItems = filteredItems.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });

    const itemsPerPage = sortedItems.slice(startIndex, endIndex);
    return itemsPerPage
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.cdr.detectChanges();
  }


  get suppliers() {
    return this.supplierservice.getSuppliers()
  }

  get total() {
    return this.supplierservice.getSuppliers().length
  }

  refreshFilter() {
    this.dataSource.filter = ''.trim().toLowerCase();
    this.search = ''
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.updateData()
  }

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.updateData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSupplier() {
    const dialogRef = this.dialog.open(AddSupplierComponent);
    dialogRef.afterClosed().subscribe(res => {
      this.supplierservice.addSupplier(res)
    })
  
  }


  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
