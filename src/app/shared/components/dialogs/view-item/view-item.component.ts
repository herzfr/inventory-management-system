import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent {
  inventory: InventoryItem;
  supplierservice = inject(SupplierService)
  
  constructor(public dialogRef: MatDialogRef<ViewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryItem,) {
      this.inventory = data
  }

  getSupplier(supplierId: number) {
    return this.supplierservice.getSupplier(supplierId)
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
