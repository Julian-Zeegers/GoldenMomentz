import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// PrimeNg
import {
  SharedModule,
  DataTableModule,
  PanelModule,
  TabViewModule,
  InputTextModule,
  InputTextareaModule,
  PasswordModule,
  DropdownModule,
  ButtonModule,
  CalendarModule,
  FieldsetModule,
  ChartModule,
  ProgressSpinnerModule,
  DataListModule,
  AutoCompleteModule
} from 'primeng/primeng';

// Services
import { 
  ApiService,
  AuthService, 
  AuthProxyService, 
  AuthGuardService,
  SpinnerService,
} from './services';

// Components
import { 
  ContainerComponent, 
  NavComponent, 
  FooterComponent,
  SpinnerComponent, 
} from './components';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    // PrimeNg
    SharedModule,
    DataTableModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    FieldsetModule,
    ChartModule,
    ProgressSpinnerModule,
    DataListModule,
    AutoCompleteModule
  ],
  declarations: [
    ContainerComponent,
    NavComponent,
    FooterComponent,
    SpinnerComponent
  ],
  providers: [
    AuthService,
    AuthProxyService,
    AuthGuardService,
    ApiService,
    SpinnerService
  ],
  exports: [
    ContainerComponent,
    NavComponent,
    FooterComponent,
    SpinnerComponent,
    SharedModule,
    DataTableModule,
    PanelModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    FieldsetModule,
    ChartModule,
    ProgressSpinnerModule,
    DataListModule,
    AutoCompleteModule
    
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
