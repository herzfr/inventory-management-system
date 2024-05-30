import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment.development';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export const API_URL = new InjectionToken<string>('apiUrl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ScrollingModule,
    OverlayModule,

    MatDialogModule
  ],
  providers: [{ provide: API_URL, useValue: environment.apiUrl }, 
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
