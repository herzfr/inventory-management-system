import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ErrorValidatorPipe } from './pipes/error-validator.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ViewItemComponent } from './components/dialogs/view-item/view-item.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';

// Shared Module
// ----------------------------------------------------------------------------------------------------------------
// This purpose module is Contains shared components, directives, and pipes that will be used across the application.
// Examples: Common UI components, utility pipes.
// ----------------------------------------------------------------------------------------------------------------

@NgModule({
  declarations: [
    ErrorValidatorPipe,
    ToolbarComponent,
    ItemCardComponent,
    ViewItemComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule, 
    ErrorValidatorPipe, 
    ToolbarComponent,
    ItemCardComponent,
    ViewItemComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US' // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ],
  
})
export class SharedModule { }
