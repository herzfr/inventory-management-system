import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: ':mode', component: InventoryComponent},
// ]

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class InventoryModule { }
