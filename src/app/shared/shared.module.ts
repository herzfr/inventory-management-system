import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ErrorValidatorPipe } from './pipes/error-validator.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ViewItemComponent } from './components/dialogs/view-item/view-item.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UuidMaskPipe } from './pipes/uuid-mask.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';

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
    ConfirmationComponent,
    UuidMaskPipe,
    CustomDatePipe,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [
    // share module
    MaterialModule,

    // share module
    ErrorValidatorPipe,
    UuidMaskPipe,
    CustomDatePipe,

    // share component
    ToolbarComponent,
    ItemCardComponent,
    ViewItemComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US', // 'en-US' for USD
    },
  ],
})
export class SharedModule {}
