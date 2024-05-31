import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { InventoriesService } from 'src/app/core/services/inventories.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { AddSupplierComponent } from 'src/app/shared/components/dialogs/add-supplier/add-supplier.component';
import { ViewItemComponent } from 'src/app/shared/components/dialogs/view-item/view-item.component';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit, AfterViewInit {
  supplierservice = inject(SupplierService);
  inventoryservice = inject(InventoriesService);
  authservice = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  dialog = inject(MatDialog);
  panelOpenState = false;

  displayedColumns: string[] = ['supplier'];
  dataSource: MatTableDataSource<Supplier> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  search: string = '';
  duplicateData: Supplier[] = [];
  subs: Subscription | undefined;

  pageSize = 5;

  get admin() {
    return this.authservice.isAdmin();
  }

  ngOnInit(): void {
    this.supplierservice.getObsSuppliers().subscribe((data) => {
      this.dataSource.data = data;
      this.duplicateData = data;
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
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

  updateData() {
    const filteredItems = this.duplicateData.filter((supplier) =>
      supplier.name
        .toLowerCase()
        .trim()
        .includes(this.search.toLowerCase().trim())
    );
    this.dataSource.data = filteredItems;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue;
    this.updateData();
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  addSupplier() {
    if (this.admin) {
      const dialogRef = this.dialog.open(AddSupplierComponent);
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.supplierservice.addSupplier(res);
          this.updateData();
        }
      });
    }
  }

  deleteSupplier(id: number) {
    this.supplierservice.deleteSupplier(id)
  }

  combineSupplierItem(supplierId: number) {
    return this.inventoryservice.getItemBySupplierId(supplierId);
  }

  cardEvent(event: 'VIEW' | 'EDIT' | 'DELETE', item: InventoryItem) {
    if (event === 'VIEW') {
      this.openDialog(item);
    } else if (event === 'DELETE') {
      this.delete(item.id);
    } else {
      this.goUpdate(item.id);
    }
  }

  delete(id: string) {
    if (this.admin) {
      this.inventoryservice.deleteItem(id);
      this.updateData();
    }
    return;
  }

  goUpdate(id: string) {
    this.router.navigate(['inventory/update'], { queryParams: { id } });
  }

  openDialog(item: InventoryItem): void {
    const dialogRef = this.dialog.open(ViewItemComponent, {
      data: item,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
