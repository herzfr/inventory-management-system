import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { InventoryComponent } from './features/inventory/inventory.component';
import { LoginComponent } from './features/login/login.component';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  { 
    path: 'inventory', 
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['admin', 'staff'] },
    component: InventoryComponent,
    loadChildren: () =>
      import('./features/inventory/inventory.module').then((m) => m.InventoryModule),
  },
  { path: '', pathMatch: 'full', redirectTo: '/inventory'},
  { path: '**', pathMatch: 'full', redirectTo: '/inventory'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
