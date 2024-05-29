import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ErrorValidatorPipe } from './pipes/error-validator.pipe';

// Shared Module
// ----------------------------------------------------------------------------------------------------------------
// This purpose module is Contains shared components, directives, and pipes that will be used across the application.
// Examples: Common UI components, utility pipes.
// ----------------------------------------------------------------------------------------------------------------

@NgModule({
  declarations: [
    ErrorValidatorPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialModule, ErrorValidatorPipe]
})
export class SharedModule { }
