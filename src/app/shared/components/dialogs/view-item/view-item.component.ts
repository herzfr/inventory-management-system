import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent {
  inventory: InventoryItem;
  
  constructor(public dialogRef: MatDialogRef<ViewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryItem,) {
      this.inventory = data
    }


     onNoClick(): void {
    this.dialogRef.close();
  }
}
