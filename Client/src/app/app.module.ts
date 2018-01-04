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
  PersonListComponent, PersonComponent, CustomerComponent, CustomerListComponent 
} from './components';

// Services
import {
  PersonService,
  CustomerService,
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
    CustomerListComponent 
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [ Http, RequestOptions ] },
    { provide: ToastOptions, useClass: ToastrOptions },
    PersonService,
    CustomerService,
    AuthGuardService,
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
