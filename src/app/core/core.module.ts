import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InventoriesService } from './services/inventories.service';
import { AuthInterceptor } from './interceptor/auth-interceptor.interceptor';
import { SalesService } from './services/sales.service';
import { SupplierService } from './services/supplier.service';

// Core Module
// ----------------------------------------------------------------------------------------------------------------
// this purpose module Contains singleton services, configuration, and utilities
// Examples: Auth service, HTTP interceptors, global error handling.
// ----------------------------------------------------------------------------------------------------------------

@NgModule({
  imports: [HttpClientModule],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthService, UserService, InventoriesService, SalesService, SupplierService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
