import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class InventoryModule { }
