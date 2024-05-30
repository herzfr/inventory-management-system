import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoriesService } from 'src/app/core/services/inventories.service';
import { ViewItemComponent } from 'src/app/shared/components/dialogs/view-item/view-item.component';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  @ViewChild('paginator') paginator?: MatPaginator;

  inventorieservice = inject(InventoriesService);
  
  inventoryForm: FormGroup;
  search: string = '';
  pageSize = 10;
  pageIndex = 0;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required]
    });
  }
  ngOnInit(): void {}

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }

  cardEvent(event: 'VIEW' | 'EDIT', item: InventoryItem) {
    console.log(event, item)
    if (event.includes("VIEW")) {
      this.openDialog(item)
    }
  }

  addItem() {
    if (this.inventoryForm.valid) {
      this.inventorieservice.addItem(this.inventoryForm.value);
      this.inventoryForm.reset();
    }
  }


  get items() {
    return this.inventorieservice.getItems(
      this.search,
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 0
    );
  }

  get total() {
    return this.inventorieservice.getLengthItem();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.trim().toLowerCase();
  }

  openDialog(item: InventoryItem): void {
    const dialogRef = this.dialog.open(ViewItemComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
