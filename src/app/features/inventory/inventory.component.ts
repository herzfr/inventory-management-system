import { Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { InventoriesService } from 'src/app/core/services/inventories.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { ViewItemComponent } from 'src/app/shared/components/dialogs/view-item/view-item.component';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator?: MatPaginator;

  inventorieservice = inject(InventoriesService);
  authservice = inject(AuthService);
  activeroute = inject(ActivatedRoute);
  supplierservice = inject(SupplierService);
  router = inject(Router);

  inventoryForm: FormGroup;
  search: string = '';
  pageSize = 10;
  pageIndex = 0;
  itemId: string | null = null;

  pageType: 'LIST' | 'UPDATE' | 'CREATE' = 'LIST';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {
    this.inventoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      image: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      supplierId: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params) => {
      const mode = this.router.url.split('?')[0].split('/').pop();
      this.itemId = params['id'] || null;
      if (mode === 'create') {
        this.inventoryForm.reset();
        this.pageType = 'CREATE';
      } else if (mode === 'update') {
        this.pageType = 'UPDATE';
        if (this.itemId) {
          // You might want to load the item to be updated here using the itemId
          const item: InventoryItem | undefined =
            this.inventorieservice.getItem(this.itemId); // Replace with your actual logic to get the item
          if (item) this.setUpdateForm(item);
          else this.router.navigate(['inventory']);
        }
      } else {
        // Handle default /inventory path or other modes
        this.inventoryForm.reset();
        this.pageType = 'LIST';
      }
    });
  }

  setUpdateForm(item: InventoryItem) {
    (Object.keys(item) as (keyof InventoryItem)[]).forEach((key) => {
      if (this.inventoryForm.contains(key)) {
        this.inventoryForm.get(key)?.setValue(item[key]);
      }
    });
  }

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }

  cardEvent(event: 'VIEW' | 'EDIT' | 'DELETE', item: InventoryItem) {
    if (event.includes('VIEW')) {
      this.openDialog(item);
    } else if (event.includes('DELETE')) {
      this.delete(item.id);
    } else {
      this.goUpdate(item.id);
    }
  }

  controlStock(type: 'minus' | 'plus') {
    let value = this.control('quantity')!.value as Number;
    type == 'minus'
      ? this.control('quantity')?.value > 1
        ? this.control('quantity')?.setValue(Number(value) - 1)
        : null
      : this.control('quantity')?.setValue(Number(value) + 1);
  }

  doItem(event: 'update' | 'create') {
    if (this.inventoryForm.valid) {
      event === 'create'
        ? this.inventorieservice.addItem(this.inventoryForm.value)
        : this.inventorieservice.editItem(this.inventoryForm.value);
      this.inventoryForm.reset();
      this.location.back();
    }
  }

  back() {
    this.location.back();
  }

  delete(id: string) {
    this.inventorieservice.deleteItem(id);
  }

  goUpdate(id: string) {
    this.router.navigate(['inventory/update'], { queryParams: { id: id } });
  }

  goCreate() {
    this.router.navigate(['inventory/create']);
  }

  control(control: string) {
    return this.inventoryForm.get(control);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.trim().toLowerCase();
  }

  openDialog(item: InventoryItem): void {
    const dialogRef = this.dialog.open(ViewItemComponent, {
      data: item,
    });
    dialogRef.afterClosed()
  }

  get admin() {
    return this.authservice.isAdmin()
  }

  get items() {
    return this.inventorieservice.getItems(
      this.search,
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 0
    );
  }

  get suppliers() {
    return this.supplierservice.getSuppliers()
  }

  get total() {
    return this.inventorieservice.getLengthItem();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

}
