import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './features/inventory/inventory.component';
import { LoginComponent } from './features/login/login.component';
import { roleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inventory'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  { 
    path: 'inventory', 
    canActivate: [AuthGuard, roleGuard],
    data: { expectedRole: ['admin', 'staff'] },
    component: InventoryComponent,
    loadChildren: () =>
      import('./features/inventory/inventory.module').then((m) => m.InventoryModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/inventory'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
