import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import {
    DashboardComponent,
    LoginComponent,
    AdminComponent,
    PersonComponent,
    PersonListComponent,
    CustomerComponent,
    CustomerListComponent 
} from './components/';

// Services
import { 
    AuthGuardService 
} from './core';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/:redirectUrl', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuardService] },
    { path: 'customer/:id', component: CustomerComponent, canActivate: [AuthGuardService] },
    { path: 'customers', component: CustomerListComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
