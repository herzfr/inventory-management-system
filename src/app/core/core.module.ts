import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Core Module
// ----------------------------------------------------------------------------------------------------------------
// this purpose module Contains singleton services, configuration, and utilities
// Examples: Auth service, HTTP interceptors, global error handling.
// ----------------------------------------------------------------------------------------------------------------

@NgModule({
  imports: [HttpClientModule],
  providers: [AuthService, UserService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
