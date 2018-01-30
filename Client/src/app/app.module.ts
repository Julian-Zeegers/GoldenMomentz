import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { provideAuth, AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { 
  CoreModule, 
  ToastrOptions,
  AuthGuardService,
  SpinnerService,
  SpinnerComponent,
} from './core';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  DashboardComponent,  
  LoginComponent, 
  AdminComponent,
  PersonListComponent, PersonComponent, CustomerComponent, CustomerListComponent,
  OrderComponent,
  OrderListComponent,
  DiaryComponent
} from './components';

// Services
import {
  PersonService,
  CustomerService,
  OrderService,
  CollectionService,
  SalesPersonService
} from './services';

// Pipes
import { } from './pipes';

// AuthHttp should be used instead of Http when endpoints have authorization added to them.
// This will greatly reduce code repetition and will make your life a lot easier when sending
// tokens to endpoints.
// https://github.com/auth0/angular2-jwt
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: false,
    noTokenScheme: false
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    AppRoutingModule,
    MyDateRangePickerModule,
    // Core
    CoreModule,
    ToastModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DashboardComponent, 
    LoginComponent, 
    AdminComponent,
    PersonListComponent, PersonComponent,
    CustomerComponent,
    CustomerListComponent,
    OrderComponent,
    OrderListComponent,
    DiaryComponent
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [ Http, RequestOptions ] },
    { provide: ToastOptions, useClass: ToastrOptions },
    PersonService,
    CustomerService,
    AuthGuardService,
    OrderService,
    CollectionService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
